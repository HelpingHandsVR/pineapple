import { extendType, inputObjectType, objectType } from '@nexus/schema'

import { Role } from '~/db/entity'
import { RoleRepository } from '~/db/repository/role'

export const RolePagination = objectType({
  name: 'RolePagination',
  definition (t) {
    t.implements('PaginationResult')
    t.field('data', {
      list: [false],
      type: 'Role',
    })
  },
})

export const RolesQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('roles', {
      type: 'RolePagination',
      args: {
        pagination: 'PaginationInput',
      },
      resolve (root, args, context) {
        return context.connection.getCustomRepository(RoleRepository)
          .paginate({
            query: args.pagination,
            paginationKeys: args.pagination
              ? [args.pagination.orderBy || 'id']
              : ['id'],
          })
      },
    })
  },
})

export const RoleQueryWhereInput = inputObjectType({
  name: 'RoleQueryWhereInput',
  definition (t) {
    t.id('id')
  },
})

export const RoleQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('role', {
      type: 'Role',
      nullable: true,
      args: {
        where: RoleQueryWhereInput.asArg({
          required: true,
        }),
      },
      resolve (root, args, conetxt) {
        return conetxt.connection.getRepository(Role)
          .findOne({
            where: {
              id: args.where.id,
            },
          })
      },
    })
  },
})
