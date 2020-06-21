import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ store, redirect }) => {
  if (store.state.auth.loggedIn) {
    redirect(302, '/', {
      flash: 'already-authenticated',
    })
  }
}

export default auth
