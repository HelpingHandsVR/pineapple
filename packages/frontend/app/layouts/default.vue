<script lang="typescript">
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
  layout-base
    v-container.main-container
      nuxt
</template>
