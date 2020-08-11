import { InternalEntity } from '../db/entity-type/internal'
import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm'

import { Attendable } from '~/entity/attendable'
import { User } from '~/entity/user'

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
