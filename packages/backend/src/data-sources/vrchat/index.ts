import { RESTDataSource, HTTPCache, RequestOptions } from 'apollo-datasource-rest'
import { RequestInfo, RequestInit, fetch } from 'apollo-server-env'
import { KeyValueCache } from 'apollo-server-caching'
import cookie from 'cookie'
import Redis from 'ioredis'

import pkg from '@/package.json'
import * as Types from './types'
import { atob } from '@/lib/base64'

export class VRChatAPI extends RESTDataSource {
  baseURL = 'https://api.vrchat.cloud/api/1'

  private apiKey: string

  constructor (
    private remoteIp: string,
    private authCookie: string,
  ) {
    super()
  }

  private customFetch = async (input: RequestInfo, init: RequestInit) => {
    console.log('FETCHING', typeof input === 'string' ? input : input.url)

    const response = await fetch(input, init)
    const setCookieHeader = response.headers.get('set-cookie')
    const cookies = cookie.parse(setCookieHeader)

    if (cookies.apiKey) {
      this.apiKey = cookies.apiKey
    }

    return response
  }

  private redis = new Redis()

  private kvRedis: KeyValueCache = {
    get: (key) => {
      return this.redis.get(key)
    },
    set: async (key, value) => {
      await this.redis.set(key, value)
    },
    delete: async (key) => {
      await this.redis.del(key)
    },
  }

  httpCache = new HTTPCache(this.kvRedis, this.customFetch)

  willSendRequest (request: RequestOptions): void {
    request.headers.set('User-Agent', `Pineapple/${pkg.version} (+decentm+pineapple-ua@decentm.com) (+environment:${process.env.NODE_ENV})`)
    request.headers.set('X-Forwarded-For', this.remoteIp)

    if (this.authCookie) {
      request.headers.set('cookie', cookie.serialize('auth', this.authCookie))
    }

    if (this.apiKey) {
      request.params.append('apiKey', this.apiKey)
    }
  }

  public async getConfig (): Promise<Types.VRCConfig> {
    return this.get('/config')
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
  public async login (username: string, password: string): Promise<Types.VRCLoginResult> {
    return this.get('/auth/user', {}, {
      headers: {
        Authorization: `Basic ${atob(`${username}:${password}`)}`,
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
}
