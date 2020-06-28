import { rule } from 'graphql-shield'
import { Rule } from 'graphql-shield/dist/rules'

import { Context } from '~/graphql/context'
import { Action, Subject } from '.'

const map = new Map<string, Rule>()

export const can = (action: Action, subject: Subject): Rule => {
  const name = `CAN_${action}_${subject}`
  const cached = map.get(name)

  if (cached) {
    return cached
  }

  const permission = rule(name)((root, args, context: Context) => {
    return context.auth.ability.can(action.toString(), subject.toString()) || 'Permission denied'
  })

  map.set(name, permission)

  return permission
}
