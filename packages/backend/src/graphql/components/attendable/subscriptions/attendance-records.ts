import { subscriptionField, inputObjectType } from '@nexus/schema'
import { withFilter } from 'apollo-server-express'

import { Context } from '~/graphql/context'
import { PubsubTopic, buildEntityTopic } from '@/lib/redis-pubsub'
import { AttendanceRecord } from '~/db/entity'

export const AttendanceRecordsSubscriptionWhereInput = inputObjectType({
  name: 'AttendanceRecordsSubscriptionWhereInput',
  definition (t) {
    t.id('records', {
      list: [true],
      required: true,
    })
  },
})

export const AttendanceRecordUpdateSubscription = subscriptionField('attendanceRecordUpdate', {
  type: 'AttendanceRecord',
  args: {
    where: AttendanceRecordsSubscriptionWhereInput.asArg({
      required: true,
    }),
  },
  subscribe: withFilter(
    (root, args, context: Context) => {
      return context.pubsub.asyncIterator(buildEntityTopic(PubsubTopic.EntityUpdate, AttendanceRecord))
    },
    (payload, args) => {
      return args.where.records.includes(payload.id)
    },
  ),
  resolve (root) {
    return root
  },
})

export const AttendanceRecordRemoveSubscription = subscriptionField('attendanceRecordRemove', {
  type: 'String',
  args: {
    where: AttendanceRecordsSubscriptionWhereInput.asArg({
      required: true,
    }),
  },
  subscribe: withFilter(
    (root, args, context: Context) => {
      return context.pubsub.asyncIterator(buildEntityTopic(PubsubTopic.EntityRemove, AttendanceRecord))
    },
    (payload, args) => {
      return args.where.records.includes(payload)
    },
  ),
  resolve (root) {
    return root
  },
})

export const AttendanceRecordCreateSubscription = subscriptionField('attendanceRecordCreate', {
  type: 'AttendanceRecord',
  subscribe: (root, args, context: Context) => {
    return context.pubsub.asyncIterator(buildEntityTopic(PubsubTopic.EntityInsert, AttendanceRecord))
  },
  resolve (root) {
    return root
  },
})
