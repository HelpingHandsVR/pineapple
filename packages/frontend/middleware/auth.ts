import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ store, redirect }) => {
  if (!store.state.authUser) {
    redirect(302, '/login', {
      flash: 'unauthenticated',
    })
  }
}

export default auth
