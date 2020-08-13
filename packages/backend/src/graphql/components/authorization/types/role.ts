import { objectType } from '@nexus/schema'
import { defineAbilityForRole } from '@/lib/permission/helpers'
import { Role } from '~/entity'

export const RoleType = objectType({
  name: 'Role',
  definition (t) {
    t.id('id')
    t.string('name')

    t.field('ability', {
      type: 'Ability',
      list: [false],
      async resolve (root, args, context) {
        const role = await context.connection.getRepository(Role)
          .findOne({
            where: {
              id: root.id,
            },
          })

        if (!role) {
          return []
        }

        const ability = await defineAbilityForRole(role)

        return ability.rules
      },
    })
  },
})
