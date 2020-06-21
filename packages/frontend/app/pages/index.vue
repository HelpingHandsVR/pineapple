<script lang="ts">
import { VrcViewerDocument, VrChatExtendedUser } from '../../generated/composition'

type Data = {
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
      vrcViewer: null,
    }
  },
  middleware: [
    'auth'
  ]
}
</script>

<template lang="pug">
  v-layout(column, justify-center, align-center)
    v-flex(xs12, sm8, md6)
      v-skeleton-loader(
        v-if='$apollo.queries.vrcViewer.loading'
        boilerplate='paragraph, paragraph, paragraph'
      )
      v-card
        v-card-title.headline
          | Your profile
        v-card-text
          pre
            | {{vrcViewer}}
</template>
