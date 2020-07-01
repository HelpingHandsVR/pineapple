import { shield } from '@/lib/permission/shield'
import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'
import { not } from 'graphql-shield'

export const rules = shield({
  Mutation: {
    register: not(isLoggedIn),
    login: not(isLoggedIn),
    logout: isLoggedIn,
  },
})
