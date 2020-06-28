import deepmerge from 'deepmerge'
import { IRules, deny, shield, allow } from 'graphql-shield'

import { rules as authRules } from '../components/authorization/permission'
import { rules as discordRules } from '../components/discord/permission'
import { rules as userRules } from '../components/user/permission'
import { rules as vrcRules } from '../components/vrchat-api/permission'

const rules: IRules = deepmerge.all([
  {
    Query: {
      '*': deny,
    },
    Mutation: {
      '*': deny,
    },
  },
  authRules,
  discordRules,
  userRules,
  vrcRules,
]) as IRules

export const permissions = shield(rules, {
  fallbackError () {
    return new Error('Permission denied by fallback')
  },
  fallbackRule: allow,
})
