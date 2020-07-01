import 'reflect-metadata'
import path from 'path'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { makeSchema } from '@nexus/schema'
import { applyMiddleware } from 'graphql-middleware'

import * as vrchatTypes from './graphql/components/vrchat-api'
import * as discordTypes from './graphql/components/discord'
import * as userTypes from './graphql/components/user'
import * as authorisationTypes from './graphql/components/authorization'
import * as authenticationTypes from './graphql/components/authentication'

import * as passport from './graphql/passport'
import { makeContextFactory } from './graphql/context'
import { permissions } from './graphql/permissions'
import { getConfig } from '@/lib/config/coerce'
import { getConnection } from 'typeorm'
import { makeErrorHandlerMiddleware } from './graphql/error-handler'

const main = async () => {
  const config = getConfig(process.env)
  const baseSchema = makeSchema({
    shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
    types: {
      ...vrchatTypes,
      ...discordTypes,
      ...userTypes,
      ...authorisationTypes,
      ...authenticationTypes,
    },
    outputs: {
      schema: path.join(__dirname, 'generated/schema.graphql'),
      typegen: path.join(__dirname, 'generated/types.ts'),
    },
    typegenAutoConfig: {
      debug: false,
      sources: [
        {
          alias: 'ctx',
          source: path.join(__dirname, 'graphql/context/index.ts'),
        },
      ],
      contextType: 'ctx.Context',
    },
  })

  let schema = null

  if (config.features.disableMiddleware) {
    console.warn('Middlewares are disabled, no permission checks will run!')
    schema = applyMiddleware(baseSchema, makeErrorHandlerMiddleware())
  } else {
    const middleware = [...permissions, makeErrorHandlerMiddleware()]

    schema = applyMiddleware(baseSchema, ...middleware)
  }

  const server = new ApolloServer({
    schema,
    context: await makeContextFactory(config),
    playground: {
      endpoint: '/graphql',
    },
  })

  const app = express()

  await passport.applyMiddleware(app, config, getConnection('default'))

  server.applyMiddleware({ app })

  app.listen({ port: config.api.port }, () => {
    console.log(`Server running: http://[::1]:${config.api.port}${server.graphqlPath}`)
  })
}

main()
  .catch(console.error)
