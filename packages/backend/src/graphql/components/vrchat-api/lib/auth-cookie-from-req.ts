import { Request } from 'express'

export const getAuthCookieFromReq = (req: Request): string => {
  const header = req.headers.authorization || null

  if (!header) {
    return null
  }

  const [method, cookie, ...rest] = header.split(' ')
  const headerValid =
    // assert that the header is a string with only one space in it
    rest.length === 0
    // we are using a custom token type, as auth is handled by the VRChat API.
    // this way we don't have to pass user credentials through us
    && method === 'VRCAuthCookie'
    // assert that the contents of the cookie are:
    // authcookie_<uuid>
    && /^authcookie_[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/ui.test(cookie)

  if (!headerValid) {
    return null
  }

  return cookie
}
