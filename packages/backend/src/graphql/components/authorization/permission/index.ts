import { shield, can } from '@/lib/permission/shield'
import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'
import { allow, and } from 'graphql-shield'
import { Action, Subject } from '@/lib/permission'

export const rules = shield({
  Query: {
    viewer: isLoggedIn,
    permissions: allow,
    permission: allow,
    roles: isLoggedIn,
    role: isLoggedIn,
  },
  Mutation: {
    createRole: and(
      isLoggedIn,
      can(Action.CREATE, Subject.SYSTEM_ROLE),
    ),
    updateRole: and(
      isLoggedIn,
      can(Action.UPDATE, Subject.SYSTEM_ROLE),
    ),
  },
})
