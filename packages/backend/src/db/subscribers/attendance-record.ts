import { EntitySubscriberInterface, UpdateEvent, EventSubscriber, InsertEvent, BaseEntity, RemoveEvent } from 'typeorm'

import { AttendanceRecord } from '../entity'
import { pubsub, PubsubTopic, buildEntityTopic } from '@/lib/redis-pubsub'

@EventSubscriber()
export class AttendanceRecordSubscriber implements EntitySubscriberInterface<AttendanceRecord> {
  listenTo (): typeof BaseEntity {
    return AttendanceRecord
  }

  afterUpdate (event: UpdateEvent<AttendanceRecord>): Promise<void> {
    return this.sendUpdate(PubsubTopic.EntityUpdate, event.entity)
  }

  afterInsert (event: InsertEvent<AttendanceRecord>): Promise<void> {
    return this.sendUpdate(PubsubTopic.EntityInsert, event.entity)
  }

  afterRemove (event: RemoveEvent<AttendanceRecord>): Promise<void> {
    return this.sendUpdate(PubsubTopic.EntityRemove, event.entityId)
  }

  private sendUpdate (change: PubsubTopic, entity: AttendanceRecord) {
    return pubsub.publish<AttendanceRecord>(buildEntityTopic(change, AttendanceRecord), entity)
  }
}
