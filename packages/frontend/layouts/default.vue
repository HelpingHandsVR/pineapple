<script lang="typescript">
import Vue from 'vue'
import {mapGetters, mapMutations} from 'vuex'

const flashMap = new Map()

flashMap.set('unauthenticated', 'Please log in first to access that page.')

export default Vue.extend({
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
      ],
      title: 'Pineapple',
      // drawer: null,
      // mini: true,
    }
  },
  computed: {
    ...mapGetters({
      dark: 'ui/isDark',
      open: 'ui/menuOpen',
      small: 'ui/menuSmall',
    }),
    forceLarge () {
      // On mobile, `mini` will cause text to disappear from the menu, so we
      // need to force the normal version
      return this.$vuetify.breakpoint.mdAndDown
    },
    flash () {
      return flashMap.get(this.$route.query.flash)
    }
  },
  methods: {
    ...mapMutations({
      setDark: 'ui/setDark',
      setMenuOpen: 'ui/setMenuOpen',
      setMenuSmall: 'ui/setMenuSmall',
    }),
    toggleDrawer () {
      if (this.$vuetify.breakpoint.mdAndDown) {
        // On mobile, we want to pull the drawer in-out
        this.setMenuSmall(false)
        this.setMenuOpen(!this.open)
      } else {
        // On desktop, we want to toggle betwwen mini and normal
        this.setMenuOpen(true)
        this.setMenuSmall(!this.small)
      }
    },
  },
  watch: {
    dark (newValue) {
      // We cannot access the vm from the store, so we watch for dark theme
      // changes here. Downside is that the watch will only work on pages with
      // the default layout.
      this.$vuetify.theme.dark = newValue
    }
  }
})
</script>

<template lang="pug">
  v-app(:dark='dark')
    v-navigation-drawer(
      :value='open'
      :mini-variant='forceLarge ? false : small'
      fixed
      bottom
      app
      :dark='dark'
    )
      v-list
        v-list-item(v-show='forceLarge')
          v-btn(text, block, @click='toggleDrawer', color='primary')
            v-icon mdi-chevron-down
        v-list-item(v-for='(item, i) in items', :key='i', :to='item.to', router, exact)
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text='item.title')

      template(v-slot:append)
        v-sheet(v-show='!small')
          v-list-item
            v-switch(
              label='Dark theme'
              :value='dark'
              @change='setDark'
              inset
            )

    v-app-bar(fixed, app, color='deep-purple', dark)
      v-btn(icon, @click.stop='toggleDrawer')
        v-icon mdi-menu
      v-toolbar-title(v-text='title')
      v-spacer

    v-main
      v-container
        v-banner.mb-3(color='warning', light, v-if='flash')
          v-icon(slot='icon') mdi-alert
          | {{flash}}
        nuxt
</template>
