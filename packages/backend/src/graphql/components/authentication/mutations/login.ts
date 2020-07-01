import { extendType, inputObjectType } from '@nexus/schema'

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition (t) {
    t.string('email')
    t.string('password')
  },
})

export const LoginMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('login', {
      type: 'User',
      args: {
        input: LoginInput.asArg({
          required: true,
        }),
      },
      async resolve (root, args, context) {
        await new Promise((resolve, reject) => {
          context.express.req.session.regenerate((err?: Error) => {
            if (err) {
              return reject(err)
            }

            return resolve(true)
          })
        })

        const result = await context.passport.authenticate('graphql-local', args.input)

        await context.passport.login(result.user)

        return result.user
      },
    })
  },
})
