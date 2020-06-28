<script lang="ts">
import { ViewerDocument, Viewer } from '../../generated/composition'

type Data = {
  viewer: Viewer,
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
    }
  },
  middleware: [
    'auth'
  ],
  mounted () {
    if ('refetch' in this.$route.query) {
      this.$apollo.queries.viewer.refetch()
    }
  }
}
</script>

<template lang="pug">
  v-layout(column, justify-center, align-center)
    v-flex(xs12, sm8, md6)
      v-skeleton-loader(
        v-if='$apollo.queries.viewer.loading'
        boilerplate
      )
      v-card
        v-card-title.headline
          | Your profile
        v-card-text
          pre
            | {{viewer}}
</template>
