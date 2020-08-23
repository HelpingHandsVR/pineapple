<script lang="ts">
import Vue from 'vue'

const discordBackground = require('~/assets/discord-longart.png')
const discordBackgroundSmall = require('~/assets/discord-longart-small.jpg')

export default Vue.extend({
  name: 'discord-linking-card-base-unlinked',
  data () {
    return {
      discordBackground,
      discordBackgroundSmall,
    }
  },
  props: {
    discordOauthURL: {
      type: String,
      required: false,
      default: '',
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<template lang="pug">
  gradient-card(
    :lazy-src='discordBackgroundSmall'
    :src='discordBackground'
  )
    template(v-slot:image-content)
      | Discord link

    template(v-if='loading')
      | Loading...

    template(v-else)
      v-row(no-gutters)
        v-col
          v-badge.mr-2(
            color='error'
            icon='mdi-link-off'
            inline
            left
          )
            | Not linked yet

        v-col(align='end')
          v-btn(
            small
            text
            :href='discordOauthURL'
            :disabled='!discordOauthURL'
            :loading='!discordOauthURL && loading'
          )
            | Link now
</template>
