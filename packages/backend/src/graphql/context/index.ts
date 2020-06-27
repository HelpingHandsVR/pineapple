import { ContextParameters } from 'graphql-yoga/dist/types'
import { Connection, createConnection } from 'typeorm'

import { VRChatAPIContext, makeVRChatAPIContext } from '../components/vrchat-api/context'
import { Config } from '@/lib/config/type'
import { getConfig } from '@/lib/config/coerce'

import * as entities from '~/entity'
import { DiscordContext, makeDiscordContext } from '../components/discord/context'
import { AuthorisationContext, makeAuthorisationContext } from '../components/authorization/context'

export type StaticContext = {
  config: Config,
  connection: Connection,
}

export type Context =
  & StaticContext
  & VRChatAPIContext
  & DiscordContext
  & AuthorisationContext

const makeStaticContext = async (): Promise<StaticContext> => {
  const config = getConfig(process.env)

  return {
    config,
    connection: await createConnection({
      ...config.db,
      entities: Object.values(entities),
      migrations: ['../../migration'],
    }),
  }
}

type ContextCreator = (params: ContextParameters) => Promise<Context>

export const makeContextFactory = async (): Promise<ContextCreator> => {
  const staticContext = await makeStaticContext()
  const discordContext = await makeDiscordContext(staticContext)

  return async (params: ContextParameters): Promise<Context> => {
    const vrcContext = await makeVRChatAPIContext(params)
    const authorisationContext = await makeAuthorisationContext(staticContext.connection, vrcContext)

    return {
      ...staticContext,
      ...vrcContext,
      ...discordContext,
      ...authorisationContext,
    }
  }
}
