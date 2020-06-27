import { CrudEntity } from '~/db/entity-type/crud'
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Permission } from './permission'

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
}
