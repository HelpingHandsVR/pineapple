import { extendType } from '@nexus/schema'

export const AbilityOnUser = extendType({
  type: 'User',
  definition (t) {
    t.field('ability', {
      type: 'Ability',
      list: [false],
      async resolve (root, args, context) {
        // console.log(context.auth.ability.rules)

        return context.auth.ability.rules
      },
    })
  },
})
