import { Context } from '@nuxt/types'
import { ApolloClientConfig } from '@nuxtjs/apollo/types/nuxt'

import { Store } from 'vuex/types'
import { Toast } from '~/store/ui'

import { AuthorisationErrorResolution } from '../../../backend/lib/permission/errors/authorisation-error'
import { getConfig } from '~/../lib/config/coerce'

import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

const config = getConfig()

const makeHttpLink = () => new BatchHttpLink({
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

const makePassCookieLink = (cookieHeader: string) => setContext(() => ({
  headers: {
    cookie: cookieHeader,
  },
}))

const makeSentryLink = (sentry: Context['$sentry']) => onError(({ graphQLErrors, operation }) => {
  sentry.setTag('operationName', operation.operationName)

  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      sentry.captureEvent(error)
    })
  }
})

const makeApiErrorHandlerLink = (context: Context) => onError(({ graphQLErrors, forward, operation }) => {
  if (graphQLErrors) {
    graphQLErrors
      .filter((graphQLError) => 'extensions' in graphQLError)
      .filter((graphQLError) => 'resolution' in graphQLError.extensions)
      .forEach((graphQLError) => {
        switch (graphQLError.extensions.resolution) {
          // If the API says so, we send the user back to the login screen
          case AuthorisationErrorResolution.LOGOUT:
            // Prevent infinite redirect loops
            if (context.route.name === 'login') {
              return null
            }

            return context.redirect(307, '/login?flash=unauthenticated')

          // Apollo will retry the operation if it's forwarded
          case AuthorisationErrorResolution.RETRY:
            return forward(operation)

          // If instructed to do so, or when we get an unknown resolution, we
          // just drop the request and display an error to the user (with a
          // different link).
          case AuthorisationErrorResolution.ABANDON:
          default:
            break
        }
      })
  }
})

const makeClientLink = (context: Context) => ApolloLink.from([
  makeSentryLink(context.$sentry),
  errorLink(context.store),
  makeApiErrorHandlerLink(context),
  makeHttpLink(),
])

type MakeServerLinkInput = {
  cookie: string,
}

const makeServerLink = (context: Context, { cookie }: MakeServerLinkInput) => ApolloLink.from([
  makeSentryLink(context.$sentry),
  makePassCookieLink(cookie),
  makeApiErrorHandlerLink(context),
  makeHttpLink(),
])

export default (context: Context): ApolloClientConfig => {
  if (process.server) {
    const cookieHeader = context.req.headers.cookie

    return {
      defaultHttpLink: false,
      link: makeServerLink(context, { cookie: cookieHeader }),
      cache: false,
    }
  }

  return {
    defaultHttpLink: false,
    link: makeClientLink(context),
    cache: new InMemoryCache(),
  }
}
