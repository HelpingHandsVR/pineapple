import { getAuthCookieFromReq } from '../lib/auth-cookie-from-req'
import { VRChatAPI } from '~/data-sources/vrchat'
import { VRCExtendedUser } from '~/data-sources/vrchat/types'
import { IntegrationContext } from '~/graphql/context'

export type VRChatAPIContext = {
  vrchat: {
    authCookie: string,
    viewer: VRCExtendedUser | null,
  },
  dataSources: {
    vrchat: VRChatAPI | null,
  }
}

export const makeVRChatAPIContext = async (params: IntegrationContext): Promise<VRChatAPIContext> => {
  const authCookie = getAuthCookieFromReq(params.req)
  const vrchat = new VRChatAPI(params.req.connection.remoteAddress, authCookie)
  let viewer = null

  if (authCookie) {
    try {
      const response = await vrchat.getViewer()

      if ('id' in response) {
        viewer = response
      }
    } catch (error) {
      if (error.extensions.code === 'UNAUTHENTICATED') {
        viewer = null
      } else {
        throw error
      }
    }
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
