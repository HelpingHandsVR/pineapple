<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'error-boundary',
  data () {
    return {
      error: null,
    }
  },
  errorCaptured (error) {
    this.error = error
  }
})
</script>

<style lang="scss" scoped>
.slotholder {
  display: contents;
}
</style>

<template lang="pug">
  .slotholder
    slot(name='default', v-if='!error')

    v-card(v-else, key='error')
      pre
        | {{error.stack}}
</template>
