import { extendType } from '@nexus/schema'

export const ViewerQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('viewer', {
      type: 'Viewer',
      resolve (root, args, context) {
        return {
          user: context.auth.user,
          vrchatUser: context.vrchat.viewer,
        }
      },
    })
  },
})
