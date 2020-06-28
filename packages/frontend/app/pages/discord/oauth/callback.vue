<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import qs from 'querystring'

import {DiscordOauthCallbackDocument} from '../../../../generated/composition'
import {Toast} from '../../../store/ui'

export default Vue.extend({
  data () {
    return {
      result: null,
      loading: false,
    }
  },
  computed: {
    query () {
      const [emtpy, string] = this.$route.hash.split('#')

      if (!string) {
        return null
      }

      return qs.parse(string)
    }
  },
  mounted () {
    this.runCallback()
  },
  methods: {
    ...mapMutations({
      toast: 'ui/createToast',
    }),
    async runCallback () {
      this.loading = true

      try {
        await this.$apollo.mutate({
          mutation: DiscordOauthCallbackDocument,
          variables: {
            accessToken: this.query.access_token,
            state: this.query.state,
            expiresIn: parseInt(this.query.expires_in, 10)
          }
        })
      } catch (error) {
        const toast: Toast = {
          type: 'error',
          message: error.message,
          icon: 'mdi-alert-circle',
          title: 'Application error',
        }

        this.toast(toast)
      }

      this.loading = false
      this.$router.push('/?refetch')
    }
  }
})
</script>

<template lang="pug">
  v-overlay(:value='loading')
    v-progress-circular(
      indeterminate
      size='64'
    )
</template>
