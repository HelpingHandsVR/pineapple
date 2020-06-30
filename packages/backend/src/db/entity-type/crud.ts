import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  PrimaryColumn,
  Column,
} from 'typeorm'

export class CrudEntity extends BaseEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
    unique: true,
  })
  id: string

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp with time zone',
  })
  deletedAt: Date

  @VersionColumn({
    type: 'int',
  })
  version: number

  @Column({
    type: 'uuid',
  })
  createdBy: string

  @Column({
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string
}
