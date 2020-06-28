import { rule } from 'graphql-shield'
import { Context } from '~/graphql/context'

export const isLoggedIn = rule('isLoggedIn')((root, args, context: Context) => {
  return Boolean(context.auth.user) || 'You must log in'
})
