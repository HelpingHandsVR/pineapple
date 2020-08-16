import 'reflect-metadata'
import path from 'path'
import express from 'express'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { makeSchema } from '@nexus/schema'
import { applyMiddleware } from 'graphql-middleware'
import createHttpLogger from 'pino-http'
import fs from 'fs'
import { pascalCase } from 'change-case'
import WebSocket from 'ws'
import * as sentry from '@sentry/node'

import * as scalars from './graphql/scalars'
import * as paginationTypes from './graphql/pagination'

import * as vrchatTypes from './graphql/components/vrchat-api'
import * as discordTypes from './graphql/components/discord'
import * as userTypes from './graphql/components/user'
import * as authorisationTypes from './graphql/components/authorization'
import * as authenticationTypes from './graphql/components/authentication'
import * as attendableTypes from './graphql/components/attendable'
import * as adminTyoes from './graphql/components/admin'

import * as middlewares from './middlewares'
import * as passport from './graphql/passport'
import { makeContextFactory } from './graphql/context'
import { permissions } from './graphql/permissions'
import { getConfig } from '@/lib/config/coerce'
import { getConnection } from 'typeorm'
import { makeErrorHandlerMiddleware } from './graphql/error-handler'
import { log } from '@/lib/log'
import { makeSentry } from '@/lib/sentry'
import { SentryApolloServerPlugin } from '@/lib/sentry/apollo-server-plugin'

const main = async () => {
  const config = getConfig(process.env)

  const typegenAutoConfig = {
    debug: false,
    sources: [
      {
        alias: 'ctx',
        source: path.join(__dirname, 'graphql/context/index.ts'),
      },
    ],
    contextType: 'ctx.Context',
  }

  if (process.env.NODE_ENV === 'development') {
    const files = await fs.promises.readdir('./src/db/entity')

    typegenAutoConfig.sources.push(...files.map((entityFile) => {
      return {
        alias: pascalCase(path.parse(entityFile).name),
        source: path.join('./src/db/entity', entityFile),
      }
    }))
  }

  const baseSchema = makeSchema({
    shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
    types: {
      ...scalars,
      ...paginationTypes,

      ...vrchatTypes,
      ...discordTypes,
      ...userTypes,
      ...authorisationTypes,
      ...authenticationTypes,
      ...attendableTypes,
      ...adminTyoes,
    },
    outputs: {
      schema: path.resolve(path.join(__dirname, 'generated/schema.graphql')),
      typegen: path.resolve(path.join(__dirname, 'generated/types.ts')),
    },
    typegenAutoConfig,
  })

  let schema = applyMiddleware(baseSchema, makeErrorHandlerMiddleware())

  if (config.features.disableMiddleware) {
    log.warn('middlewares are disabled, no permission checks will run!')
  } else {
    const middleware = [...permissions, makeErrorHandlerMiddleware()]

    schema = applyMiddleware(schema, ...middleware)
  }

  const httpLogger = createHttpLogger({
    logger: log.child({
      component: 'http-server',
    }),
    useLevel: 'trace',
    serializers: {
      req (req) {
        Reflect.deleteProperty(req, 'headers')

        return req
      },
      res (res) {
        Reflect.deleteProperty(res, 'headers')

        return res
      },
    },
  })

  const apolloPlugins = []

  if (config.sentry.enabled) {
    apolloPlugins.push(new SentryApolloServerPlugin())
  }

  const server = new ApolloServer({
    debug: process.env.NODE_ENV === 'development',
    schema,
    introspection: true,
    context: await makeContextFactory(config),
    plugins: apolloPlugins,
    playground: {
      endpoint: '/graphql',
      subscriptionEndpoint: '/graphql',
    },
    subscriptions: {
      path: '/graphql',
      onConnect (connectionParams: Record<string, unknown>, websocket: WebSocket, context: unknown) {
        return context
      },
    },
  })

  const app = express()
  const sentryHandlers = makeSentry(config, app)

  app.set('trust proxy', config.features.trustProxy)

  sentryHandlers.requestHandler()
  app.use(httpLogger)

  await passport.applyMiddleware(app, config, getConnection('default'))
  middlewares.applyAll(app, config)

  server.applyMiddleware({
    app,
    cors: {
      origin: config.features.corsOrigin,
      credentials: true,
      methods: [
        'OPTIONS',
        'GET',
        'POST',
      ],
    },
  })

  sentryHandlers.errorHandler()

  const httpServer = http.createServer(app)

  server.installSubscriptionHandlers(httpServer)

  httpServer.listen(config.api.port, '0.0.0.0', () => {
    log.info(`Server running: http://[::1]:${config.api.port}${server.graphqlPath}`)
  })
}

main()
  .catch((error) => {
    log.error(error, 'error while starting server')

    sentry.captureException(error)
  })
