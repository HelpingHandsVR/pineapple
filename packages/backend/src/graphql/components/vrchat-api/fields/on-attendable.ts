import { extendType } from '@nexus/schema'
import { Attendable } from '~/db/entity'

export const VRChatUsWorldOnAttendable = extendType({
  type: 'Attendable',
  definition (t) {
    t.field('world', {
      type: 'VRChatWorld',
      nullable: true,
      resolve (root: Attendable, args, context) {
        if (!root.vrcWorldId) {
          return null
        }

        return context.dataSources.vrchat.getWorld(root.vrcWorldId)
      },
    })
  },
})
