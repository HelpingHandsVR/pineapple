import createPersistedState from 'vuex-persistedstate'
import cookies from 'js-cookie'

export default ({ store }: any): void => {
  (window as any).onNuxtReady(() => {
    createPersistedState({
      key: 'appstate',
      paths: [
        'ui',
      ],
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
