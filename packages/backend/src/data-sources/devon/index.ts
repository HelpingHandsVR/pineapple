import { RESTDataSource, RequestOptions, HTTPCache } from 'apollo-datasource-rest'
import Redis from 'ioredis'

import { userAgent, kvRedis } from '@/lib/data-source-helpers'
import * as Types from './types'

export class WithDevonAPI extends RESTDataSource {
  public baseURL = 'https://vrsl.withdevon.xyz/api/v2'

  private redis = new Redis()

  private kvRedis = kvRedis(this.redis)

  public httpCache = new HTTPCache(this.kvRedis)

  public willSendRequest (request: RequestOptions): void {
    request.headers.set('User-Agent', userAgent)
  }

  public async getEvents (): Promise<Types.Event[]> {
    return this.get('/events')
  }
}
