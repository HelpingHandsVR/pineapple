import { ExtendableError } from 'ts-error'

export enum AuthorisationErrorResolution {
  RETRY,
  LOGOUT,
  ABANDON,
}

type AuthorisationErrorExtensions = {
  resolution: AuthorisationErrorResolution,
  name: string,
}

export class AuthorisationError extends ExtendableError {
  constructor (
    public message: string,
  ) {
    super(message)
  }

  public extensions: AuthorisationErrorExtensions = {
    resolution: AuthorisationErrorResolution.ABANDON,
    name: this.name,
  }

  public type = 'AuthorisationError'
}
