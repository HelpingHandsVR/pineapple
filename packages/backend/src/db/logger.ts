import { Logger } from 'typeorm'
import { log } from '@/lib/log'

export class TypeormPinoLogger implements Logger {
  private logger = log.child({
    component: 'typeorm',
  })

  log (level: string, message: string): void {
    this.logger.trace({
      level,
      message,
    })
  }

  logMigration (message: string): void {
    this.logger.info(message)
  }

  logQuery (query: string, parameters: string[]): void {
    this.logger.trace({
      parameters,
    }, query)
  }

  logQueryError (error: string, query: string, parameters: string[]): void {
    this.logger.error({
      query,
      parameters,
    }, error)
  }

  logQuerySlow (time: number, query: string, parameters: string[]): void {
    this.logger.error({
      time,
      query,
      parameters,
    }, 'slow query detected')
  }

  logSchemaBuild (message: string): void {
    this.logger.debug(message)
  }
}
