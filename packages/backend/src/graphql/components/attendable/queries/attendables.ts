import { extendType, inputObjectType } from '@nexus/schema'

import { Attendable } from '~/db/entity'
import { AttendableRepository } from '~/db/repository/attendable'

export const AttendablesQueryWhereInputDateConstraint = inputObjectType({
  name: 'AttendablesQueryWhereInputDateConstraint',
  definition (t) {
    t.dateTime('after', {
      required: false,
    })
    t.dateTime('before', {
      required: false,
    })
  },
})

export const AttendablesQueryWhereInput = inputObjectType({
  name: 'AttendablesQueryWhereInput',
  definition (t) {
    t.field('startsAt', {
      type: 'AttendablesQueryWhereInputDateConstraint',
      required: false,
    })
    t.field('endsAt', {
      type: 'AttendablesQueryWhereInputDateConstraint',
      required: false,
    })
  },
})

export const AttendablesQuerySearchInput = inputObjectType({
  name: 'AttendablesQuerySearchInput',
  definition (t) {
    t.string('name', {
      required: true,
    })
  },
})

export const AttendableQueryWhereInput = inputObjectType({
  name: 'AttendableQueryWhereInput',
  definition (t) {
    t.id('id', {
      required: true,
    })
  },
})

export const AttendablesQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('attendable', {
      type: 'Attendable',
      nullable: true,
      args: {
        where: 'AttendableQueryWhereInput',
      },
      resolve (root, args, context) {
        return context.connection.getRepository(Attendable)
          .findOne({
            where: {
              id: args.where?.id,
            },
          })
      },
    })

    t.field('attendables', {
      type: 'AttendablePagination',
      args: {
        pagination: 'PaginationInput',
        where: 'AttendablesQueryWhereInput',
        search: 'AttendablesQuerySearchInput',
      },
      resolve (root, args, context) {
        return context.connection.getCustomRepository(AttendableRepository)
          .paginate({
            query: args.pagination,
            search: args.search,
            where: args.where,
            paginationKeys: args.pagination
              ? [args.pagination.orderBy || 'id']
              : ['id'],
          })
      },
    })
  },
})
