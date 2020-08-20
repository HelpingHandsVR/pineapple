import Vue, { ComponentOptions } from 'vue'
import Tracker from '@asayerio/tracker'

export const withAsayerSentry = (): ComponentOptions<Vue> => ({
  mounted (): void {
    if (!this.$asayer) {
      return null
    }

    const tracker = this.$asayer as Tracker

    this.$sentry.setTag('asayer_session_id', tracker.sessionID())
  },
})
