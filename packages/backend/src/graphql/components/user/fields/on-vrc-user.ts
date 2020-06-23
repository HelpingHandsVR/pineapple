import { extendType } from '@nexus/schema'
import { User } from '~/entity'

export const UserOnVRCExtendedUser = extendType({
  type: 'VRChatExtendedUser',
  definition (t) {
    t.field('user', {
      type: 'User',
      resolve (root, args, context) {
        return User.findOne({
          where: {
            vrcUserID: root.id,
          },
        })
      },
    })
  },
})

export const UserOnVRCUser = extendType({
  type: 'VRChatUser',
  definition (t) {
    t.field('user', {
      type: 'User',
      resolve (root, args, context) {
        return User.findOne({
          where: {
            vrcUserID: root.id,
          },
        })
      },
    })
  },
})
