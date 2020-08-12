<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'default-guest-layout',
})
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 1161px
}
</style>

<template lang="pug">
  layout-base
    v-container.main-container
      nuxt
</template>
