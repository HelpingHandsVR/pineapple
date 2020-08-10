import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import { Request, Response } from 'express'
import { Queue } from 'bull'
import { Logger } from 'pino'

import { VRChatAPIContext, makeVRChatAPIContext } from '../components/vrchat-api/context'
import { Config } from '@/lib/config/type'

import * as queues from '~/queues'

import { DiscordContext, makeDiscordContext } from '../components/discord/context'
import { AuthorisationContext, makeAuthorisationContext } from '../components/authorization/context'
import { AuthenticationContext, makeAuthenticationContext } from '../components/authentication/context'
import { log } from '@/lib/log'
import { randomBytes } from 'crypto'
import { TypeormPinoLogger } from '~/db/logger'

export type StaticContext = {
  config: Config,
  connection: Connection,
  queues: Record<string, Queue>,
  log: Logger,
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

// Static context is only made once, on application startup. Contains stuff like
// the interactor for the system VRC account and database connection(s).
const makeStaticContext = async (config: Config): Promise<StaticContext> => {
  const job = await queues.devonImporter.getJob('devon-importer')

  if (!job) {
    await queues.devonImporter.add(null, {
      jobId: 'devon-importer',
      repeat: {
        cron: '*/10 * * * *',
      },
    })
  }

  // Get connection options from environment variables, but override the logger.
  // Connection replicas aren't possible this way, but that's not gonna be
  // needed
  const connectionOptions = {
    ...await getConnectionOptions(),
    logger: new TypeormPinoLogger(),
  }

  return {
    config,
    queues,
    log: log.child({
      component: 'graphql',
      chain: randomBytes(16).toString('hex'),
    }),
    connection: await createConnection(connectionOptions),
  }
}

const makeExpressContext = (params: IntegrationContext) => ({
  express: {
    req: params.req,
    res: params.res,
  },
})

type ContextCreator = (params: IntegrationContext) => Promise<Context>

// The dynamic context __creator__ is only made once on startup to prepare the
// static context.
export const makeContextFactory = async (config: Config): Promise<ContextCreator> => {
  const staticContext = await makeStaticContext(config)

  const [
    discordContext,
    vrcContext,
  ] = await Promise.all([
    makeDiscordContext(staticContext.config),
    makeVRChatAPIContext(staticContext.config, staticContext),
  ])

  // The actual dynamic context is made on every request and contains stuff like
  // user auth and IP address from Express.
  return async (params: IntegrationContext): Promise<Context> => {
    const authenticationContext = await makeAuthenticationContext(params.req, params.res)

    const [
      authorisationContext,
      expressContext,
    ] = await Promise.all([
      makeAuthorisationContext(authenticationContext.authentication.getUser()),
      makeExpressContext(params),
    ])

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
