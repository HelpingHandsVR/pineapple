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
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    cache: true,
    hardSource: true,
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
    errorHandler: '~/plugins/apollo-error-handler.ts',
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
    },
    defaultOptions: {
      $query: {
        fetchPolocy: 'cache-and-network',
      } as any,
    },
  },
}

export default config
