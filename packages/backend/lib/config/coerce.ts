import { Config } from './type'

export const getConfig = (env: NodeJS.ProcessEnv): Config => ({
  features: {
    disableMiddleware: env.DISABLE_MIDDLEWARE === 'true',
    playground: env.GRAPHQL_PLAYGROUND === 'true',
    corsOrigin: env.CORS_ORIGIN.split(','),
    sessionSecret: env.SESSION_SECRET,
    sessionDomain: env.SESSION_DOMAIN,
    trustProxy: env.TRUST_PROXY === 'true',
    rateLimiting: {
      mutation: {
        max: Number.parseInt(env.RATE_LIMIT_MUTATION_MAX, 10),
        window: env.RATE_LIMIT_MUTATION_WINDOW,
      },
      query: {
        max: Number.parseInt(env.RATE_LIMIT_QUERY_MAX, 10),
        window: env.RATE_LIMIT_QUERY_WINDOW,
      },
    },
  },
  sentry: {
    enabled: env.SENTRY_ENABLED === 'true',
    options: {
      dsn: env.SENTRY_DSN,
      tracesSampleRate: Number.parseFloat(env.SENTRY_SAMPLE_RATE),
    },
  },
  log: {
    level: env.LOG_LEVEL,
    prettyPrint: env.NODE_ENV === 'development',
  },
  redis: {
    host: env.REDIS_HOST,
    port: Number.parseInt(env.REDIS_PORT, 10),
  },
  discord: {
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
    redirectUri: env.DISCORD_REDIRECT_URL,
  },
  api: {
    port: Number.parseInt(env.API_PORT, 10),
    url: env.API_URL,
  },
  vrchat: {
    pipelineWsURL: env.VRCHAT_PIPELINE_WS_URL,
    bot: {
      username: env.VRCHAT_BOT_USERNAME,
      password: env.VRCHAT_BOT_PASSWORD,
    },
  },
})
