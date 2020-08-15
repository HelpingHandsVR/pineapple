import { Express } from 'express'
import * as sentry from '@sentry/node'

import { Config } from '../config/type'
import { log as logger } from '../log'

type SentryHandlers = {
  requestHandler: (app: Express) => void,
  errorHandler: (app: Express) => void,
  sentry?: typeof sentry
}

const fakeSentry: SentryHandlers = {
  requestHandler: () => null,
  errorHandler: () => null,
}

const log = logger.child({
  component: 'sentry',
})

export const makeSentry = (config: Config): SentryHandlers => {
  if (!config.sentry.enabled) {
    log.info('sentry reporting disabled')

    return fakeSentry
  }

  log.info('sentry reporting enabled')

  sentry.init(config.sentry.options)

  return {
    sentry,
    requestHandler (app) {
      app.use(sentry.Handlers.requestHandler())
    },
    errorHandler (app) {
      app.use(sentry.Handlers.errorHandler())
    },
  }
}
