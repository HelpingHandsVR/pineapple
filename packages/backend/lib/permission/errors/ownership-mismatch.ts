import { AuthorisationError, AuthorisationErrorResolution } from './authorisation-error'

export class OwnershipMismatchError extends AuthorisationError {
  extensions = {
    resolution: AuthorisationErrorResolution.ABANDON,
    name: this.name,
  }
}
