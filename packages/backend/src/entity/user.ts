import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  PrimaryColumn,
} from 'typeorm'

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @PrimaryColumn({
    generated: 'uuid',
    unique: true,
  })
  id: string

  @Column({
    type: 'varchar',
    // VRC User IDs are usr_<uuid4>
    length: 40,
  })
  vrcUserID: string

  // Automatically managed fields

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @VersionColumn()
  version: number
}
