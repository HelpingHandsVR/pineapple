import { KeyValueCache } from 'apollo-server-caching'
import { Redis } from 'ioredis'

import pkg from '@/package.json'

export const kvRedis = (redis: Redis): KeyValueCache => {
  return {
    get: (key: string) => {
      return redis.get(key)
    },
    set: async (key: string, value: string) => {
      await redis.set(key, value)
    },
    delete: async (key: string) => {
      await redis.del(key)
    },
  }
}

export const userAgent = `Pineapple/${pkg.version} (+decentm+pineapple-ua@decentm.com) (+environment:${process.env.NODE_ENV})`
