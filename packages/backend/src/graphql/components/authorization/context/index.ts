import { Ability } from '@casl/ability'
import { User } from '~/entity'
import { Connection } from 'typeorm'
import { VRChatAPIContext } from '../../vrchat-api/context'
import { defineAbilityForRole, defineAbilityForGuest } from '@/lib/permission/helpers'

export type AuthorisationContext = {
  auth: {
    ability: Ability
  },
}

export const makeAuthorisationContext = async (connection: Connection, context: VRChatAPIContext): Promise<AuthorisationContext> => {
  let ability: Ability = defineAbilityForGuest()

  if (context.vrchat.viewer) {
    const user = await connection.getRepository(User)
      .findOne({
        where: {
          vrcUserID: context.vrchat.viewer.id,
        },
      })

    if (user) {
      ability = await defineAbilityForRole(await user.role)
    }
  }

  return {
    auth: {
      ability,
    },
  }
}
