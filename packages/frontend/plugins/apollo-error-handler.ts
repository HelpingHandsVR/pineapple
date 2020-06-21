export default ({ graphQLErrors, networkError, operation, forward }: any, nuxtContext: any): void => {
  console.log('Global error handler')
  console.log(graphQLErrors, networkError, operation, forward, nuxtContext)
}
