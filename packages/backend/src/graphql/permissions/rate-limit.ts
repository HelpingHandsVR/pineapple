import { shield } from 'graphql-shield'
import { createRateLimitRule } from 'graphql-rate-limit'
import { Identity } from 'graphql-rate-limit/build/main/lib/types'
import Redis from 'ioredis'

import { Context } from '../context'
import { getConfig } from '@/lib/config/coerce'

const config = getConfig(process.env)
const redis = new Redis(config.redis)
const ratelimitPrefix = 'rate-limit-identity'

const makePath = (identity: Identity) => {
  return `${ratelimitPrefix}:${identity.contextIdentity}:${identity.fieldIdentity}`
}

const rateLimitRule = () => createRateLimitRule({
  identifyContext (context: Context) {
    return context.express.req.ip
  },
  formatError (input) {
    return `Rate limit exceeded - (max: ${input.max}, window: ${input.window})`
  },
  store: {
    async getForIdentity (identity) {
      try {
        const response = await redis.get(makePath(identity))

        if (!response) {
          return []
        }

        return JSON.parse(response)
      } catch {
        return []
      }
    },

    async setForIdentity (identity, timestamps) {
      await redis.set(makePath(identity), JSON.stringify(timestamps))
    },
  },
})

export const rules = shield({
  // 1 query every 2 seconds
  Query: rateLimitRule()({
    window: config.features.rateLimiting.query.window,
    max: config.features.rateLimiting.query.max,
  }),
  // 1 mutation every 10 seconds
  Mutation: rateLimitRule()({
    window: config.features.rateLimiting.mutation.window,
    max: config.features.rateLimiting.mutation.max,
  }),
})
