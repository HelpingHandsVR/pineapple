import { CrudEntity } from '~/db/entity-type/crud'
import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm'

import { User } from './user'
import { AttendableDefinition } from './attendable-definition'
import { AttendableType } from '~/db/enums'

@Entity({ name: 'Attendable' })
export class Attendable extends CrudEntity {
  @ManyToOne(() => AttendableDefinition, (definition) => definition.attendables, {
    lazy: true,
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

  // We're redeclaring the following columns so that users can individually
  // change them (such as changing the host for the next event if the current
  // host becomes unavailable)

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
}
