import passport from 'passport'
import { Express } from 'express'
import session from 'express-session'
import { Connection } from 'typeorm'
import createStore from 'connect-redis'
import Redis from 'ioredis'

import { User } from '~/entity/user'

import { Config } from '@/lib/config/type'
import { makeStrategy as graphqlLocalStrategy } from './strategies/graphql-local'

export const applyMiddleware = async (app: Express, config: Config, connection: Connection): Promise<void> => {
  const RedisStore = createStore(session)
  const redisClient = new Redis(config.redis)

  passport.serializeUser((user: User, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (userId, done) => {
    const user = await connection.getRepository(User)
      .findOne({
        where: {
          id: userId,
        },
      })

    if (!user) {
      console.error(new Error(`While deserialising: User not found with ID ${userId}`))

      return done(null, null)
    }

    if (user.disabled) {
      console.error(new Error(`Disabled user tried to use session: ${user.email}`))

      return done(null, null)
    }

    done(null, user)
  })

  passport.use(await graphqlLocalStrategy(config, connection))

  app.use(session({
    store: new RedisStore({ client: redisClient as any }),
    secret: config.features.sessionSecret,
    saveUninitialized: false,
    resave: false,
    unset: 'destroy',
    cookie: {
      httpOnly: false,
    },
  }))
  app.use(passport.initialize())
  app.use(passport.session())
}
