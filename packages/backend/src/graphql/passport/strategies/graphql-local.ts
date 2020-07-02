import { GraphQLLocalStrategy } from 'graphql-passport'
import { Connection } from 'typeorm'
import { Request } from 'express'
import bcrypt from 'bcrypt'

import { Config } from '@/lib/config/type'
import { User } from '~/entity'

export const makeStrategy = (config: Config, connection: Connection): GraphQLLocalStrategy<User, Request> => new GraphQLLocalStrategy(
  async (email: string, password: string, done: (err: Error | null, result?: User) => void) => {
    const user = await connection.getRepository(User)
      .findOne({
        email,
      })

    if (!user) {
      console.log('Auth failed because no user', email)

      return done(new Error('Authentication failed'))
    }

    const result = await bcrypt.compare(password, user.password)

    if (!result) {
      console.log('Auth failed because password', email)

      return done(new Error('Authentication failed'))
    }

    done(null, result ? user : null)
  },
)
