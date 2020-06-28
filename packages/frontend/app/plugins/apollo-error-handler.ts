import { Context } from '@nuxt/types'
import { ErrorResponse } from 'apollo-link-error'

import { Toast } from '~/store/ui'

export default ({ graphQLErrors, networkError }: ErrorResponse, nuxtContext: Context): any => {
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
}
