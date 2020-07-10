import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { LoggerOptions } from 'pino'

export type Config = {
  features: {
    disableMiddleware: boolean,
    sessionSecret: string,
    playground: boolean,
    corsOrigin: string[],
  },
  db: PostgresConnectionOptions,
  log: LoggerOptions,
  redis: {
    port: number,
    host: string,
    scope: string,
  },
  discord: {
    clientId: string,
    redirectUri: string,
    clientSecret: string,
  },
  api: {
    port: number,
  },
  vrchat: {
    pipelineWsURL: string,
    bot: {
      username: string,
      password: string,
    }
  }
}
