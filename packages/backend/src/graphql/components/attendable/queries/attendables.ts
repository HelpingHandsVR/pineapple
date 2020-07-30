import { extendType, inputObjectType } from '@nexus/schema'
import { buildPaginator } from 'typeorm-cursor-pagination'

import { Attendable } from '~/entity'
// import { DateTime } from 'luxon'

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
        const qb = context.connection.getRepository(Attendable)
          .createQueryBuilder('Attendable')
          .where('1 = 1')

        if (args.pagination?.orderBy) {
          qb.orderBy(args.pagination?.orderBy)
        }

        if (args.search) {
          qb.andWhere('"Attendable"."name" ILIKE :name', {
            name: `%${args.search.name}%`,
          })
        }

        if (args.where?.startsAt?.before) {
          qb.andWhere('"Attendable"."startsAt" < :startsAtBeforeLimit', {
            startsAtBeforeLimit: args.where.startsAt.before,
          })
        }

        if (args.where?.startsAt?.after) {
          qb.andWhere('"Attendable"."startsAt" > :startsAtAfterLimit', {
            startsAtAfterLimit: args.where.startsAt.after,
          })
        }

        if (args.where?.endsAt?.before) {
          qb.andWhere('"Attendable"."endsAt" < :endsAtBeforeLimit', {
            endsAtBeforeLimit: args.where.endsAt.before,
          })
        }

        if (args.where?.endsAt?.after) {
          qb.andWhere('"Attendable"."endsAt" > :endsAtAfterLimit', {
            endsAtAfterLimit: args.where.endsAt.after,
          })
        }

        const paginator = buildPaginator({
          entity: Attendable,
          alias: 'Attendable',
          query: args.pagination,
        })

        return paginator.paginate(qb)
      },
    })
  },
})
