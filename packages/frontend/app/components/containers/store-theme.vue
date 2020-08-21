<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { VuetifyThemeVariant } from 'vuetify/types/services/theme'

import { getTheme } from '../../themes'

const updateVMTheme = (input: VuetifyThemeVariant, base: VuetifyThemeVariant) => {
  Object.keys(base).forEach((key) => {
    base[key] = input[key]
  })
}

export default Vue.extend({
  name: 'store-theme',
  computed: mapGetters({
    theme: 'ui/theme',
    dark: 'ui/isDark',
  }),
  methods: {
    updateTheme (theme: VuetifyThemeVariant = this.theme, dark: boolean = this.dark) {
      this.$vuetify.theme.themes.light = theme
      this.$vuetify.theme.themes.dark = theme

      this.$vuetify.theme.dark = dark
    }
  },
  created () {
    this.updateTheme()
  },
  mounted () {
    this.updateTheme()
  },
  watch: {
    theme (newValue) {
      this.updateTheme(newValue)
    },
    dark (newValue) {
      this.updateTheme(this.theme, newValue)
    }
  }
})
</script>

<template lang="pug">
  .theme-container
    slot
</template>
