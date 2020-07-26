<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

type Item = {
  icon: string,
  title: string,
  to: string,
}

type Data = {
  items: Item[],
}

export default Vue.extend({
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  },

  data (): Data {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-timeline-clock',
          title: 'Attendance',
          to: '/attendance',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      dark: 'ui/isDark',
      theme: 'ui/themeName',
      loggedIn: 'auth/loggedIn',
    }),

    forceLarge () {
      // On mobile, `mini` will cause text to disappear from the menu, so we
      // need to force the normal version
      return this.$vuetify.breakpoint.mdAndDown
    },

    themeItems () {
      return [
        {text: 'Pineapple', value: 'pineapple'},
        {text: 'Greyscale', value: 'greyscale'},
        {text: '🍋', value: 'lemon'},
        {text: '🍈', value: 'melon'},
        {text: 'Trans pride', value: 'trans-flag'},
        {text: 'Pan pride', value: 'pan-flag'},
      ]
    },

    small () {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return false
      }

      return !this.open
    },

    actuallyOpen () {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return this.open
      }

      return true
    }
  },

  methods: {
    ...mapMutations({
      setDark: 'ui/setDark',
      setTheme: 'ui/setTheme',
      setMenuOpen: 'ui/setMenuOpen',
    }),
  }
})
</script>

<template lang="pug">
  v-navigation-drawer(
    :value='actuallyOpen'
    :mini-variant='forceLarge ? false : small'
    fixed
    bottom
    app
    :dark='dark'
  )
    v-list
      //- Chevron down button for mobile view
      v-list-item(v-show='forceLarge')
        v-btn(text, block, @click='$emit("close")', color='primary')
          v-icon mdi-chevron-down

      //- Render menu items
      v-list-item(v-for='(item, i) in items', :key='i', :to='item.to', router, exact)
        v-list-item-action
          v-icon {{ item.icon }}
        v-list-item-content
          v-list-item-title(v-text='item.title')

    template(v-slot:append)
      v-sheet.pt-4(v-show='!small')
        v-list-item
          v-select(
            label='Theme'
            :items='themeItems'
            @change='setTheme'
            :value='theme'
          )
        v-list-item
          v-switch(
            label='Dark theme'
            :value='dark'
            @change='setDark'
            inset
          )
</template>
