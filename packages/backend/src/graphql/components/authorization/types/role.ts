import { objectType } from '@nexus/schema'
import { defineAbilityForRole } from '@/lib/permission/helpers'
import { Role } from '~/entity/role'

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
          .findOneOrFail({
            where: {
              id: root.id,
            },
          })

        const ability = await defineAbilityForRole(role)

        return ability.rules
      },
    })
  },
})
