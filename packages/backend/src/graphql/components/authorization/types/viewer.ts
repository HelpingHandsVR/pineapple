import { objectType } from '@nexus/schema'

export const Viewer = objectType({
  name: 'Viewer',
  definition (t) {
    t.field('user', {
      type: 'User',
    })

    t.field('vrchatUser', {
      type: 'VRChatExtendedUser',
    })

    t.field('ability', {
      type: 'Ability',
      list: [false],
      async resolve (root, args, context) {
        return context.auth.ability.rules
      },
    })
  },
})
