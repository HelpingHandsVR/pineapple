import { Role } from '~/db/entity/role'
import { Ability, AbilityBuilder } from '@casl/ability'

import { Action, Subject, CaslRole } from '.'

import { rootAdmin } from './roles/root-admin'
import { user } from './roles/user'

const roleMap: Record<string, CaslRole> = {
  ROOT_ADMIN: rootAdmin,
  USER: user,
}

export const defineAbilityForGuest = (): Ability => {
  const { can, rules } = new AbilityBuilder<any>()

  can(Action.CREATE, Subject.USER_SELF)

  return new Ability(rules)
}

export const defineAbilityForRole = async (role: Role): Promise<Ability> => {
  if (!role) {
    return defineAbilityForGuest()
  }

  if (role.name in roleMap) {
    const ability = roleMap[role.name]

    return ability()
  }

  return defineAbilityForGuest()
}
