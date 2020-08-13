import { Ability } from '@casl/ability'
import { defineAbilityForGuest, defineAbilityForRole } from '@/lib/permission/helpers'
import { User } from '~/entity'

export type AuthorisationContext = {
  authorisation: {
    ability: Ability<any>
  },
}

export const makeAuthorisationContext = async (user: User): Promise<AuthorisationContext> => {
  let ability: Ability = null

  if (user) {
    ability = await defineAbilityForRole(await user.role)
  } else {
    ability = defineAbilityForGuest()
  }

  return {
    authorisation: {
      ability,
    },
  }
}
