import { MessageProcessor } from '.'

export const process: MessageProcessor = async (message, context, dataSource): Promise<void> => {
  if (message.type !== 'notification' || message.content.type !== 'friendRequest') {
    return null
  }

  console.log('[WS]', 'Accepting friend request from', message.content.senderUsername)

  await dataSource.answerFriendRequest(message.content.id, 'accept')
}
