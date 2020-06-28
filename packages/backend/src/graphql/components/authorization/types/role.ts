import { objectType } from '@nexus/schema'

export const Role = objectType({
  name: 'Role',
  definition (t) {
    t.id('id')
    t.string('name')
  },
})
