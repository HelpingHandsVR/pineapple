import { Request, Response } from 'express'
import { buildContext } from 'graphql-passport'
import { Context } from 'graphql-passport/lib/buildContext'
import { User } from '~/entity'

export type AuthenticationContext = {
  passport: Context<User>,
  authentication: {
    getUser: () => User | null,
  }
}

export const makeAuthenticationContext = async (req: Request, res: Response): Promise<AuthenticationContext> => {
  const passport = buildContext<User>({
    req,
    res,
  })

  return {
    passport,
    authentication: {
      getUser: () => passport.getUser(),
    },
  }
}
