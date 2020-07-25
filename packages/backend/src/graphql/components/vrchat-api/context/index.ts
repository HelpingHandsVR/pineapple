import WebSocket from 'ws'

import { VRChatAPI } from '~/data-sources/vrchat'
import { Config } from '@/lib/config/type'
import { userAgent } from '@/lib/data-source-helpers'
import { createListener } from '../listener'
import { StaticContext } from '~/graphql/context'
import { log } from '@/lib/log'

export type VRChatAPIContext = {
  vrchat: {
    ws: WebSocket,
  }
  dataSources: {
    vrchat: VRChatAPI | null,
  }
}

export const makeVRChatAPIContext = async (config: Config, staticContext: StaticContext): Promise<VRChatAPIContext> => {
  const vrchat = new VRChatAPI(config.vrchat.bot.username, config.vrchat.bot.password)

  // Need to perform the config request in order to obtain an auth cookie and
  // the API key
  const login = await vrchat.login()

  if (!('id' in login)) {
    throw new Error('The system VRChat account is protected with 2 factor authentication')
  }

  const url = `${config.vrchat.pipelineWsURL}/?authToken=${vrchat.authCookie}`

  log.debug(`opening Websocket to VRC pipeline using URL: ${url}`)

  const ws = new WebSocket(url, {
    headers: {
      'User-Agent': userAgent,
    },
  })

  ws
    .on('open', () => {
      log.trace('VRC Socket open')
    })
    .on('close', () => {
      log.trace('VRC Socket closed')
    })
    .on('error', (err) => {
      log.error('VRC pipeline websocket error', err)
    })

  // TODO: Side effect, this function actually returns its own destroy function
  createListener(ws, staticContext, vrchat)

  return {
    vrchat: {
      ws,
    },
    dataSources: {
      vrchat,
    },
  }
}
