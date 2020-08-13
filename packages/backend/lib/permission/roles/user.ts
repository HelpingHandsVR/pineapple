import { Action, Subject, CaslRole, crud } from '..'
import { AbilityBuilder, Ability } from '@casl/ability'

export const user: CaslRole = () => {
  const { can, rules } = new AbilityBuilder<any>()

  can(crud, [
    Subject.LESSON_OTHERS,
    Subject.USER_SELF,
    Subject.ATTENDANCE_RECORD_SELF,
  ])

  can(Action.ATTACH, Subject.DISCORD_ACCOUNT_SELF)
  can(Action.READ, Subject.DISCORD_OAUTH_REQUEST_SELF)

  return new Ability(rules)
}
