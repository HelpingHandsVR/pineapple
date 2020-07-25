import WebSocket from 'ws'

import { parseMessage, VRCPipelineMessage } from '../lib/pipeline/parse-message'
import { StaticContext } from '~/graphql/context'

import * as friendRequests from './auto-accept-friend-requests'
import * as attendance from './record-attendance'
import { VRChatAPI } from '~/data-sources/vrchat'
import { log as logger } from '@/lib/log'

const log = logger.child({
  component: 'vrchat-websocket',
})

export type MessageProcessor = (content: VRCPipelineMessage, context: StaticContext, dataSource: VRChatAPI) => void | Promise<void>

const createProcessor = (callback: MessageProcessor, context: StaticContext, dataSource: VRChatAPI) => {
  return (data: WebSocket.Data) => {
    const message = parseMessage(data.toString())

    return callback(message, context, dataSource)
  }
}

type RemoveListener = () => void

export const createListener = (ws: WebSocket, context: StaticContext, dataSource: VRChatAPI): RemoveListener => {
  const friendRequestProcessor = createProcessor(friendRequests.process, context, dataSource)
  const attendanceProcessor = createProcessor(attendance.process, context, dataSource)

  ws.on('message', (message) => log.trace(message.toString()))
  ws.on('message', friendRequestProcessor)
  ws.on('message', attendanceProcessor)

  return () => {
    ws.off('message', friendRequestProcessor)
    ws.off('message', attendanceProcessor)
  }
}
