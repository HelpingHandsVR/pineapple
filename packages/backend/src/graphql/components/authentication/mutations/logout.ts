import { extendType } from '@nexus/schema'

export const LogoutMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('logout', {
      type: 'Boolean',
      async resolve (root, args, context) {
        context.passport.logout()

        const result = await new Promise<boolean>((resolve, reject) => {
          context.express.req.session.regenerate((err?: Error) => {
            if (err) {
              return reject(err)
            }

            return resolve(true)
          })
        })

        return result
      },
    })
  },
})
