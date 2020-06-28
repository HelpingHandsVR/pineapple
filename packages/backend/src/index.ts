import 'reflect-metadata'
import path from 'path'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { makeSchema } from '@nexus/schema'
import { applyMiddleware } from 'graphql-middleware'

import * as vrchatTypes from './graphql/components/vrchat-api'
import * as discordTypes from './graphql/components/discord'
import * as userTypes from './graphql/components/user'
import * as authTypes from './graphql/components/authorization'

import { makeContextFactory } from './graphql/context'
import { permissions } from './graphql/permissions'
import { getConfig } from '@/lib/config/coerce'

const main = async () => {
  const config = getConfig(process.env)
  const schema = makeSchema({
    shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
    types: {
      ...vrchatTypes,
      ...discordTypes,
      ...userTypes,
      ...authTypes,
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
  const middleware = [...permissions]
  const schemaWithMiddleware = applyMiddleware(schema, ...middleware)

  const server = new ApolloServer({
    schema: schemaWithMiddleware,
    context: await makeContextFactory(),
    playground: {
      endpoint: '/graphql',
    },
  })

  const app = express()

  server.applyMiddleware({ app })

  app.listen({ port: config.api.port }, () => {
    console.log(`Server running: http://[::1]:${config.api.port}${server.graphqlPath}`)
  })
}

main()
  .catch(console.error)
