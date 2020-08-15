import { extendType, inputObjectType } from '@nexus/schema'
import { UserRepository } from '~/db/repository/user'

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
        return context.connection.getCustomRepository(UserRepository)
          .register(args.input.email, args.input.password, args.input.display)
      },
    })
  },
})
