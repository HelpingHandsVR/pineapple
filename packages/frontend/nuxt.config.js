import colors from 'vuetify/es5/util/colors'

export default {
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
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
    { src: '~/plugins/vuex-persistedstate.ts', ssr: false },
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
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.yellow,
          accent: colors.grey,
          secondary: colors.amber,
          info: colors.teal,
          warning: colors.amber,
          error: colors.deepOrange,
          success: colors.green,
        },
        dark: {
          primary: colors.yellow,
          accent: colors.grey,
          secondary: colors.amber,
          info: colors.teal,
          warning: colors.amber,
          error: colors.deepOrange,
          success: colors.green,
        },
      },
    },
  },
  /*
   ** Configuration for the Apollo module
   ** See https://github.com/nuxt-community/apollo-module
   */
  apollo: {
    tokenName: 'apollo-auth',
    errorHandler: '~/plugins/apollo-error-handler.ts',
    clientConfigs: {
      default: '~/plugins/apollo-config.ts',
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
