import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export type Config = {
  db: PostgresConnectionOptions,
  discord: {
    clientId: string,
    redirectUri: string,
    clientSecret: string,
  },
  api: {
    port: number,
  }
}
