<script lang="ts">
import Vue from 'vue'

import {
  ProfileMenuViewerDocument,
  ProfileMenuViewerQuery,
  Viewer
} from '../../../../../generated/composition'

const Anon = require('../../../../assets/anon.png')

type Data = {
  value: boolean,
  viewer: Viewer,
  Anon: string,
}

export default {
  apollo: {
    viewer: {
      query: ProfileMenuViewerDocument,
      result (result: {data: ProfileMenuViewerQuery}): void {
        if (!result.data?.viewer || !this.$ability) {
          return null
        }

        this.$ability.update(result.data.viewer.user.role.ability)
      },
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
  v-menu(v-model='value', top, right, min-width='300px')
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
              v-if='!$apollo.queries.viewer.loading && viewer && viewer.user.vrchat'
              :src='viewer ? viewer.user.vrchat.currentAvatarThumbnailImageUrl : null'
            )
            v-img(
              v-else
              :src='Anon'
            )

    v-list(v-if='viewer')
      v-list-item(@click.stop, v-if='!$apollo.queries.viewer.loading && viewer && viewer.user.vrchat')
        v-list-item-content
          v-list-item-title
            b {{viewer.user.vrchat.displayName}}
          v-list-item-subtitle VRC role: {{viewer.user.vrchat.role}}
          v-list-item-subtitle Pineapple role: {{viewer.user.role.name}}
        v-list-item-avatar(size='40px')
          v-img(:src='viewer.user.vrchat.currentAvatarThumbnailImageUrl')

      v-list-item(v-else)
        v-list-item-content
          v-list-item-title
            b {{viewer.user.display}}
            v-list-item-subtitle Role: {{viewer.user.role.name}}

        v-list-item-avatar(size='40px')
          v-img(:src='Anon')

      v-divider

      v-list-item(@click='$emit("logout")')
        v-list-item-title Logout
</template>
