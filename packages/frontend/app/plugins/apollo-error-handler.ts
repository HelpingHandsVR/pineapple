import { Context } from '@nuxt/types'

export default ({ graphQLErrors, networkError, operation, forward }: any, nuxtContext: Context): void => {
  console.log('Global error handler triggered', graphQLErrors)
  // console.log(graphQLErrors, networkError, operation, forward, nuxtContext)
}
