<script lang="ts">
import Vue from 'vue'

import {ProfileMenuViewerDocument, Viewer} from '../../../../generated/composition'
import Anon from '../../../assets/anon.png'

type Data = {
  value: boolean,
  viewer: Viewer,
  Anon: string,
}

export default {
  apollo: {
    viewer: {
      query: ProfileMenuViewerDocument
    }
  },
  data (): Data {
    return {
      value: false,
      viewer: null,
      Anon,
    }
  },
}
</script>

<template lang="pug">
  v-menu(v-model='value', top, right, min-width='200px')
    template(v-slot:activator='{on, attrs}')
      client-only
        v-btn(
          icon
          x-large
          v-bind='attrs'
          v-on='on'
          :loading='$apollo.queries.viewer.loading'
        )
          v-avatar(size='40px')
            v-img(
              v-if='!$apollo.queries.viewer.loading && viewer.user.vrchat'
              :src='viewer.user.vrchat.currentAvatarThumbnailImageUrl'
            )
            v-img(
              v-else
              :src='Anon'
            )

    v-list
      v-list-item(@click.stop, v-if='!$apollo.queries.viewer.loading && viewer.user.vrchat')
        v-list-item-content
          v-list-item-title
            b {{viewer.user.vrchat.displayName}}
          v-list-item-subtitle VRC role: {{viewer.user.vrchat.role}}
          v-list-item-subtitle Pineapple role: {{viewer.user.role.name}}
        v-list-item-avatar(size='64px')
          v-img(:src='viewer.user.vrchat.currentAvatarThumbnailImageUrl')

      v-divider

      v-list-item(@click='$emit("logout")')
        v-list-item-title Logout
</template>
