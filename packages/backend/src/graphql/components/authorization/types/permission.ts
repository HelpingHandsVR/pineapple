import { objectType } from '@nexus/schema'

export const PermissionType = objectType({
  name: 'Permission',
  rootTyping: 'Permission.Permission',
  definition (t) {
    t.id('id')
    t.field('action', {
      type: 'AbilityAction',
    })
    t.field('subject', {
      type: 'AbilitySubject',
    })

    t.string('name', {
      resolve (root) {
        return root.getName()
      },
    })
  },
})
