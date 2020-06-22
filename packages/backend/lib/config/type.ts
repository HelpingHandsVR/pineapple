import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export type Config = {
  db: PostgresConnectionOptions,
}
