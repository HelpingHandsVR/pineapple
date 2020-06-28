import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'
import { IRules } from 'graphql-shield'

export const rules: IRules = {
  Query: {
    viewer: isLoggedIn,
  },
}
