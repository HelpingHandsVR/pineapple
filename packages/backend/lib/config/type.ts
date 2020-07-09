import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export type Config = {
  features: {
    disableMiddleware: boolean,
    sessionSecret: string,
    playground: boolean,
    corsOrigin: string[],
  },
  db: PostgresConnectionOptions,
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
