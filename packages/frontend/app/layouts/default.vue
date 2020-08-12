<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'default-layout',
})
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 1161px
}
</style>

<template lang="pug">
  layout-base(logged-in)
    v-container.main-container
      nuxt
</template>
