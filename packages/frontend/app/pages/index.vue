<script lang="ts">
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'

import {
  IndexPageViewerDocument,
  Viewer,
  DiscordOauthUrlDocument,
} from '../../generated/composition'

const discordBackground = require('~/assets/discord-longart.png')
const discordBackgroundSmall = require('~/assets/discord-longart-small.jpg')

type Data = {
  viewer: Viewer,
  discordBackground: string,
  discordBackgroundSmall: string,
  discordOauthURL: string,
}

export default {
  apollo: {
    viewer: {
      query: IndexPageViewerDocument,
    },
    discordOauthURL: {
      query: DiscordOauthUrlDocument,
      skip () {
        return !this.getDiscordOauthURL
      }
    }
  },
  data (): Data {
    return {
      viewer: null,
      discordBackground,
      discordBackgroundSmall,
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
    ...mapGetters({
      dark: 'ui/isDark',
    }),
    badgeColour () {
      let result = 'grey'

      if (!this.viewer) {
        return result
      }

      if (this.viewer.user.vrchat.state === 'online') {
        result = 'success'
      }

      return result
    },
    gradient () {
      if (this.dark) {
        return `
          to bottom,
            rgba(0, 0, 0, 0) 40%,
            rgba(30, 30, 30, 20) 100%
        `
      }

      return `
        to bottom,
          rgba(0, 0, 0, 0) 40%,
          rgba(255, 255, 255, 20) 100%
      `
    },
    getDiscordOauthURL () {
      if (!this.viewer) {
        return true
      }

      return !this.viewer.user.discord
    },
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
  methods: {
    relativeFormat (dateString: string) {
      return DateTime.fromISO(dateString).toRelative()
    }
  }
}
</script>

<template lang="pug">
  v-skeleton-loader(v-if='$apollo.queries.viewer.loading')
  v-container(v-else-if='viewer')
    v-row
      v-col(md='6')

        v-container
          v-card
            v-img.align-end(
              :lazy-src='discordBackgroundSmall'
              :src='discordBackground'
              height='100'
              :gradient='gradient'
            )
              v-card-title
                | Discord link
            v-card-text(v-if='viewer.user.discord')
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
                    | {{viewer.user.discord.account.username}}\#{{viewer.user.discord.account.discriminator}}

            v-card-text(v-else)
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
                    :loading='!discordOauthURL && $apollo.queries.discordOauthURL.loading'
                  )
                    | Link now


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
          v-card(v-if='viewer.user.vrchat')
            v-img.align-end(
              :lazy-src='viewer.user.vrchat.currentAvatarThumbnailImageUrl'
              :src='viewer.user.vrchat.currentAvatarImageUrl'
              height='200'
              :gradient='gradient'
              v-if='viewer.user.vrchat'
            )
              v-card-title(dark)
                v-badge.mb-1.mr-2(inline, :color='badgeColour', left, dot)
                | {{viewer.user.vrchat.displayName}}
              v-card-subtitle(dark)
                | {{viewer.user.vrchat.statusDescription}}

            v-card-text
              | VRChat role: {{viewer.user.vrchat.role}}
              br
              | Pineapple role: {{viewer.user.role.name}}
              br
              | State: {{viewer.user.vrchat.state}}
              br
              | Last login: {{relativeFormat(viewer.user.vrchat.last_login)}}
</template>
