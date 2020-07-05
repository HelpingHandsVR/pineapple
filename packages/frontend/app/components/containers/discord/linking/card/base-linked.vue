<script lang="ts">
import Vue from 'vue'

const discordBackground = require('~/assets/discord-longart.png')
const discordBackgroundSmall = require('~/assets/discord-longart-small.jpg')

export default Vue.extend({
  name: 'discord-linking-card-base-linked',
  data () {
    return {
      discordBackground,
      discordBackgroundSmall,
    }
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    }
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
    template(v-else-if='user.discord')
      v-row(no-gutters)
        v-col(md='8')
          v-badge.mr-2(
            color='success'
            icon='mdi-check'
            inline
            left
          )
            | Your account is linked, nothing to do!

        v-col(align='end')
          v-chip(
            color='secondary'
            ripple
            small
          )
            v-avatar(tile, left)
              v-icon(small) mdi-discord
            | {{user.discord.account.username}}\#{{user.discord.account.discriminator}}
</template>
