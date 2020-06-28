<script lang="ts">
import { DateTime } from 'luxon'

import { ViewerDocument, Viewer } from '../../generated/composition'
import discordBackground from '~/assets/discord-longart.png'
import discordBackgroundSmall from '~/assets/discord-longart-small.jpg'

type Data = {
  viewer: Viewer,
  discordBackground: string,
  discordBackgroundSmall: string,
}

export default {
  apollo: {
    viewer: {
      query: ViewerDocument,
    }
  },
  data (): Data {
    return {
      viewer: null,
      discordBackground,
      discordBackgroundSmall,
    }
  },
  middleware: [
    'auth'
  ],
  mounted () {
    if ('refetch' in this.$route.query) {
      this.$apollo.queries.viewer.refetch()
    }
  },
  computed: {
    badgeColour () {
      let result = 'grey'

      if (!this.viewer) {
        return result
      }

      if (this.viewer.vrchatUser.state === 'online') {
        result = 'success'
      }

      return result
    }
  },
  methods: {
    relativeFormat (dateString: string) {
      return DateTime.fromISO(dateString).toRelative()
    }
  }
}
</script>

<style lang="scss" scoped>
// .test1 {
//   box-shadow: 0 0 5px 2px green;
// }
</style>

<template lang="pug">
  v-skeleton-loader(v-if='$apollo.queries.viewer.loading')
  div(v-else-if='$apollo.queries.viewer.error')
    | Error: {{$apollo.queries.viewer.error}}
  v-container(v-else)
    v-row
      v-col(md='6')

        v-container
          v-card
            v-img.align-end(
              :lazy-src='discordBackgroundSmall'
              :src='discordBackground'
              height='100'
              gradient='to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 20)'
            )
              v-card-title
                | Discord link
            v-card-text(v-if='viewer.user.discord')
              v-badge.mr-2(
                color='success'
                icon='mdi-check'
                inline
                left
              )
                | Your account is already linked, nothing to do!
            v-card-text(v-else)
              | Not linked yet


        v-container
          v-card
            v-card-title
              | Teszt cucc ide 2

      //-
      //- VRCHAT
      //-
      v-col(md='6')
        v-container
          v-card
            v-img.align-end(
              :lazy-src='viewer.vrchatUser.currentAvatarThumbnailImageUrl'
              :src='viewer.vrchatUser.currentAvatarImageUrl'
              height='200'
              gradient='to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 20)'
            )
              v-card-title(dark)
                v-badge.mb-1.mr-2(inline, :color='badgeColour', left, dot)
                | {{viewer.vrchatUser.displayName}}
              v-card-subtitle(dark)
                | {{viewer.vrchatUser.statusDescription}}

            v-card-text
              | Role: {{viewer.vrchatUser.role}}
              br
              | State: {{viewer.vrchatUser.state}}
              br
              | E-mail: {{viewer.vrchatUser.obfuscatedEmail}}
              br
              | Last login: {{relativeFormat(viewer.vrchatUser.last_login)}}
              br
              | 2FA enabled: {{viewer.vrchatUser.twoFactorAuthEnabled ? 'Yes' : 'No'}}
</template>
