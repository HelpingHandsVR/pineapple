import { not } from 'graphql-shield'

import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'
import { shield } from '@/lib/permission/shield'

export const rules = shield({
  Mutation: {
    vrcLogin: not(isLoggedIn),
    vrcLogout: isLoggedIn,
  },
})
