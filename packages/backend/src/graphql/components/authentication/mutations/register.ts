import { extendType, inputObjectType } from '@nexus/schema'
import { User } from '~/entity/user'

export const RegisterInput = inputObjectType({
  name: 'RegisterInput',
  definition (t) {
    t.string('email', {
      required: true,
    })
    t.string('password', {
      required: true,
    })
    t.string('display', {
      required: true,
    })
  },
})

export const RegisterMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('register', {
      type: 'User',
      args: {
        input: RegisterInput.asArg({
          required: true,
        }),
      },
      async resolve (root, args, context) {
        const duplicate = await context.connection.getRepository(User)
          .findOne({
            where: {
              email: args.input.email,
            },
          })

        if (duplicate && duplicate.provisioned) {
          // TODO: This could be used to enumerate users, so need to rate-limit
          throw new Error('You already have an account, Please log in instead of registering.')
        } else if (duplicate && !duplicate.provisioned) {
          // We already have data stored for this account, but the user hasn't
          // logged in yet

          duplicate.provisioned = true
          duplicate.email = args.input.email
          duplicate.password = args.input.password
          duplicate.display = args.input.display

          return context.connection.getRepository(User)
            .save(duplicate)
        }

        const user = new User()

        user.email = args.input.email
        user.password = args.input.password
        user.display = args.input.display
        user.provisioned = true

        return context.connection.getRepository(User)
          .save(user)
      },
    })
  },
})
