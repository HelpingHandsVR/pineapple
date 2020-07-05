import { Connection, createConnection } from 'typeorm'
import { Request, Response } from 'express'
import { Queue } from 'bull'

import { VRChatAPIContext, makeVRChatAPIContext } from '../components/vrchat-api/context'
import { Config } from '@/lib/config/type'

import * as queues from '~/queues'
import * as entities from '~/entity'
import { DiscordContext, makeDiscordContext } from '../components/discord/context'
import { AuthorisationContext, makeAuthorisationContext } from '../components/authorization/context'
import { AuthenticationContext, makeAuthenticationContext } from '../components/authentication/context'

export type StaticContext = {
  config: Config,
  connection: Connection,
  queues: Record<string, Queue>
}

export type IntegrationContext = {
  req: Request,
  res: Response,
}

export type ExpressContext = {
  express: IntegrationContext,
}

export type Context =
  & StaticContext
  & DiscordContext
  & AuthorisationContext
  & AuthenticationContext
  & VRChatAPIContext
  & ExpressContext

const makeStaticContext = async (config: Config): Promise<StaticContext> => {
  queues.devonImporter.clean(0)
  queues.devonImporter.add(null, {
    repeat: {
      cron: '*/10 * * * *',
    },
  })

  return {
    config,
    queues,
    connection: await createConnection({
      ...config.db,
      entities: Object.values(entities),
      migrations: ['../../migration'],
    }),
  }
}

const makeExpressContext = (params: IntegrationContext) => ({
  express: {
    req: params.req,
    res: params.res,
  },
})

type ContextCreator = (params: IntegrationContext) => Promise<Context>

export const makeContextFactory = async (config: Config): Promise<ContextCreator> => {
  const staticContext = await makeStaticContext(config)
  const discordContext = await makeDiscordContext(staticContext.config)
  const vrcContext = await makeVRChatAPIContext(staticContext.config)

  return async (params: IntegrationContext): Promise<Context> => {
    const authenticationContext = await makeAuthenticationContext(params.req, params.res)
    const authorisationContext = await makeAuthorisationContext(authenticationContext.authentication.getUser())
    const expressContext = await makeExpressContext(params)

    return {
      ...staticContext,
      ...vrcContext,
      ...discordContext,
      ...authorisationContext,
      ...authenticationContext,
      ...expressContext,
    }
  }
}
