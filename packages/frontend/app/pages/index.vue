<script lang="ts">
import { mapGetters } from 'vuex'
import { withQSRefetch } from '../mixins/refetch-qs'

import {
  IndexPageViewerDocument,
  Viewer,
  DiscordOauthUrlDocument,
} from '../../generated/composition'

import VrchatLinkingCard from '../components/containers/vrchat/linking/card/index.vue'
import DiscordLinkingCard from '../components/containers/discord/linking/card/index.vue'

type Data = {
  viewer: Viewer,
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
    }
  },
  middleware: ['auth'],
  mixins: [ withQSRefetch('viewer') ],
}
</script>

<template lang="pug">
  v-fade-transition(mode='out-in')
    v-container(v-if='viewer')
      v-row
        //-
        //- DISCORD
        //-

        v-col(md='6')
          v-container
            discord-linking-card(:user-id='viewer.user.id')

        //-
        //- VRCHAT
        //-

        v-col(md='6')
          v-container
            vrchat-linking-card(:vrc-user-id='viewer.user.vrchat')
</template>
