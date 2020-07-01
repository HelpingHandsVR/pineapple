import { Connection, createConnection } from 'typeorm'
import { Request, Response } from 'express'

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
  & DiscordContext
  & AuthorisationContext
  & VRChatAPIContext

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

export type IntegrationContext = {
  req: Request,
  res: Response,
}

type ContextCreator = (params: IntegrationContext) => Promise<Context>

export const makeContextFactory = async (): Promise<ContextCreator> => {
  const staticContext = await makeStaticContext()
  const discordContext = await makeDiscordContext(staticContext.config)
  const vrcContext = await makeVRChatAPIContext(staticContext.config)

  return async (params: IntegrationContext): Promise<Context> => {
    const authorisationContext = await makeAuthorisationContext()

    return {
      ...staticContext,
      ...vrcContext,
      ...discordContext,
      ...authorisationContext,
    }
  }
}
