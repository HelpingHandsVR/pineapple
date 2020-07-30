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
  inject: ['theme'],
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
    tag=''
  )
    template(v-slot='{result: {loading, error, data}}')
      v-fade-transition(mode='out-in')
        v-sheet(
          :color='`grey ${theme.isDark ? "darken-2" : "lighten-4"}`'
          v-if='loading'
        )
          v-skeleton-loader(type='card', height='160', elevation='2')

        discord-linking-card-base-linked(
          v-else-if='data.user.discord'
          :loading='loading'
          :user='data.user'
        )

        apollo-query(
          v-else
          :query='urlQuery'
          notify-on-network-status-change
          tag=''
        )
          template(v-slot='{result: {loading, error, data}}')
            discord-linking-card-base-unlinked(
              :loading='loading'
              :user='loading ? null : data.user'
              :discordOauthURL='loading ? null : data.discordOauthURL'
            )
</template>
