import { extendType, inputObjectType } from '@nexus/schema'
import { AttendanceRecord, Attendable } from '~/entity'
import { DateTime } from 'luxon'

export const CreateAttendaceRecordMutationInput = inputObjectType({
  name: 'CreateAttendaceRecordMutationInput',
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
          .findOneOrFail({
            where: {
              id: args.input.attendableId,
            },
          })

        const existing = await context.connection.getRepository(AttendanceRecord)
          .findOne({
            where: {
              attendable: Promise.resolve(attendable),
              user: Promise.resolve(context.authentication.getUser()),
            },
          })

        // Make sure that the user can only specify start and end times within
        // the boundaries of the attendable
        const boundaries = {
          start: DateTime.fromJSDate(attendable.startsAt),
          end: DateTime.fromJSDate(attendable.endsAt),
        }

        if (existing) {
          existing.startsAt = args.input.startsAt
            ? DateTime.max(boundaries.start, DateTime.fromISO(args.input.startsAt)).toJSDate()
            : boundaries.start.toJSDate()

          existing.endsAt = args.input.endsAt
            ? DateTime.min(boundaries.end, DateTime.fromISO(args.input.endsAt)).toJSDate()
            : boundaries.end.toJSDate()

          return context.connection.getRepository(AttendanceRecord)
            .save(existing)
        }

        const record = new AttendanceRecord()

        record.attendable = Promise.resolve(attendable)
        record.user = Promise.resolve(context.authentication.getUser())

        record.startsAt = args.input.startsAt
          ? DateTime.max(boundaries.start, DateTime.fromISO(args.input.startsAt)).toJSDate()
          : boundaries.start.toJSDate()

        record.endsAt = args.input.endsAt
          ? DateTime.min(boundaries.end, DateTime.fromISO(args.input.endsAt)).toJSDate()
          : boundaries.end.toJSDate()

        return context.connection.getRepository(AttendanceRecord)
          .save(record)
      },
    })
  },
})
