import { IRules, not } from 'graphql-shield'
import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'

export const rules: IRules = {
  Mutation: {
    vrcLogin: not(isLoggedIn),
    vrcLogout: isLoggedIn,
  },
}
