<script lang="ts">
import Vue from 'vue'
import {ProfileCardQueryDocument} from '../../../../../../generated/composition'

import VrchatProfileCardBaseLinked from './base-linked.vue'
import VrchatProfileCardBaseUnlinked from './base-unlinked.vue'

export default Vue.extend({
  name: 'vrchat-linking-card',
  components: {
    VrchatProfileCardBaseLinked,
    VrchatProfileCardBaseUnlinked,
  },
  props: {
    vrcUser: {
      type: Object,
      required: false,
      default: null
    },
  },
  data () {
    return {
      query: ProfileCardQueryDocument,
    }
  },
  computed: {
    variables () {
      if (!this.vrcUser) {
        return null
      }

      return {
        where: {
          vrcUserId: this.vrcUser.id,
        },
        vrcWhere: {
          id: this.vrcUser.id,
        }
      }
    }
  }
})
</script>

<template lang="pug">
  apollo-query(
    :query='query'
    :variables='variables'
    notify-on-network-status-change
    :skip='!this.vrcUser'
  )
    template(v-slot='{result: {loading, error, data}}')
      div(v-if='loading') Loading...
      div(v-else-if='error') {{error}}

      vrchat-profile-card-base-unlinked(v-else-if='!data')

      vrchat-profile-card-base-linked(
        v-else-if='!error && data.vrchatUser'
        :user='data.user'
        :vrc-user='data.vrchatUser'
      )
</template>
