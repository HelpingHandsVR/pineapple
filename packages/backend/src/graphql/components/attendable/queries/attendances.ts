import { extendType } from '@nexus/schema'

import { AttendanceRecordRepository } from '~/db/repository/attendance-record'

export const AttendanceRecordsQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('attendanceRecords', {
      type: 'AttendanceRecordPagination',
      args: {
        pagination: 'PaginationInput',
      },
      resolve (root, args, context) {
        return context.connection.getCustomRepository(AttendanceRecordRepository)
          .paginate(context.authentication.getUser(), {
            query: args.pagination,
            paginationKeys: args.pagination
              ? [args.pagination.orderBy || 'id']
              : ['id'],
          })
      },
    })
  },
})
