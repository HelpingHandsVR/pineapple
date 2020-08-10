import { extendType, inputObjectType } from '@nexus/schema'
import { Attendable } from '~/entity/attendable'
import { MoreThan } from 'typeorm'

export const UpcomingAttendablesQueryInput = inputObjectType({
  name: 'UpcomingAttendablesQueryInput',
  definition (t) {
    t.int('take')
  },
})

export const UpcomingAttendablesQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('upcomingAttendables', {
      deprecation: 'Use the "attendables" query',
      type: 'Attendable',
      list: [false],
      args: {
        input: UpcomingAttendablesQueryInput.asArg({
          required: true,
        }),
      },
      resolve (root, args, context) {
        return context.connection.getRepository(Attendable)
          .find({
            where: {
              // By filtering for endsAt, we will be able to include currently
              // running events
              endsAt: MoreThan(new Date()),
            },
            order: {
              startsAt: 'ASC',
            },
            take: Math.min(args.input.take, 100),
          })
      },
    })
  },
})
