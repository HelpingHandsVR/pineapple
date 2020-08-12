import { rule, shield, IRules, allow } from 'graphql-shield'
import { Rule } from 'graphql-shield/dist/rules'
import { IMiddlewareGenerator } from 'graphql-middleware'

import { Context } from '~/graphql/context'
import { Action, Subject } from '.'

import { log as logger } from '@/lib/log'

const log = logger.child({
  component: 'shield-can-rule',
})

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
    const allowed = context.authorisation.ability.can(Action[action], Subject[subject])

    log.debug({
      action: Action[action],
      subject: Subject[subject],
      allowed,
    }, 'permission check result')

    return allowed || 'Permission denied'
  })

  map.set(name, permission)

  return permission
}
