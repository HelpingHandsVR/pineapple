<script lang="ts">
import Vue from 'vue'
import {
  DiscordLinkingCardQueryDocument,
  DiscordOauthUrlDocument,
} from '../../../../../../generated/composition'

import DiscordLinkingCardBaseLinked from './base-linked.vue'
import DiscordLinkingCardBaseUnlinked from './base-unlinked.vue'

export default Vue.extend({
  name: 'discord-linking-card',
  components: {
    DiscordLinkingCardBaseLinked,
    DiscordLinkingCardBaseUnlinked,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      dataQuery: DiscordLinkingCardQueryDocument,
      urlQuery: DiscordOauthUrlDocument,
    }
  },
  computed: {
    variables () {
      return {
        where: {
          id: this.userId,
        }
      }
    },
  }
})
</script>

<template lang="pug">
  apollo-query(
    :query='dataQuery'
    :variables='variables'
    notify-on-network-status-change
  )
    template(v-slot='{result: {loading, error, data}}')
      div(v-if='loading') Loading...

      discord-linking-card-base-linked(
        v-else-if='data.user.discord'
        :loading='loading'
        :user='data.user'
      )

      apollo-query(
        v-else
        :query='urlQuery'
        notify-on-network-status-change
      )
        template(v-slot='{result: {loading, error, data}}')
          div(v-if='loading') Loading...

          discord-linking-card-base-unlinked(
            v-else-if='data.discordOauthURL'
            :loading='loading'
            :user='data.user'
            :discordOauthURL='data.discordOauthURL'
          )
</template>
