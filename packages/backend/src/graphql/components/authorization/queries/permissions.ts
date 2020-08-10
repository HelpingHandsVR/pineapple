import { extendType, objectType } from '@nexus/schema'
import { Permission } from '~/entity/permission'
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
