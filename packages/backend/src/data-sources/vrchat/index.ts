import { RESTDataSource, HTTPCache, RequestOptions } from 'apollo-datasource-rest'
import { RequestInfo, RequestInit, fetch } from 'apollo-server-env'
import cookie from 'cookie'
import { RedisCache } from 'apollo-server-cache-redis'

import * as Types from './types'
import { atob } from '@/lib/base64'
import { userAgent } from '@/lib/data-source-helpers'
import { log } from '@/lib/log'

export class VRChatAPI extends RESTDataSource {
  baseURL = 'https://api.vrchat.cloud/api/1'

  private log = log.child({
    component: 'vrchat-datasource',
  })

  private apiKey: string

  public authCookie: string

  constructor (
    private username: string,
    private password: string,
  ) {
    super()
  }

  private customFetch = async (input: RequestInfo, init: RequestInit) => {
    this.log.debug({
      url: typeof input === 'string' ? input : input.url,
    }, 'running HTTP request')

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
  public async getUser (userId: Types.VRCUserId): Promise<Types.VRCUser> {
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

  public async logout (): Promise<Types.VRCOperationResult> {
    return this.put('/logout', {})
  }

  // Worlds
  public async getWorld (worldId: Types.VRCWorldId): Promise<Types.VRCWorld> {
    return this.get(`/worlds/${worldId}`)
  }

  public async getInstance (instanceString: string): Promise<unknown> {
    return this.get(`/instances/${instanceString}`)
  }

  public async getInstanceShortName (worldString: string, instanceId?: string): Promise<string> {
    return this.get(`/instances/${worldString}${instanceId ? `:${instanceId}` : ''}/shortName`)
  }

  public async inviteSelfToWorld (worldString: string, instanceId?: string): Promise<Types.VRCOperationResult> {
    return this.post(`/instances/${worldString}${instanceId ? `:${instanceId}` : ''}/invite`)
  }

  // Notifications
  private async sendNotification (type: Types.NotificationType, targetUser: Types.VRCUserId, message = '', details: Record<string, unknown> = {}): Promise<Types.NotificationInfo> {
    return this.post(`/user/${targetUser}/notification`, {
      type,
      message,
      details,
    })
  }

  public async sendFriendRequest (targetUser: Types.VRCUserId): Promise<Types.NotificationInfo> {
    return this.sendNotification('friendrequest', targetUser)
  }

  public async sendInvite (targetUser: Types.VRCUserId, worldId: Types.VRCWorldId, message = ''): Promise<Types.NotificationInfo> {
    return this.sendNotification('invite', targetUser, message, { worldId })
  }

  // Friends
  public async answerFriendRequest (notificationId: Types.VRCNotificationId, answer: 'accept' | 'ignore'): Promise<Types.VRCFriendRequestAnswer> {
    return this.put(`/auth/user/notifications/${notificationId}/${answer}`)
  }
}
