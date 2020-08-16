import { Express } from 'express'
import * as sentry from '@sentry/node'
import * as Apm from '@sentry/apm'

import { Config } from '../config/type'
import { log as logger } from '../log'

type SentryHandlers = {
  requestHandler: () => void,
  errorHandler: () => void,
  sentry?: typeof sentry
}

const fakeSentry: SentryHandlers = {
  requestHandler: () => null,
  errorHandler: () => null,
}

const log = logger.child({
  component: 'sentry',
})

export const makeSentry = (config: Config, app: Express): SentryHandlers => {
  if (!config.sentry.enabled) {
    log.info('sentry reporting disabled')

    return fakeSentry
  }

  log.info('sentry reporting enabled')

  sentry.init({
    ...config.sentry.options,
    integrations: [
      new Apm.Integrations.Tracing(),
      new Apm.Integrations.Express({ app }),
    ],
  })

  return {
    sentry,
    requestHandler () {
      app.use(sentry.Handlers.requestHandler())
    },
    errorHandler () {
      app.use(sentry.Handlers.errorHandler())
    },
  }
}
