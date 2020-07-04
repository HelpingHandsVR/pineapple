<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
  name: 'gradient-card',
  props: {
    lazySrc: {
      type: String,
      required: false,
      default: undefined,
    },
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      dark: 'ui/isDark',
    }),
    gradient () {
      if (this.dark) {
        return `
          to bottom,
            rgba(0, 0, 0, 0) 40%,
            rgba(30, 30, 30, 20) 100%
        `
      }

      return `
        to bottom,
          rgba(0, 0, 0, 0) 40%,
          rgba(255, 255, 255, 20) 100%
      `
    },
  }
})
</script>

<template lang="pug">
  v-card
    v-img.align-end(
      :lazy-src='lazySrc'
      :src='src'
      height='100'
      :gradient='gradient'
    )
      v-card-title
        slot(name='image-content')

    v-card-text
      slot
</template>
