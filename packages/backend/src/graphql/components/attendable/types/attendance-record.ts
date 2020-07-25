import { objectType } from '@nexus/schema'

export const AttendanceRecordType = objectType({
  name: 'AttendanceRecord',
  rootTyping: 'entity.AttendanceRecord',
  definition (t) {
    t.id('id')
    t.dateTime('startsAt')
    t.dateTime('endsAt')

    t.field('attendable', {
      type: 'Attendable',
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
