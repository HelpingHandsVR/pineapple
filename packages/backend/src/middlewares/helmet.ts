import { Express } from 'express'
import helmet from 'helmet'

import { Config } from '@/lib/config/type'

export const makeHelmet = (app: Express, config: Config): void => {
  if (config.features.playground) {
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          fontSrc: [
            'fonts.googleapis.com',
            'fonts.gstatic.com',
          ],
          styleSrc: [
            'cdn.jsdelivr.net',
            'fonts.googleapis.com',
            "'unsafe-inline'",
          ],
        },
      },
    }))
  } else {
    app.use(helmet())
  }
}
