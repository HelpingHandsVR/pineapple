import { GraphQLLocalStrategy } from 'graphql-passport'
import { Connection } from 'typeorm'
import { Request } from 'express'

import { Config } from '@/lib/config/type'
import { User } from '~/db/entity'
import { UserRepository } from '~/db/repository/user'

export const makeStrategy = (config: Config, connection: Connection): GraphQLLocalStrategy<User, Request> => new GraphQLLocalStrategy(
  async (email: string, password: string, done: (err: Error | null, result?: User) => void) => {
    try {
      const user = await connection.getCustomRepository(UserRepository)
        .login(email, password)

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  },
)
