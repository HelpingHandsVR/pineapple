<script lang="typescript">
import Vue from 'vue'
import {mapGetters, mapMutations} from 'vuex'

import {ProfileMenuLogoutDocument} from '../../../../generated/composition'

import ProfileMenu from '../../containers/authentication/profile-menu/index.vue'
import StoreToast from '../../containers/store-toast.vue'
import StoreTheme from '../../containers/store-theme.vue'
import NavigationDrawer from '../../containers/navigation/drawer.vue'

const flashMap = new Map()

flashMap.set('unauthenticated', 'Please log in first to access that page.')
flashMap.set('already-authenticated', `You're already logged in, you need to log out first.`)

export default Vue.extend({
  name: 'layout-base',
  props: {
    loggedIn: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    ProfileMenu,
    StoreToast,
    StoreTheme,
    NavigationDrawer,
  },
  data() {
    return {
      title: 'Pineapple',
    }
  },
  computed: {
    ...mapGetters({
      menuOpen: 'ui/menuOpen',
      dark: 'ui/isDark',
    }),
    flash () {
      return flashMap.get(this.$route.query.flash)
    },
  },
  methods: {
    ...mapMutations({
      setMenuOpen: 'ui/setMenuOpen',
    }),

    async handleLogout () {
      try {
        await this.$apollo.mutate({
          mutation: ProfileMenuLogoutDocument,
        })
      } finally {
        this.$store.commit('auth/setLoggedIn', false)
        this.$apolloHelpers.onLogout()
        this.$router.push('/login')
      }
    },

    toggleDrawer (input) {
      if (typeof input === 'boolean') {
        return this.setMenuOpen(input)
      }

      this.setMenuOpen(!this.menuOpen)
    }
  },
})
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 1161px
}
</style>

<template lang="pug">
  v-app(:dark='dark')
    error-boundary
      store-toast(key='store-toast')
      store-theme(key='store-theme')

      navigation-drawer(:open='menuOpen', @close='toggleDrawer(false)', key='navigation-drawer')

      v-app-bar(fixed, app, color='primary', dark, key='app-bar')
        v-btn(icon, @click.stop='toggleDrawer')
          v-icon mdi-menu
        v-toolbar-title(v-text='title')
        v-spacer
        profile-menu(v-if='loggedIn', @logout='handleLogout')

      v-main(key='main')
        v-banner(color='secondary', light, v-if='flash')
          v-icon(slot='icon') mdi-alert
          | {{flash}}
        error-boundary
          slot(name='default')
</template>
