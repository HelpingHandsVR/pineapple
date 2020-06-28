import { Role } from '~/entity'
import { Ability, AbilityBuilder } from '@casl/ability'
import { Action, Subject } from '.'

export const defineAbilityForGuest = (): Ability => {
  const { can, rules } = new AbilityBuilder<any>()

  can(Action.CREATE, Subject.USER_SELF)

  return new Ability(rules)
}

export const defineAbilityForRole = async (role: Role): Promise<Ability> => {
  if (!role) {
    return defineAbilityForGuest()
  }

  const { can, rules } = new AbilityBuilder<any>()
  const permissions = await role.permissions

  permissions.forEach((permission) => {
    can(permission.action.toString(), permission.subject.toString())
  })

  return new Ability(rules)
}