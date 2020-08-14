import { EntitySubscriberInterface, UpdateEvent, EventSubscriber, InsertEvent } from 'typeorm'

import { AttendanceRecord } from '../entity'
import { pubsub, PubsubTopic, buildEntityTopic } from '@/lib/redis-pubsub'

@EventSubscriber()
export class AttendanceRecordSubscriber implements EntitySubscriberInterface<AttendanceRecord> {
  listenTo (): typeof AttendanceRecord {
    return AttendanceRecord
  }

  afterUpdate (event: UpdateEvent<AttendanceRecord>): Promise<void> {
    return pubsub.publish<AttendanceRecord>(buildEntityTopic(PubsubTopic.EntityUpdate, AttendanceRecord), event.entity)
  }

  afterInsert (event: InsertEvent<AttendanceRecord>): Promise<void> {
    return pubsub.publish<AttendanceRecord>(buildEntityTopic(PubsubTopic.EntityInsert, AttendanceRecord), event.entity)
  }
}
