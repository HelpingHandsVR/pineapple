import { getConfig } from '~/../lib/config/coerce'
import { Context } from '@nuxt/types'

import { ApolloClientConfig } from '@nuxtjs/apollo/types/nuxt'
import { Toast } from '~/store/ui'

import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'

const config = getConfig()

const httpLink = () => new BatchHttpLink({
  batchInterval: 100,
  credentials: 'include',
  uri: config.graphql.endpoint,
})

const errorLink = (nuxtContext: Context) => onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((graphQLError) => {
      const toast: Toast = {
        title: 'Application error',
        message: graphQLError.message,
        type: 'error',
        icon: 'mdi-alert-circle',
      }

      nuxtContext.store.commit('ui/createToast', toast)
    })
  }

  if (networkError) {
    const toast: Toast = {
      title: 'Network error',
      message: networkError.message,
      type: 'error',
      icon: 'mdi-network-strength-off',
    }

    nuxtContext.store.commit('ui/createToast', toast)
  }
})

export default (context: Context): ApolloClientConfig => {
  return {
    defaultHttpLink: false,
    link: ApolloLink.from([
      errorLink(context),
      httpLink(),
    ]),
    cache: new InMemoryCache(),
  }
}
