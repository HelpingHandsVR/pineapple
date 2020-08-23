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
    __dangerouslyDisableSanitizers: ['script'],
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
    script: [{
      innerHTML: `(function(A,s,a,y,e,r){
        r=window.asayer=[s,r,e,[y-1]];
        s=document.createElement('script');s.src=a;s.async=!A;
        document.getElementsByTagName('head')[0].appendChild(s);
        r.start=function(v){r.push([0])};
        r.stop=function(v){r.push([1])};
        r.userID=function(id){r.push([2,id])};
        r.userAnonymousID=function(id){r.push([3,id])};
        r.metadata=function(k,v){r.push([4,k,v])};
        r.event=function(k,p){r.push([5,k,p])};
        r.active=function(){return false};
        r.sessionID=function(){};
      })(0,${process.env.ASAYER_PROJECT_ID},'//static.asayer.io/tracker.js',1,29);`,
    }],
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
    '@nuxtjs/sentry',
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
