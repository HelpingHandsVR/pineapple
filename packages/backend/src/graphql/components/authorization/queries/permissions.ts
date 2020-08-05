import { extendType, inputObjectType, objectType } from '@nexus/schema'
import { Permission } from '~/entity'
import { buildPaginator } from 'typeorm-cursor-pagination'

export const PermissionPagination = objectType({
  name: 'PermissionPagination',
  definition (t) {
    t.implements('PaginationResult')
    t.field('data', {
      list: [false],
      type: 'Permission',
    })
  },
})

export const PermissionsQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('permissions', {
      type: 'PermissionPagination',
      args: {
        pagination: 'PaginationInput',
      },
      resolve (root, args, context) {
        const qb = context.connection.getRepository(Permission)
          .createQueryBuilder('Permission')

        const paginator = buildPaginator({
          entity: Permission,
          alias: 'Permission',
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

export const PermissionQueryWhereInput = inputObjectType({
  name: 'PermissionQueryWhereInput',
  definition (t) {
    t.id('id')
  },
})

export const PermissionQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('permission', {
      type: 'Permission',
      nullable: true,
      args: {
        where: PermissionQueryWhereInput.asArg({
          required: true,
        }),
      },
      resolve (root, args, conetxt) {
        return conetxt.connection.getRepository(Permission)
          .find({
            where: {
              id: args.where.id,
            },
          })
      },
    })
  },
})
