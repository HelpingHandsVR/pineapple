import { AuthorisationError, AuthorisationErrorResolution } from './authorisation-error'

export class MustLoginError extends AuthorisationError {
  extensions = {
    resolution: AuthorisationErrorResolution.LOGOUT,
    name: this.name,
  }
}
