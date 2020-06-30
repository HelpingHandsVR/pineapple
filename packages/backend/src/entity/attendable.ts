import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm'

import { AttendableBase } from '~/db/entity-type/attendable-base'
import { AttendableDefinition } from './attendable-definition'

@Entity({ name: 'Attendable' })
export class Attendable extends AttendableBase {
  @ManyToOne(() => AttendableDefinition, (definition) => definition.attendables, {
    lazy: true,
    // If null, it's synced from an external source
    nullable: true,
  })
  definition: Promise<AttendableDefinition>

  @Column({
    type: 'timestamp with time zone',
  })
  startsAt: Date

  @Column({
    type: 'timestamp with time zone',
  })
  endsAt: Date
}
