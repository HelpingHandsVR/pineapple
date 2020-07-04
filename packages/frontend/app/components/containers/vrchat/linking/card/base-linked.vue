<script lang="ts">
import Vue from 'vue'

import { DateTime } from 'luxon'

export default Vue.extend({
  name: 'vrchat-profile-card-base',
  props: {
    vrcUser: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    badgeColour () {
      let result = 'grey'

      if (!this.vrcUser) {
        return result
      }

      if (this.vrcUser.state === 'online') {
        result = 'success'
      }

      return result
    },
  },
  methods: {
    relativeFormat (dateString: string) {
      return DateTime.fromISO(dateString).toRelative()
    }
  }
})
</script>

<template lang="pug">
  gradient-card
    template(v-slot:image-content)
      v-card-title(dark)
        v-badge.mb-1.mr-2(inline, :color='badgeColour', left, dot)
        | {{vrcUser.displayName}}
      v-card-subtitle(dark)
        | {{vrcUser.statusDescription}}

    v-card-text
      | VRChat role: {{vrcUser.role}}
      br
      | Pineapple role: {{user.role.name}}
      br
      | State: {{vrcUser.state}}
      br
      | Last login: {{relativeFormat(vrcUser.last_login)}}
</template>
