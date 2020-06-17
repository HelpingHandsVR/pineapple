import { objectType, extendType } from '@nexus/schema'

export const Post = objectType({
  name: 'Post',
  definition (t) {
    t.id('id', {
      resolve () {
        return '111'
      },
    })
    t.string('test', {
      resolve () {
        return 'stuff'
      },
    })
  },
})

export const PostOnQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('test', {
      type: 'VRChatConfig',
      async resolve (root, args, context) {
        console.log(context)

        const result = await context.dataSources.vrchat.getConfig()

        console.log(result)

        return result
      },
    })
  },
})
