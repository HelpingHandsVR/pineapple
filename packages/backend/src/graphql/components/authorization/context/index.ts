import { Ability } from '@casl/ability'
import { defineAbilityForGuest } from '@/lib/permission/helpers'

export type AuthorisationContext = {
  authorisation: {
    ability: Ability
  },
}

export const makeAuthorisationContext = async (): Promise<AuthorisationContext> => {
  const ability: Ability = defineAbilityForGuest()

  return {
    authorisation: {
      ability,
    },
  }
}
