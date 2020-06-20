import { ContextParameters } from 'graphql-yoga/dist/types'
import { getAuthCookieFromReq } from '../lib/auth-cookie-from-req'
import { VRChatAPI } from '~/data-sources/vrchat'

export type VRChatAPIContext = {
  vrchat: {
    authCookie: string,
  },
  dataSources: {
    vrchat: VRChatAPI
  }
}

export const makeVRChatAPIContext = (params: ContextParameters): VRChatAPIContext => {
  let authCookie = null

  if (params.request.headers.authorization) {
    authCookie = getAuthCookieFromReq(params.request)
  }

  return {
    vrchat: {
      authCookie,
    },
    dataSources: {
      vrchat: new VRChatAPI(params.request.connection.remoteAddress, authCookie),
    },
  }
}
