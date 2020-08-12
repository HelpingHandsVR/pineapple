import { rules as attendableRules } from '../components/attendable/permission'
import { rules as authenticationRules } from '../components/authentication/permission'
import { rules as authorizationRules } from '../components/authorization/permission'
import { rules as discordRules } from '../components/discord/permission'
import { rules as userRules } from '../components/user/permission'
import { rules as vrcRules } from '../components/vrchat-api/permission'

export const permissions = [
  authorizationRules,
  authenticationRules,
  discordRules,
  vrcRules,
  userRules,
  attendableRules,
]
