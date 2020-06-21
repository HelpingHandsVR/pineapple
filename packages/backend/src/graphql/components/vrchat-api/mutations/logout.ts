import { extendType, objectType } from '@nexus/schema'

export const VRChatLogoutMutationResult = objectType({
  name: 'VRChatLogoutMutationResult',
  definition (t) {
    t.boolean('success')
  },
})

export const LogoutMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('logout', {
      type: 'VRChatLogoutMutationResult',
      async resolve (root, args, context) {
        await context.dataSources.vrchat.logout()

        return {
          success: true,
        }
      },
    })
  },
})
