import { extendType, inputObjectType } from '@nexus/schema'

export const VRChatUserQueryWhereInput = inputObjectType({
  name: 'VRChatUserQueryWhereInput',
  definition (t) {
    t.id('id')
  },
})

export const VRChatUserQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('vrchatUser', {
      type: 'VRChatUser',
      args: {
        where: VRChatUserQueryWhereInput.asArg({
          required: true,
        }),
      },
      resolve (root, args, context) {
        return context.dataSources.vrchat.getUser(args.where.id)
      },
    })
  },
})
