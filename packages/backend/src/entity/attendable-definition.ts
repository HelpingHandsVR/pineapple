import { CrudEntity } from '~/db/entity-type/crud'
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { User } from './user'
import { Attendable } from './attendable'
import { AttendableType } from '~/db/enums'

@Entity({ name: 'AttendableDefinition' })
export class AttendableDefinition extends CrudEntity {
  @OneToMany(() => Attendable, (attendable) => attendable.definition, {
    lazy: true,
  })
  attendables: Promise<Attendable[]>

  @Column({
    type: 'boolean',
    default: true,
  })
  // Managed event means the event is created and updated by a user through this
  // app. False means it's imported from an external source automatically.
  managed: boolean

  @Column({
    type: 'int',
  })
  type: AttendableType

  @Column({
    type: 'varchar',
  })
  name: string

  @ManyToOne(() => User, {
    lazy: true,
  })
  host: Promise<User>

  @Column({
    type: 'varchar',
  })
  cronSchedule: string
}
