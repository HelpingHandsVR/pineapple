import { extendType, inputObjectType } from '@nexus/schema'
import { Attendable } from '~/db/entity'

import { DateTime } from 'luxon'
import { LessThan } from 'typeorm'
import { AttendanceRecordRepository } from '~/db/repository/attendance-record'

export const CreateAttendaceRecordMutationInput = inputObjectType({
  name: 'UpsertAttendaceRecordMutationInput',
  definition (t) {
    t.id('attendableId', {
      required: true,
    })

    t.dateTime('startsAt', {
      required: false,
    })

    t.dateTime('endsAt', {
      required: false,
    })
  },
})

export const CreateAttendaceRecordMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('upsertAttendanceRecord', {
      type: 'AttendanceRecord',
      args: {
        input: CreateAttendaceRecordMutationInput.asArg({
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
          .upsert(attendable, context.authentication.getUser(), {
            endsAt: args.input.endsAt,
            startsAt: args.input.endsAt,
          })
      },
    })
  },
})
