import { RESTDataSource, RequestOptions, HTTPCache } from 'apollo-datasource-rest'
import { RedisCache } from 'apollo-server-cache-redis'

import { userAgent } from '@/lib/data-source-helpers'
import * as Types from './types'

export class WithDevonAPI extends RESTDataSource {
  public baseURL = 'https://vrsl.withdevon.xyz/api/v2'

  private redisCache = new RedisCache()

  httpCache = new HTTPCache(this.redisCache)

  public willSendRequest (request: RequestOptions): void {
    request.headers.set('User-Agent', userAgent)
  }

  public async getEvents (): Promise<Types.Event[]> {
    return this.get('/events')
  }
}
