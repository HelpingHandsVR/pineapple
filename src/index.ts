import path from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { makeSchema } from '@nexus/schema'

import * as vrchatTypes from './graphql/components/vrchat-api'
import { makeContext } from './graphql/context'

const schema = makeSchema({
  shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
  types: {
    ...vrchatTypes,
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
  context: makeContext,
})

server.start(({ port }) => console.log(`Server running on port ${port}`))
