import { InternalEntity } from '../entity-type/internal'
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm'
import { User } from './user'

@Entity({ name: 'Role' })
export class Role extends InternalEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string

  @OneToMany(() => User, (user) => user.role, {
    lazy: true,
  })
  users: Promise<User[]>

  @Column({
    type: 'boolean',
    default: false,
  })
  default: boolean
}
