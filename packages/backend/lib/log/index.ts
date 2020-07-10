import createLogger from 'pino'
import { getConfig } from '../config/coerce'

const config = getConfig(process.env)

export const log = createLogger(config.log)
