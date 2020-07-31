import { extendType, inputObjectType } from '@nexus/schema'
import { AttendanceRecord, Attendable } from '~/entity'
import { DateTime } from 'luxon'
import { LessThan } from 'typeorm'

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

        const existing = await context.connection.getRepository(AttendanceRecord)
          .findOne({
            where: {
              attendable: attendable.id,
              user: context.authentication.getUser().id,
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
            ? DateTime.max(boundaries.start, DateTime.fromJSDate(args.input.startsAt)).toJSDate()
            : boundaries.start.toJSDate()

          existing.endsAt = args.input.endsAt
            ? DateTime.min(boundaries.end, DateTime.fromJSDate(args.input.endsAt)).toJSDate()
            : boundaries.end.toJSDate()

          return context.connection.getRepository(AttendanceRecord)
            .save(existing)
        }

        const record = new AttendanceRecord()

        record.attendable = Promise.resolve(attendable)
        record.user = Promise.resolve(context.authentication.getUser())

        record.startsAt = args.input.startsAt
          ? DateTime.max(boundaries.start, DateTime.fromJSDate(args.input.startsAt)).toJSDate()
          : boundaries.start.toJSDate()

        record.endsAt = args.input.endsAt
          ? DateTime.min(boundaries.end, DateTime.fromJSDate(args.input.endsAt)).toJSDate()
          : boundaries.end.toJSDate()

        return context.connection.getRepository(AttendanceRecord)
          .save(record)
      },
    })
  },
})