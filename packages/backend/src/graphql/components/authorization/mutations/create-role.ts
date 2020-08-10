import { extendType, inputObjectType } from '@nexus/schema'
import { Role } from '~/entity/role'
import { Permission } from '~/entity/permission'
import { In } from 'typeorm'

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
      async resolve (root, args, context) {
        const role = new Role()
        const permissions = await context.connection.getRepository(Permission)
          .find({
            where: {
              id: In(args.input.permissions),
            },
          })

        role.name = args.input.name
        role.permissions = Promise.resolve(permissions)

        return context.connection.getRepository(Role)
          .save(role)
      },
    })
  },
})
