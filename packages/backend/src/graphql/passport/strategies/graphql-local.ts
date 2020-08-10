import { GraphQLLocalStrategy } from 'graphql-passport'
import { Connection } from 'typeorm'
import { Request } from 'express'
import bcrypt from 'bcrypt'

import { Config } from '@/lib/config/type'
import { User } from '~/entity/user'
import { log as baseLog } from '@/lib/log'

const log = baseLog.child({
  component: 'passport-strategy-graphql-local',
})

export const makeStrategy = (config: Config, connection: Connection): GraphQLLocalStrategy<User, Request> => new GraphQLLocalStrategy(
  async (email: string, password: string, done: (err: Error | null, result?: User) => void) => {
    const user = await connection.getRepository(User)
      .findOne({
        email,
      })

    const authFailedError = new Error('Authentication failed')

    if (!user) {
      log.info({ email }, 'auth failed because no user')

      return done(authFailedError)
    }

    if (!user.provisioned) {
      log.error({
        userId: user.id,
        userDisplay: user.display,
      }, 'unprovisioned user tried to log in')

      return done(authFailedError, null)
    }

    if (user.disabled) {
      log.error({
        userId: user.id,
        userDisplay: user.display,
        userEmail: user.email,
      }, 'disabled user tried to log in')

      return done(authFailedError, null)
    }

    const result = await bcrypt.compare(password, user.password)

    if (!result) {
      log.warn({ email }, 'auth failed because password')

      return done(authFailedError)
    }

    done(null, result ? user : null)
  },
)
