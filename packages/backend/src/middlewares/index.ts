import { Config } from '@/lib/config/type'
import { Express } from 'express'

import { makeHelmet } from './helmet'

export const applyAll = (app: Express, config: Config): void => {
  makeHelmet(app, config)
}
