import { rule } from 'graphql-shield'

import { Context } from '~/graphql/context'
import { Role } from '~/entity'

export const updatingRootRole = rule('updatingRootRole', { cache: 'no_cache' })(async (root, args, context: Context) => {
  const requestedRole = await context.connection.getRepository(Role)
    .findOne({
      where: {
        id: args.where.id,
      },
    })

  return requestedRole.name === 'ROOT_ADMIN' || 'The ROOT_ADMIN role cannot be edited'
})
