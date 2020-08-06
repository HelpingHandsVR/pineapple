import { extendType, inputObjectType } from '@nexus/schema'
import { Role, Permission } from '~/entity'
import { In } from 'typeorm'

export const UpdateRoleMutationWhereInput = inputObjectType({
  name: 'UpdateRoleMutationWhereInput',
  definition (t) {
    t.id('id')
  },
})

export const UpdateRoleMutationInput = inputObjectType({
  name: 'UpdateRoleMutationInput',
  definition (t) {
    t.string('name')
    t.id('permissions', {
      list: [false],
    })
  },
})

export const UpdateRoleMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('updateRole', {
      type: 'Role',
      args: {
        input: UpdateRoleMutationInput.asArg({
          required: true,
        }),
        where: UpdateRoleMutationWhereInput.asArg({
          required: true,
        }),
      },
      async resolve (root, args, context) {
        const role = await context.connection.getRepository(Role)
          .findOneOrFail({
            where: {
              id: args.where.id,
            },
          })

        const permissions = await context.connection.getRepository(Permission)
          .find({
            where: {
              id: In(args.input.permissions),
            },
          })

        role.name = args.input.name
        role.permissions = Promise.resolve(permissions)

        return role.save()
      },
    })
  },
})
