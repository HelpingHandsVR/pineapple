import { RESTDataSource, HTTPCache, RequestOptions } from 'apollo-datasource-rest'
import { RequestInfo, RequestInit, fetch } from 'apollo-server-env'
import cookie from 'cookie'
import { RedisCache } from 'apollo-server-cache-redis'

import * as Types from './types'
import { atob } from '@/lib/base64'
import { userAgent } from '@/lib/data-source-helpers'

export class VRChatAPI extends RESTDataSource {
  baseURL = 'https://api.vrchat.cloud/api/1'

  private apiKey: string

  public authCookie: string

  constructor (
    private username: string,
    private password: string,
  ) {
    super()
  }

  private customFetch = async (input: RequestInfo, init: RequestInit) => {
    console.log('VRC', init ? init.method : 'GET', typeof input === 'string' ? input : input.url)

    const response = await fetch(input, init)
    const setCookieHeader = response.headers.get('set-cookie')
    const cookies = cookie.parse(setCookieHeader)

    if (cookies.apiKey) {
      this.apiKey = cookies.apiKey
    }

    if (cookies.auth) {
      this.authCookie = cookies.auth
    }

    return response
  }

  private redisCache = new RedisCache()

  httpCache = new HTTPCache(this.redisCache, this.customFetch)

  willSendRequest (request: RequestOptions): void {
    request.headers.set('User-Agent', userAgent)
    let requestCookie = ''

    if (this.authCookie) {
      requestCookie = `${requestCookie}; ${cookie.serialize('auth', this.authCookie)}`
    } else {
      request.headers.set('Authorization', `Basic ${atob(`${this.username}:${this.password}`)}`)
    }

    if (this.apiKey) {
      request.params.append('apiKey', this.apiKey)
      requestCookie = `${requestCookie}; ${cookie.serialize('apiKey', this.apiKey)}`
    }

    if (requestCookie) {
      request.headers.set('cookie', requestCookie)
    }
  }

  public async getConfig (): Promise<Types.VRCConfig> {
    const result: Types.VRCConfig = await this.get('/config')

    if (result.apiKey) {
      this.apiKey = result.apiKey
    }

    return result
  }

  // Gets extended user (only for when requesting self when logged in)
  public async getViewer (): Promise<Types.VRCExtendedUser | Types.VRCLoginResultTotpNeeded> {
    return this.get('/auth/user')
  }

  // Get other users
  public async getUser (userId: string): Promise<Types.VRCUser> {
    return this.get(`/users/${userId}`)
  }

  // Authentication
  public async login (): Promise<Types.VRCLoginResult> {
    return this.get('/auth/user', {}, {
      headers: {
        Authorization: `Basic ${atob(`${this.username}:${this.password}`)}`,
      },
    })
  }

  public async verifyTotp (code: string): Promise<Types.VRCTotpVerificationResult> {
    return this.post('/auth/twofactorauth/totp/verify', {
      code,
    })
  }

  public async logout (): Promise<Types.VRCLogoutResult> {
    return this.put('/logout', {})
  }

  // Worlds
  public async getWorld (worldId: string): Promise<Types.VRCWorld> {
    return this.get(`/worlds/${worldId}`)
  }
}
