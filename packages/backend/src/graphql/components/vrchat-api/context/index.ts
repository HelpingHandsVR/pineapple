import WebSocket from 'ws'

import { VRChatAPI } from '~/data-sources/vrchat'
import { Config } from '@/lib/config/type'

export type VRChatAPIContext = {
  vrchat: {
    ws: WebSocket,
  }
  dataSources: {
    vrchat: VRChatAPI | null,
  }
}

export const makeVRChatAPIContext = async (config: Config): Promise<VRChatAPIContext> => {
  const vrchat = new VRChatAPI(config.vrchat.bot.username, config.vrchat.bot.password)

  // Need to perform the config request in order to obtain an auth cookie and
  // the API key
  const login = await vrchat.login()

  if (!('id' in login)) {
    throw new Error('The system VRChat account is protected with 2 factor authentication')
  }

  const ws = new WebSocket(`wss://pipeline.vrchat.cloud/?authToken=${vrchat.authCookie}`)

  ws.on('open', () => {
    console.log('VRC Socket open')
  })

  ws.on('close', () => {
    console.log('VRC Socket closed')
  })

  ws.on('message', (data) => {
    console.log('VRC Socket message', data)
  })

  return {
    vrchat: {
      ws,
    },
    dataSources: {
      vrchat,
    },
  }
}
