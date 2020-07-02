import { extendType } from '@nexus/schema'
import { User } from '~/entity'

export const VRChatUserOnUser = extendType({
  type: 'User',
  definition (t) {
    t.field('vrchat', {
      type: 'VRChatUser',
      nullable: true,
      resolve (root: User, args, context) {
        if (!root.vrcUserID) {
          return null
        }

        return context.dataSources.vrchat.getUser(root.id)
      },
    })
  },
})
