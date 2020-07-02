import { getConfig } from '@/../lib/config/coerce'

const config = getConfig(process.env)

export default (context) => ({
  httpEndpoint: config.graphql.endpoint,
  httpLinkOptions: {
    credentials: 'include',
  },
})
