<script lang="ts">
export default {
  middleware: [
    'auth'
  ]
}
</script>

<template lang="pug">
  v-layout(column, justify-center, align-center)
    v-flex(xs12, sm8, md6)
      v-card
        v-card-title.headline
          | Pineapple
        v-card-text
          p.
            This page is not used for anything right now.
        v-card-actions
          v-btn(primary, nuxt, to='/login')
            | Log In
</template>
