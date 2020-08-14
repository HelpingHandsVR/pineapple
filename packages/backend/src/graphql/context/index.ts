import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import { Request, Response } from 'express'
import { Queue } from 'bull'
import { Logger } from 'pino'
import { RedisPubSub } from 'graphql-redis-subscriptions'

import { VRChatAPIContext, makeVRChatAPIContext } from '../components/vrchat-api/context'
import { Config } from '@/lib/config/type'

import * as queues from '~/queues'
import * as allEntities from '~/db/entity'
import * as allSubscribers from '~/db/subscribers'

import { DiscordContext, makeDiscordContext } from '../components/discord/context'
import { AuthorisationContext, makeAuthorisationContext } from '../components/authorization/context'
import { AuthenticationContext, makeAuthenticationContext } from '../components/authentication/context'
import { log } from '@/lib/log'
import { randomBytes } from 'crypto'
import { TypeormPinoLogger } from '~/db/logger'
import { createRedisPubsub } from '@/lib/redis-pubsub'

export type StaticContext = {
  config: Config,
  connection: Connection,
  queues: Record<string, Queue>,
  log: Logger,
  pubsub: RedisPubSub,
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
    entities: Object.values(allEntities),
    subscribers: Object.values(allSubscribers),
  }

  // Create a dedicated connection to Redis, while we use a different one
  // outside GraphQL
  const pubsub = createRedisPubsub()

  return {
    pubsub,
    config,
    queues,
    log: log.child({
      component: 'graphql',
      chain: randomBytes(16).toString('hex'),
    }),
    connection: await createConnection(connectionOptions),
  }
}

type SubscriptionContextParams = {
  connection: {
    context: {
      request: Request,
    }
  }
}

type MakeExpressContextInput = {
  req: Request,
  res?: Response,
}

const makeExpressContext = ({ req, res }: MakeExpressContextInput) => {
  return {
    express: {
      req,
      res,
    },
  }
}

type ContextCreator = (params: IntegrationContext | SubscriptionContextParams) => Promise<Context>

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
  return async (params): Promise<Context> => {
    const sharedContext = {
      ...staticContext,
      ...vrcContext,
      ...discordContext,
    }

    if ('connection' in params) {
      const authenticationContext = await makeAuthenticationContext(params.connection.context.request)

      const [
        authorisationContext,
        expressContext,
      ] = await Promise.all([
        makeAuthorisationContext(authenticationContext.authentication.getUser()),
        makeExpressContext({
          req: params.connection.context.request,
        }),
      ])

      return {
        ...sharedContext,
        ...authorisationContext,
        ...authenticationContext,
        ...expressContext,
      }
    } else {
      const authenticationContext = await makeAuthenticationContext(params.req, params.res)

      const [
        authorisationContext,
        expressContext,
      ] = await Promise.all([
        makeAuthorisationContext(authenticationContext.authentication.getUser()),
        makeExpressContext(params),
      ])

      return {
        ...sharedContext,
        ...authorisationContext,
        ...authenticationContext,
        ...expressContext,
      }
    }
  }
}
