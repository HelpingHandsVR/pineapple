import { extendType } from '@nexus/schema'

export const ViewerQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('viewer', {
      type: 'Viewer',
      nullable: true,
      resolve (root, args, context) {
        if (!context.vrchat.viewer || !context.auth.user) {
          return null
        }

        return {
          user: context.auth.user,
          vrchatUser: context.vrchat.viewer,
        }
      },
    })
  },
})
