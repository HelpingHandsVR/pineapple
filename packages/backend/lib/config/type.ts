import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export type Config = {
  features: {
    disableMiddleware: boolean,
    sessionSecret: string,
  },
  db: PostgresConnectionOptions,
  discord: {
    clientId: string,
    redirectUri: string,
    clientSecret: string,
  },
  api: {
    port: number,
  },
  vrchat: {
    bot: {
      username: string,
      password: string,
    }
  }
}
