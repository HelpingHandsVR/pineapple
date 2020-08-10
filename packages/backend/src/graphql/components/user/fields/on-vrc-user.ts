import { extendType } from '@nexus/schema'
import { User } from '~/entity/user'

export const UserOnVRCExtendedUser = extendType({
  type: 'VRChatExtendedUser',
  definition (t) {
    t.field('user', {
      type: 'User',
      nullable: true,
      resolve (root, args, context) {
        return context.connection.getRepository(User)
          .findOne({
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
      nullable: true,
      resolve (root, args, context) {
        return context.connection.getRepository(User)
          .findOne({
            where: {
              vrcUserID: root.id,
            },
          })
      },
    })
  },
})
