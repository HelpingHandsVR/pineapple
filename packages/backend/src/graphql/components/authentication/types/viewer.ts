import { objectType } from '@nexus/schema'

export const Viewer = objectType({
  name: 'Viewer',
  definition (t) {
    t.field('user', {
      type: 'User',
    })

    t.field('ability', {
      type: 'Ability',
      list: [false],
    })
  },
})
