<script lang="ts">
import { mapGetters } from 'vuex'

import {
  IndexPageViewerDocument,
  Viewer,
  DiscordOauthUrlDocument,
} from '../../generated/composition'

import VrchatLinkingCard from '../components/containers/vrchat/linking/card/index.vue'
import DiscordLinkingCard from '../components/containers/discord/linking/card/index.vue'

type Data = {
  viewer: Viewer,
  discordOauthURL: string,
}

export default {
  components: {
    VrchatLinkingCard,
    DiscordLinkingCard,
  },
  apollo: {
    viewer: {
      query: IndexPageViewerDocument,
    },
  },
  data (): Data {
    return {
      viewer: null,
      discordOauthURL: null,
    }
  },
  middleware: [
    'auth'
  ],
  mounted () {
    if ('refetch' in this.$route.query) {
      this.$apollo.queries.viewer.refetch()
      this.$router.push('/')
    }
  },
  computed: {
    mockEvents () {
      const now = new Date().getTime()

      return new Array(20).fill(null).map((value, index) => {
        const start = now + 8000000 * index
        const end = start + 3800000

        return {
          name: 'ASL Test',
          start,
          end,
          timed: true
        }
      })
    }
  },
}
</script>

<template lang="pug">
  v-skeleton-loader(v-if='$apollo.queries.viewer.loading')
  v-container(v-else-if='viewer')
    v-row
      v-col(md='6')

        v-container
          discord-linking-card(:user-id='viewer.user.id')

        v-container
          v-card
            v-card-title
              | Upcoming events today
            v-card-subtitle
              | unfinished, mock data
            v-card-text
              v-sheet(height='500')
                v-calendar(
                  type='day'
                  :events='mockEvents'
                )

      //-
      //- VRCHAT
      //-

      v-col(md='6')
        v-container
          vrchat-linking-card(:vrcUserId='viewer.user.vrchat')
</template>
