import { rule } from 'graphql-shield'
import { Context } from '~/graphql/context'

export const isLoggedIn = rule('isLoggedIn', { cache: 'no_cache' })((root, args, context: Context) => {
  return context.passport.isAuthenticated() || 'You must log in'
})
