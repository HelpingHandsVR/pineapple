import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm'

import { AttendableBase } from '../db/entity-type/attendable-base'
import { Attendable } from '~/entity/attendable'

@Entity({ name: 'AttendableDefinition' })
export class AttendableDefinition extends AttendableBase {
  @OneToMany(() => Attendable, (attendable) => attendable.definition, {
    lazy: true,
  })
  attendables: Promise<Attendable[]>

  @Column({
    type: 'varchar',
  })
  cronSchedule: string
}
