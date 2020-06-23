<script lang="ts">
import Vue from 'vue'
import qs from 'querystring'

import {DiscordOauthUrlDocument} from '../../../../generated/composition'

export default {
  apollo: {
    discordOauthURL: {
      query: DiscordOauthUrlDocument,
    }
  },
  data () {
    return {
      discordOauthURL: null,
    }
  }
}
</script>

<template lang="pug">
  v-layout(column, justify-center, align-center)
    v-flex(xs12, sm8, md6)
      v-btn(
        :href='discordOauthURL'
        :disabled='!discordOauthURL'
        :loading='!discordOauthURL'
      )
        | Click here to link
</template>
