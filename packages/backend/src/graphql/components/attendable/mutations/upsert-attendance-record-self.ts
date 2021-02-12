import { extendType, inputObjectType } from '@nexus/schema'
import { Attendable } from '~/db/entity'

import { DateTime } from 'luxon'
import { LessThan } from 'typeorm'
import { AttendanceRecordRepository } from '~/db/repository/attendance-record'

export const UpsertAttendaceRecordMutationInput = inputObjectType({
  name: 'UpsertAttendaceRecordMutationInput',
  definition (t) {
    t.id('attendableId', {
      required: true,
    })
  },
})

export const UpsertAttendaceRecordMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('upsertAttendanceRecord', {
      type: 'AttendanceRecord',
      args: {
        input: UpsertAttendaceRecordMutationInput.asArg({
          required: true,
        }),
      },
      async resolve (root, args, context) {
        // If the attendable is deleted but the attendance record exists, the
        // record will be "locked" and cannot be edited as this call will throw
        // an error.
        const attendable = await context.connection.getRepository(Attendable)
          .findOne({
            where: {
              id: args.input.attendableId,
              startsAt: LessThan(DateTime.local().toJSDate()),
              endsAt: LessThan(DateTime.local().endOf('week').toJSDate()),
            },
          })

        if (!attendable) {
          throw new Error('You can only log your time on the week the event happened, after it started.')
        }

        return context.connection.getCustomRepository(AttendanceRecordRepository)
          .upsert(attendable, context.authentication.getUser())
      },
    })
  },
})
