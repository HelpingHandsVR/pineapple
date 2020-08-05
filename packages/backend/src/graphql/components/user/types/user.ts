import { objectType } from '@nexus/schema'

export const UserType = objectType({
  name: 'User',
  definition (t) {
    t.id('id')
    t.string('display')
  },
})
