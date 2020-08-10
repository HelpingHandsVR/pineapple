import { extendType, inputObjectType, objectType } from '@nexus/schema'
import { Role } from '~/entity/role'
import { buildPaginator } from 'typeorm-cursor-pagination'

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
        const qb = context.connection.getRepository(Role)
          .createQueryBuilder('Role')

        const paginator = buildPaginator({
          entity: Role,
          alias: 'Role',
          query: args.pagination,
          paginationKeys: args.pagination
            ? [args.pagination.orderBy || 'id']
            : ['id'] as any,
        })

        return paginator.paginate(qb)
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
