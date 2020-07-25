/* eslint-disable camelcase */

import { VRCUserBase } from '~/data-sources/vrchat/types'
import { log as logger } from '@/lib/log'

const log = logger.child({
  component: 'vrchat-message-parser',
})

/**
 * notification
 */
export type VRCPipelineFriendRequest = {
  type: 'friendRequest',
  id: string,
  senderUserId: string,
  senderUsername: string,
  receiverUserId: string,
  created_at: string,
}

export type VRCPipelineNotification = {
  type: 'notification',
  content: VRCPipelineFriendRequest
}

/**
 * friend-location
 */
export type VRCPipelineFriendLocation = {
  type: 'friend-location',
  content: {
    userId: string,
    user: VRCUserBase,
    location: string | 'private',
    instance: string | 'private',
    world: unknown,
    canRequestInvite: boolean,
  },
}

/**
 * friend-offline
 */
export type VRCPipelineFriendOffline = {
  type: 'friend-offline',
  content: {
    userId: string,
  }
}

/**
 * friend-online
 */
export type VRCPipelineFriendOnline = {
  type: 'friend-online',
  content: {
    userId: string,
    user: VRCUserBase,
    location: string | 'private',
    instance: string | 'private',
    world: unknown,
    canRequestInvite: boolean,
  }
}

/**
 * friend-active
 */
export type VRCPipelineFriendActive = {
  type: 'friend-active',
  content: {
    userId: string,
    user: VRCUserBase,
  }
}

export type VRCPipelineMessage =
  | VRCPipelineNotification
  | VRCPipelineFriendLocation
  | VRCPipelineFriendOffline
  | VRCPipelineFriendOnline
  | VRCPipelineFriendActive

export const parseMessage = (message: string): VRCPipelineMessage => {
  const { type, content: rawContent } = JSON.parse(message)
  let content = null

  try {
    content = JSON.parse(rawContent)
  } catch (error) {
    log.error(error, `failed to parse a message, skipping it (${rawContent})`)
  }

  return {
    type,
    content,
  }
}
