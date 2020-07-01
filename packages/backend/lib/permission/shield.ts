import { rule, shield, IRules, allow } from 'graphql-shield'
import { Rule } from 'graphql-shield/dist/rules'
import { IMiddlewareGenerator } from 'graphql-middleware'

import { Context } from '~/graphql/context'
import { Action, Subject } from '.'

const map = new Map<string, Rule>()

const componentShield = (rules: IRules): IMiddlewareGenerator<any, any, any> => shield(rules, {
  fallbackError () {
    return new Error('Permission denied')
  },
  fallbackRule: allow,
  allowExternalErrors: true,
})

export {
  componentShield as shield,
}

export const can = (action: Action, subject: Subject): Rule => {
  const name = `CAN_${action}_${subject}`
  const cached = map.get(name)

  if (cached) {
    return cached
  }

  const permission = rule(name)((root, args, context: Context) => {
    return context.authorisation.ability.can(action.toString(), subject.toString()) || 'Permission denied'
  })

  map.set(name, permission)

  return permission
}
