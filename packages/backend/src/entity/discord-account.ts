import { CrudEntity } from '~/db/entity-type/crud'
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import { User } from './user'

@Entity({ name: 'DiscordAccount' })
export class DiscordAccount extends CrudEntity {
  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  accessToken: string

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  expiresAt: Date

  @OneToOne(() => User, {
    nullable: true,
  })
  @JoinColumn()
  user: Promise<User>
}
