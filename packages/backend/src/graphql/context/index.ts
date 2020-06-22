import { ContextParameters } from 'graphql-yoga/dist/types'
import { Connection, createConnection } from 'typeorm'

import { VRChatAPIContext, makeVRChatAPIContext } from '../components/vrchat-api/context'
import { Config } from '@/lib/config/type'
import { getConfig } from '@/lib/config/coerce'
import * as entities from '@/src/entities'

type CustomContext = {
  config: Config,
  connection: Connection,
}

export type Context =
  & CustomContext
  & VRChatAPIContext

const makeCustomContext = async (): Promise<CustomContext> => {
  const config = getConfig(process.env)

  return {
    config,
    connection: await createConnection({
      ...config.db,
      entities: Object.values(entities),
    }),
  }
}

export const makeContext = async (params: ContextParameters): Promise<Context> => {
  const vrcContext = makeVRChatAPIContext(params)
  const customContext = await makeCustomContext()

  return {
    ...customContext,
    ...vrcContext,
  }
}
