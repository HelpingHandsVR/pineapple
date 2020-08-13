import { shield, can } from '@/lib/permission/shield'
import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'
import { and, not } from 'graphql-shield'
import { Action, Subject } from '@/lib/permission'
import { updatingOwnRole } from './rules/updating-own-role'
import { updatingRootRole } from './rules/updating-root-role'

export const rules = shield({
  Query: {
    viewer: and(
      isLoggedIn,
      can(Action.READ, Subject.USER_SELF),
    ),
    roles: and(
      isLoggedIn,
      can(Action.READ, Subject.SYSTEM_ROLE),
    ),
    role: and(
      isLoggedIn,
      can(Action.READ, Subject.SYSTEM_ROLE),
    ),
  },
  Mutation: {
    createRole: and(
      isLoggedIn,
      can(Action.CREATE, Subject.SYSTEM_ROLE),
    ),
    updateRole: and(
      isLoggedIn,
      can(Action.UPDATE, Subject.SYSTEM_ROLE),
      not(updatingOwnRole),
      not(updatingRootRole),
    ),
  },
})
