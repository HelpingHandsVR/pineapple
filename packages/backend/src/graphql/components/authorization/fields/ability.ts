import { extendType } from '@nexus/schema'

export const AbilityOnUser = extendType({
  type: 'User',
  definition (t) {
    t.field('ability', {
      type: 'Ability',
      list: [false],
      async resolve (root, args, context) {
        return context.auth.ability.rules
      },
    })
  },
})
