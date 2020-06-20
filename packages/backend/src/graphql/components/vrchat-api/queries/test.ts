import { extendType } from '@nexus/schema'

export const VRCViewerQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('vrcViewer', {
      type: 'VRChatExtendedUser',
      resolve (root, args, context) {
        return context.dataSources.vrchat.getViewer()
      },
    })
  },
})
