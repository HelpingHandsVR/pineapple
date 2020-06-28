import { CrudEntity } from '~/db/entity-type/crud'
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { Permission } from './permission'
import { User } from './user'

@Entity({ name: 'Role' })
export class Role extends CrudEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string

  @ManyToMany(() => Permission, {
    lazy: true,
  })
  @JoinTable()
  permissions: Promise<Permission[]>

  @OneToMany(() => User, (user) => user.role, {
    lazy: true,
  })
  users: Promise<User[]>
}
