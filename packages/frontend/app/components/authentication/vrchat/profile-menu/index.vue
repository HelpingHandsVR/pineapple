<script lang="ts">
import Vue from 'vue'

import {VrcViewerDocument, VrChatExtendedUser} from '../../../../../generated/composition'

type Data = {
  value: boolean,
  vrcViewer: VrChatExtendedUser,
}

export default {
  apollo: {
    vrcViewer: {
      query: VrcViewerDocument
    }
  },
  data (): Data {
    return {
      value: false,
      vrcViewer: null,
    }
  },
}
</script>

<template lang="pug">
  v-menu(v-model='value', top, right, min-width='200px')
    template(v-slot:activator='{on, attrs}')
      v-btn(
        icon
        x-large
        v-bind='attrs'
        v-on='on'
        :loading='$apollo.queries.vrcViewer.loading'
      )
        v-avatar(v-if='!$apollo.queries.vrcViewer.loading && vrcViewer')
          v-img(:src='vrcViewer.currentAvatarThumbnailImageUrl')

    v-list(v-if='!$apollo.queries.vrcViewer.loading && vrcViewer')
      v-list-item(@click.stop)
        v-list-item-content
          v-list-item-title
            b {{vrcViewer.displayName}}
          v-list-item-subtitle VRC role: {{vrcViewer.role}}
          v-list-item-subtitle Pineapple role: role_placeholder
        v-list-item-avatar(size='64px')
          v-img(:src='vrcViewer.currentAvatarThumbnailImageUrl')

      v-divider

      v-list-item(@click='$emit("logout")')
        v-list-item-title Logout
</template>
