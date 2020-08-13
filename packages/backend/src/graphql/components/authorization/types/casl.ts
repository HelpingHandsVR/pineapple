import { objectType, enumType } from '@nexus/schema'
import { Action, Subject } from '@/lib/permission'

export const AbilityAction = enumType({
  name: 'AbilityAction',
  members: Action,
})

export const AbilitySubject = enumType({
  name: 'AbilitySubject',
  members: Subject,
})

export const Ability = objectType({
  name: 'Ability',
  rootTyping: 'any',
  definition (t) {
    t.field('action', {
      type: 'AbilityAction',
      list: [false],
      resolve (root) {
        return Array.isArray(root.action) ? root.action : [root.action]
      },
    })

    t.field('subject', {
      type: 'AbilitySubject',
      list: [false],
      nullable: true,
      resolve (root) {
        return Array.isArray(root.subject) ? root.subject : [root.subject]
      },
    })
  },
})
