import { Ability } from '@casl/ability'
import { User } from '~/entity'
import { defineAbilityForGuest } from '@/lib/permission/helpers'

export type AuthorisationContext = {
  authorisation: {
    ability: Ability
    user?: User
  },
}

export const makeAuthorisationContext = async (): Promise<AuthorisationContext> => {
  const ability: Ability = defineAbilityForGuest()
  const user: User = null

  return {
    authorisation: {
      ability,
      user,
    },
  }
}
