<script lang="ts">
import Vue from 'vue'
import qs from 'querystring'

import {DiscordOauthCallbackDocument} from '../../../../generated/composition'

export default Vue.extend({
  data () {
    return {
      result: null,
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
    async runCallback () {
      await this.$apollo.mutate({
        mutation: DiscordOauthCallbackDocument,
        variables: {
          accessToken: this.query.access_token,
          state: this.query.state,
          expiresIn: parseInt(this.query.expires_in, 10)
        }
      })

      this.$router.push('/')
    }
  }
})
</script>

<template lang="pug">
  v-layout(column, justify-center, align-center)
    v-flex(xs12, sm8, md6)
      | Query:
      pre {{query}}
      | Result:
      pre {{result}}
      //- v-skeleton-loader(
      //-   v-if='$apollo.queries.vrcViewer.loading'
      //-   boilerplate='paragraph, paragraph, paragraph'
      //- )
      //- v-card
      //-   v-card-title.headline
      //-     | Your profile
      //-   v-card-text
      //-     pre
      //-       | {{vrcViewer}}
</template>
