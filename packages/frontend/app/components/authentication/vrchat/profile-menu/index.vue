<script lang="ts">
import Vue from 'vue'

import {ViewerDocument, Viewer} from '../../../../../generated/composition'

type Data = {
  value: boolean,
  viewer: Viewer,
}

export default {
  apollo: {
    viewer: {
      query: ViewerDocument
    }
  },
  data (): Data {
    return {
      value: false,
      viewer: null,
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
        :loading='$apollo.queries.viewer.loading'
      )
        v-avatar
          v-img(v-if='!$apollo.queries.viewer.loading && viewer', :src='viewer.vrchatUser.currentAvatarThumbnailImageUrl')

    v-list
      v-list-item(@click.stop, v-if='!$apollo.queries.viewer.loading && viewer')
        v-list-item-content
          v-list-item-title
            b {{viewer.vrchatUser.displayName}}
          v-list-item-subtitle VRC role: {{viewer.vrchatUser.role}}
          v-list-item-subtitle Pineapple role: {{viewer.user.role.name}}
        v-list-item-avatar(size='64px')
          v-img(:src='viewer.vrchatUser.currentAvatarThumbnailImageUrl')

      v-divider

      v-list-item(@click='$emit("logout")')
        v-list-item-title Logout
</template>
