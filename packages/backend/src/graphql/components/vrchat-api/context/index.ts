import { ContextParameters } from 'graphql-yoga/dist/types'
import { getAuthCookieFromReq } from '../lib/auth-cookie-from-req'
import { VRChatAPI } from '~/data-sources/vrchat'
import { VRCExtendedUser } from '~/data-sources/vrchat/types'

export type VRChatAPIContext = {
  vrchat: {
    authCookie: string,
    viewer: VRCExtendedUser | null,
  },
  dataSources: {
    vrchat: VRChatAPI | null,
  }
}

export const makeVRChatAPIContext = async (params: ContextParameters): Promise<VRChatAPIContext> => {
  const authCookie = getAuthCookieFromReq(params.request)
  const vrchat = new VRChatAPI(params.request.connection.remoteAddress, authCookie)
  let viewer = null

  console.log({ authCookie })

  if (authCookie) {
    viewer = await vrchat.getViewer()
  }

  return {
    vrchat: {
      authCookie,
      viewer,
    },
    dataSources: {
      vrchat,
    },
  }
}
