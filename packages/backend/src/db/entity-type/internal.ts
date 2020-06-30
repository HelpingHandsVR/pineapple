import {
  BaseEntity,
  PrimaryColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

export class InternalEntity extends BaseEntity {
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
}
