import { Action, Subject, CaslRole, crud } from '..'
import { AbilityBuilder, Ability } from '@casl/ability'

export const rootAdmin: CaslRole = () => {
  const { can, rules } = new AbilityBuilder<any>()

  can(crud, [
    Subject.LESSON_SELF,
    Subject.LESSON_OTHERS,
    Subject.USER_SELF,
    Subject.USER_OTHERS,
    Subject.PERMISSION_SELF,
    Subject.ATTENDANCE_RECORD_SELF,
    Subject.ATTENDANCE_RECORD_OTHERS,
    Subject.ATTENDABLE_SELF,
    Subject.ATTENDABLE_OTHERS,
    Subject.SYSTEM_ROLE,
  ])

  can(Action.ATTACH, Subject.DISCORD_ACCOUNT_SELF)
  can(Action.DETACH, Subject.DISCORD_ACCOUNT_OTHERS)
  can(Action.READ, Subject.DISCORD_OAUTH_REQUEST_SELF)
  can(Action.READ, Subject.SYSTEM_QUEUE)
  can(Action.READ, Subject.SYSTEM_PERMISSION)

  return new Ability(rules)
}
