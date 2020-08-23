<script>
import { ErrorPageViewerDocument } from '../../generated/composition'

export default {
  apollo: {
    viewer: {
      query: ErrorPageViewerDocument,
    }
  },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      viewer: null,
      loading: false,
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  methods: {
    openSentry () {
      this.loading = true

      // Sentry's dialog doesn't open immediately, but it doesn't tell us about
      // the delay, so we fake some loading here
      setTimeout(() => {
        this.loading = false
      }, 1500)

      this.$sentry.showReportDialog({
        title: "Woah there's been an error!",
        subtitle: 'Thanks for helping! Please describe what you did to get this error to occur.',
        user: {
          email: this.viewer.user.email,
          name: this.viewer.user.display,
        }
      })
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

<template lang="pug">
  layout-base
    v-card
      template(v-if='error.statusCode === 404')
        v-card-title
          | 404 - Not found

      template(v-else)
        v-card-title
          | Woah there's been an error!
        v-card-subtitle
          | {{error.message}}

      v-card-actions
        v-btn(to='/', nuxt, text)
          v-icon mdi-home
          | Home page

        v-btn(
          text
          color='primary'
          @click='openSentry'
          :disabled='!viewer'
          :loading='loading || !viewer'
        )
          v-icon mdi-send
          | Send details
</template>
