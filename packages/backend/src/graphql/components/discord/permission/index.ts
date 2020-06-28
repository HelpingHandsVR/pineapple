import { and, IRules } from 'graphql-shield'

import { can } from '@/lib/permission/shield'
import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'
import { Action, Subject } from '@/lib/permission'

export const rules: IRules = {
  Query: {
    discordOauthURL: and(
      isLoggedIn,
      can(Action.READ, Subject.DISCORD_OAUTH_REQUEST_SELF),
    ),
  },
  Mutation: {
    discordOauthCallback: and(
      isLoggedIn,
      can(Action.ATTACH, Subject.DISCORD_ACCOUNT_SELF),
    ),
  },
}
