import { extendType } from '@nexus/schema'
import { User } from '~/entity'

export const RoleOnUser = extendType({
  type: 'User',
  definition (t) {
    t.field('role', {
      type: 'Role',
      async resolve (root, args, context) {
        const user = await context.connection.getRepository(User)
          .findOne({
            id: root.id,
          })

        return user.role
      },
    })
  },
})
