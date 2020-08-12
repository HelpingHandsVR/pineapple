import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ store, redirect }) => {
  if (!store.state.auth.loggedIn) {
    redirect(307, '/login', {
      flash: 'unauthenticated',
    })
  }
}

export default auth
