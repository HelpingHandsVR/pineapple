import { extendType, inputObjectType } from '@nexus/schema'

import { AttendanceRecordRepository } from '~/db/repository/attendance-record'

export const DeleteAttendanceRecordWhereInput = inputObjectType({
  name: 'DeleteAttendanceRecordWhereInput',
  definition (t) {
    t.id('id', {
      required: true,
    })
  },
})

export const CreateAttendaceRecordMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('deleteAttendanceRecord', {
      type: 'Boolean',
      args: {
        where: DeleteAttendanceRecordWhereInput.asArg({
          required: true,
        }),
      },
      async resolve (root, args, context) {
        const result = await context.connection.getCustomRepository(AttendanceRecordRepository)
          .softDelete(args.where.id)

        console.log(result)

        return true
      },
    })
  },
})
