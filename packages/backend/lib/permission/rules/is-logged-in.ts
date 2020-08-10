import { rule } from 'graphql-shield'
import { Context } from '~/graphql/context'
import { MustLoginError } from '../errors/must-login'

export const isLoggedIn = rule('isLoggedIn', { cache: 'no_cache' })((root, args, context: Context) => {
  return context.passport.isAuthenticated() || new MustLoginError('You must log in')
})
