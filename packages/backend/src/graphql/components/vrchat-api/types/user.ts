import { interfaceType, objectType, enumType } from '@nexus/schema'
import { getRoleFromTags, VRCUserRole } from '../lib/role-from-tags'
import { VRCExtendedUser } from '~/data-sources/vrchat/types'

export const VRChatUserRole = enumType({
  name: 'VRChatUserRole',
  members: VRCUserRole,
})

export const VRChatUserBase = interfaceType({
  name: 'VRChatUserBase',
  definition (t) {
    t.resolveType((root) => {
      if (!('status' in root)) {
        return 'VRChatLimitedUser'
      }

      if ('location' in root) {
        return 'VRChatUser'
      }

      return 'VRChatExtendedUser'
    })

    t.id('id')
    t.string('username')
    t.string('displayName')
    t.string('bio')
    t.string('bioLinks')
    t.string('currentAvatarImageUrl')
    t.string('currentAvatarThumbnailImageUrl')

    t.field('role', {
      type: 'VRChatUserRole',
      resolve (root: VRCExtendedUser) {
        return getRoleFromTags(root.tags)
      },
    })

    t.string('last_login') // ISO string
    t.string('last_platform')
    t.boolean('allowAvatarCopying')
    t.boolean('isFriend')
  },
})

export const VRChatUser = objectType({
  name: 'VRChatUser',
  definition (t) {
    t.implements('VRChatUserBase')

    t.string('location')
    t.string('worldId')
    t.string('status')
    t.string('statusDescription')
    t.string('state')
  },
})

export const VRChatLimitedUser = objectType({
  name: 'VRChatLimitedUser',
  description: 'User type, when the user has not sent a friend request to Pineapple',
  definition (t) {
    t.implements('VRChatUserBase')
  },
})

export const VRChatExtendedUser = objectType({
  name: 'VRChatExtendedUser',
  definition (t) {
    t.implements('VRChatUserBase')

    t.string('status')
    t.string('statusDescription')
    t.string('state')
    t.string('email', {
      nullable: true,
    })
    t.string('obfuscatedEmail')
    t.string('currentAvatar')
    t.boolean('twoFactorAuthEnabled')
    t.string('onlineFriends', {
      list: [false],
    })
    t.string('activeFriends', {
      list: [false],
    })
    t.string('offlineFriends', {
      list: [false],
    })
  },
})
