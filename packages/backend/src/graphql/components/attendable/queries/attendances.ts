import { extendType } from '@nexus/schema'
import { buildPaginator } from 'typeorm-cursor-pagination'

import { AttendanceRecord } from '~/entity'

export const AttendanceRecordsQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('attendanceRecords', {
      type: 'AttendanceRecordPagination',
      args: {
        pagination: 'PaginationInput',
      },
      resolve (root, args, context) {
        const qb = context.connection.getRepository(AttendanceRecord)
          .createQueryBuilder('AttendanceRecord')
          .where('"AttendanceRecord"."userId" = :userId', {
            userId: context.authentication.getUser().id,
          })

        const paginator = buildPaginator({
          entity: AttendanceRecord,
          alias: 'AttendanceRecord',
          query: args.pagination,
        })

        return paginator.paginate(qb)
      },
    })
  },
})
