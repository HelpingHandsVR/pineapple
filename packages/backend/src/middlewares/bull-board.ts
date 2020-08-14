import { Express, Handler } from 'express'
import { setQueues, UI } from 'bull-board'
import { getConnection } from 'typeorm'

import { User } from '~/db/entity'
import { defineAbilityForRole } from '@/lib/permission/helpers'
import { Action, Subject } from '@/lib/permission'

import * as queues from '../queues'
import { log as logger } from '@/lib/log'

const log = logger.child({
  component: 'bull-board',
})

const guardWithCasl: Handler = async (req, res, next) => {
  const deny = () => {
    res.status(403)
    res.json({
      data: null,
      errors: [
        {
          message: 'Permission denied',
        },
      ],
    })

    return res.end()
  }

  const connection = getConnection('default')

  if (!req.session.passport.user) {
    log.warn('guest user attempted bull-board access')

    return deny()
  }

  const user = await connection.getRepository(User)
    .findOne({
      where: {
        id: req.session.passport.user,
      },
    })

  const ability = await defineAbilityForRole(await user.role)

  if (!ability.can(Action.READ.toString(), Subject.SYSTEM_QUEUE.toString())) {
    log.warn(req.session.passport, 'unauthorised user attempted bull-board access')

    return deny()
  }

  return next()
}

export const makeBullBoard = (app: Express): void => {
  setQueues(Object.values(queues))

  app.use('/admin/queues', guardWithCasl, UI)
}
