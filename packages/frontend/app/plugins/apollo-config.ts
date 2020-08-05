import { getConfig } from '~/../lib/config/coerce'
import { Context } from '@nuxt/types'
import { Store } from 'vuex/types'

import { ApolloClientConfig } from '@nuxtjs/apollo/types/nuxt'
import { Toast } from '~/store/ui'

import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

const config = getConfig()

const httpLink = () => new BatchHttpLink({
  batchInterval: 100,
  credentials: 'include',
  uri: config.graphql.endpoint,
})

const errorLink = (store: Store<unknown>) => onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((graphQLError) => {
      const toast: Toast = {
        title: 'Application error',
        message: graphQLError.message,
        type: 'error',
        icon: 'mdi-alert-circle',
      }

      store.commit('ui/createToast', toast)
    })
  }

  if (networkError) {
    const toast: Toast = {
      title: 'Network error',
      message: networkError.message,
      type: 'error',
      icon: 'mdi-network-strength-off',
    }

    store.commit('ui/createToast', toast)
  }
})

const passCookieLink = (cookieHeader: string) => setContext(() => ({
  headers: {
    cookie: cookieHeader,
  },
}))

type MakeClientLinkInput = {
  store: Store<unknown>
}

const makeClientLink = ({ store }: MakeClientLinkInput) => ApolloLink.from([
  errorLink(store),
  httpLink(),
])

type MakeServerLinkInput = {
  cookie: string,
}

const makeServerLink = ({ cookie }: MakeServerLinkInput) => ApolloLink.from([
  passCookieLink(cookie),
  httpLink(),
])

export default (context: Context): ApolloClientConfig => {
  if (process.server) {
    const cookieHeader = context.req.headers.cookie

    return {
      defaultHttpLink: false,
      link: makeServerLink({ cookie: cookieHeader }),
      cache: false,
    }
  }

  return {
    defaultHttpLink: false,
    link: makeClientLink(context),
    cache: new InMemoryCache(),
  }
}
