import { Config } from '@/lib/config/type'
import { Express } from 'express'

import { makeHelmet } from './helmet'
import { makeBullBoard } from './bull-board'

export const applyAll = (app: Express, config: Config): void => {
  makeHelmet(app, config)
  makeBullBoard(app)
}
