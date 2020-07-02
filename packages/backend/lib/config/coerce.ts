import { Config } from './type'

export const getConfig = (env: NodeJS.ProcessEnv): Config => ({
  features: {
    disableMiddleware: env.DISABLE_MIDDLEWARE === 'true',
    sessionSecret: env.SESSION_SECRET,
    playground: env.GRAPHQL_PLAYGROUND === 'true',
    corsOrigin: env.CORS_ORIGIN.split(','),
  },
  db: {
    type: 'postgres',
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    port: Number.parseInt(env.DB_PORT, 10),
    username: env.DB_USERNAME,
    database: env.DB_DATABASE,
    synchronize: env.DB_SYNC === 'true',
    logging: env.DB_LOGGING === 'true',
    migrationsRun: env.DB_MIGRATIONS === 'true',
  },
  discord: {
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
    redirectUri: env.DISCORD_REDIRECT_URL,
  },
  api: {
    port: Number.parseInt(env.API_PORT, 10),
  },
  vrchat: {
    bot: {
      username: env.VRCHAT_BOT_USERNAME,
      password: env.VRCHAT_BOT_PASSWORD,
    },
  },
})
