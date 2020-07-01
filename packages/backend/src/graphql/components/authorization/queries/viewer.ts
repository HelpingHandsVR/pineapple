import { extendType } from '@nexus/schema'

export const ViewerQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('viewer', {
      type: 'User',
      nullable: true,
      resolve (root, args, context) {
        return context.authentication.getUser()
      },
    })
  },
})
