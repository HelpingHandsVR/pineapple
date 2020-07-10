import { MessageProcessor } from '.'
import { log as baseLog } from '@/lib/log'

const log = baseLog.child({
  component: 'friend-request-handler',
})

export const process: MessageProcessor = async (message, context, dataSource): Promise<void> => {
  if (message.type !== 'notification' || message.content.type !== 'friendRequest') {
    return null
  }

  log.debug({
    user: message.content.senderUsername,
    notificationId: message.content.id,
  }, 'accepting friend request')

  await dataSource.answerFriendRequest(message.content.id, 'accept')
}
