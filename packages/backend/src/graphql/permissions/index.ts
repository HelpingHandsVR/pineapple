import { rules as authRules } from '../components/authorization/permission'
import { rules as discordRules } from '../components/discord/permission'
import { rules as vrcRules } from '../components/vrchat-api/permission'
import { rules as userRules } from '../components/user/permission'

export const permissions = [
  authRules,
  discordRules,
  vrcRules,
  userRules,
]
