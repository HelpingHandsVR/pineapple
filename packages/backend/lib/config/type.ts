import { LoggerOptions } from 'pino'
import IORedis from 'ioredis'

export type Config = {
  features: {
    disableMiddleware: boolean,
    playground: boolean,
    corsOrigin: string[],
    sessionSecret: string,
    sessionDomain: string,
  },
  log: LoggerOptions,
  redis: IORedis.RedisOptions,
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
