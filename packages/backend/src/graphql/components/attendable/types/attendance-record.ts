import { objectType } from '@nexus/schema'
import { AttendanceRecordRepository } from '~/db/repository/attendance-record'

export const AttendanceRecordType = objectType({
  name: 'AttendanceRecord',
  rootTyping: 'AttendanceRecord.AttendanceRecord',
  definition (t) {
    t.id('id')
    t.dateTime('startsAt')
    t.dateTime('endsAt')

    t.field('attendable', {
      type: 'Attendable',
      async resolve (root, args, context) {
        if (root.attendable) {
          return root.attendable
        }

        const record = await context.connection.getCustomRepository(AttendanceRecordRepository)
          .findOne({
            where: {
              id: root.id,
            },
          })

        return record.attendable
      },
    })
  },
})

export const AttendanceRecordPagination = objectType({
  name: 'AttendanceRecordPagination',
  definition (t) {
    t.implements('PaginationResult')
    t.field('data', {
      list: [false],
      type: 'AttendanceRecord',
    })
  },
})
