import { ContextParameters } from 'graphql-yoga/dist/types'

import { VRChatAPIContext, makeVRChatAPIContext } from '../components/vrchat-api/context'

export type Context =
  & VRChatAPIContext

export const makeContext = (params: ContextParameters): Context => {
  const vrcContext = makeVRChatAPIContext(params)

  return {
    ...vrcContext,
  }
}
