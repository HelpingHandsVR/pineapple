import { Config } from './type'

export const getConfig = (): Config => ({
  graphql: {
    endpoint: process.env.GRAPHQL_ENDPOINT,
  },
})
