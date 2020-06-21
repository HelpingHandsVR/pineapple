import createPersistedState from 'vuex-persistedstate'
import cookies from 'js-cookie'
import cookie from 'cookie'

import { Plugin, Context } from '@nuxt/types'

const handleClient = ({ store }: Context): void => {
  (window as any).onNuxtReady(() => {
    createPersistedState({
      key: 'appstate',
      storage: {
        getItem (key) {
          return cookies.get(key)
        },
        setItem (key, state) {
          return cookies.set(key, state)
        },
        removeItem (key) {
          return cookies.remove(key)
        },
      },
    })(store)
  })
}

const handleServer = ({ store, req }: Context): void => {
  const userCookie = cookie.parse(req.headers.cookie || '')

  return createPersistedState({
    key: 'appstate',
    storage: {
      getItem (key) {
        return userCookie[key]
      },
      setItem () {
        return null
      },
      removeItem () {
        return null
      },
    },
  })(store)
}

const plugin: Plugin = (context): void => {
  if (process.server) {
    return handleServer(context)
  }

  return handleClient(context)
}

export default plugin
