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
    slot(name='default')

    v-card(v-if='error', key='error')
      v-card-title
        | AAAAH there's an error!
      v-card-text
        | {{error.message}}
</template>
