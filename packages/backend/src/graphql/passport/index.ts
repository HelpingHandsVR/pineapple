import passport from 'passport'
import { Express } from 'express'
import session from 'express-session'
import { Connection } from 'typeorm'
import createStore from 'connect-redis'
import Redis from 'ioredis'

import { Config } from '@/lib/config/type'
import { makeStrategy as graphqlLocalStrategy } from './strategies/graphql-local'
import { User } from '~/entity'

export const applyMiddleware = async (app: Express, config: Config, connection: Connection): Promise<void> => {
  const RedisStore = createStore(session)
  const redisClient = new Redis()

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
