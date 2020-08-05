import { extendType, inputObjectType } from '@nexus/schema'
import { Role } from '~/entity'

export const CreateRoleMutationInput = inputObjectType({
  name: 'CreateRoleMutationInput',
  definition (t) {
    t.string('name')
    t.id('permissions', {
      list: [false],
    })
  },
})

export const CreateRoleMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('createRole', {
      type: 'Role',
      args: {
        input: CreateRoleMutationInput.asArg({
          required: true,
        }),
      },
      resolve (root, args, context) {
        const role = new Role()

        role.name = args.input.name
        role.permissions = args.input.permissions

        return context.connection.getRepository(Role)
          .save(role)
      },
    })
  },
})
