import { shield } from '@/lib/permission/shield'
import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'

export const rules = shield({
  Query: {
    viewer: isLoggedIn,
  },
})
