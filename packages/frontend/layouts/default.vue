<script lang="typescript">
import Vue from 'vue'

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
      drawer: null,
      mini: true,
    }
  },
  computed: {
    forceLarge () {
      // On mobile, `mini` will cause text to disappear from the menu, so we
      // need to force the normal version
      return this.$vuetify.breakpoint.mdAndDown
    }
  },
  methods: {
    toggleDrawer () {
      if (this.$vuetify.breakpoint.mdAndDown) {
        // On mobile, we want to pull the drawer in-out
        this.drawer = !this.drawer
        // this.mini = false
      } else {
        // On desktop, we want to toggle betwwen mini and normal
        this.mini = !this.mini
      }
    }
  }
})
</script>


<template lang="pug">
  v-app(dark)
    v-navigation-drawer(v-model='drawer', :mini-variant='forceLarge ? false : mini', fixed, bottom, app)
      v-list
        v-list-item(v-for='(item, i) in items', :key='i', :to='item.to', router, exact)
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text='item.title')

    v-app-bar(fixed, app)
      v-btn(icon, @click.stop='toggleDrawer')
        v-icon mdi-menu
      v-toolbar-title(v-text='title')
      v-spacer

    v-main
      v-container
        nuxt
</template>
