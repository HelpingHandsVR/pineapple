import { extendType } from '@nexus/schema'

export const ViewerQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('viewer', {
      type: 'Viewer',
      nullable: true,
      resolve (root, args, context) {
        return {
          user: context.authentication.getUser(),
          ability: context.authorisation.ability.rules,
        }
      },
    })
  },
})
