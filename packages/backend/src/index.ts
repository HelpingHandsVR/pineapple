import 'reflect-metadata'
import path from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { makeSchema } from '@nexus/schema'

import * as vrchatTypes from './graphql/components/vrchat-api'
import * as discordTypes from './graphql/components/discord'
import * as userTypes from './graphql/components/user'
import * as authTypes from './graphql/components/authorization'

import { makeContextFactory } from './graphql/context'

const main = async () => {
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

  const server = new GraphQLServer({
    schema,
    context: await makeContextFactory(),
  })

  server.start(({ port }) => console.log(`Server running on port ${port}`))
}

main()
  .catch(console.error)
