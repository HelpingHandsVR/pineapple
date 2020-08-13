import { Configuration } from '@nuxt/types'

// import { lightTheme as light } from './app/themes/light'
// import { darkTheme as dark } from './app/themes/dark'

const config: Configuration = {
  env: process.env,

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  srcDir: 'app/',
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - Pineapple',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    cache: true,
    hardSource: false,
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/vuex-persistedstate.ts' },
    { src: '~/plugins/components.ts' },
    { src: '~/plugins/casl.ts' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    ['@nuxtjs/pwa', {
      pwa: {
        manifest: {
          display: 'standalone',
          crossorigin: 'use-credentials',
        },
      },
    }],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/apollo',
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true,
      },
    },
  },
  /*
   ** Configuration for the Apollo module
   ** See https://github.com/nuxt-community/apollo-module
   */
  apollo: {
    tokenName: 'apollo-auth',
    clientConfigs: {
      default: '~/plugins/apollo-config.ts',
    },
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network',
      },
    },
  },
}

export default config
