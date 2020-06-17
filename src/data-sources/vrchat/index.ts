import { RESTDataSource, HTTPCache, RequestOptions } from 'apollo-datasource-rest'

import pkg from '@/package.json'
import { Config } from './types'

export class VRChatAPI extends RESTDataSource {
  baseURL = 'https://api.vrchat.cloud/api/1'

  constructor (
    private remoteIp: string,
    private authCookie?: string,
  ) {
    super()
  }

  httpCache = new HTTPCache()

  willSendRequest (request: RequestOptions): void {
    request.headers.set('User-Agent', `Pineapple/${pkg.version} (+decentm@decentm.com) (+environment:${process.env.NODE_ENV})`)
    request.headers.set('X-Forwarded-For', this.remoteIp)
  }

  async getConfig (): Promise<Config> {
    return this.get('/config')
  }
}
