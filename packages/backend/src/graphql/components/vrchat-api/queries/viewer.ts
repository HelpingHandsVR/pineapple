import { extendType } from '@nexus/schema'

export const VRCViewerQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('vrcViewer', {
      type: 'VRChatExtendedUser',
      resolve (root, args, context) {
        return context.vrchat.viewer
      },
    })

    t.string('ping', {
      async resolve () {
        return 'pong'
      },
    })
  },
})
