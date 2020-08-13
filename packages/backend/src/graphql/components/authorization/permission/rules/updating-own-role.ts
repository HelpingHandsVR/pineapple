import { rule } from 'graphql-shield'
import { Context } from '~/graphql/context'

export const updatingOwnRole = rule('updatingOwnRole', { cache: 'no_cache' })(async (root, args, context: Context) => {
  const user = context.authentication.getUser()
  const role = await user.role

  return role.id === args.where.id || 'You cannot edit your own role'
})
