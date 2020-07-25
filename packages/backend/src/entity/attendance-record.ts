import { InternalEntity } from '~/db/entity-type/internal'
import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm'

import { User } from './user'
import { Attendable } from './attendable'

@Entity({ name: 'AttendanceRecord' })
export class AttendanceRecord extends InternalEntity {
  @ManyToOne(() => User, {
    lazy: true,
    nullable: false,
  })
  user: Promise<User>

  @Column({
    type: 'timestamp with time zone',
    nullable: false,
  })
  startsAt: Date

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  endsAt: Date

  @ManyToOne(() => Attendable, (attendable) => attendable.attendances, {
    lazy: true,
  })
  attendable: Promise<Attendable>
}
