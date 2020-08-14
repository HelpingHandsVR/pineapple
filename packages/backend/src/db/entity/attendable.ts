import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { AttendableBase } from '../entity-type/attendable-base'

import { AttendableDefinition } from './attendable-definition'
import { AttendanceRecord } from './attendance-record'

@Entity({ name: 'Attendable' })
export class Attendable extends AttendableBase {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  vrcWorldInstance: string

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

  @OneToMany(() => AttendanceRecord, (record) => record.attendable, {
    lazy: true,
  })
  attendances: Promise<AttendanceRecord[]>
}
