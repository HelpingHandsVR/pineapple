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
      resolve (root) {
        return Action[(<any>Action)[root.action]] as unknown as Action
      },
    })

    t.field('subject', {
      type: 'AbilitySubject',
      nullable: true,
      resolve (root) {
        return Subject[(<any>Subject)[root.subject]] as unknown as Subject
      },
    })
  },
})
