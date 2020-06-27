import {
  BaseEntity,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm'

export class InternalEntity extends BaseEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
    unique: true,
  })
  id: string

  @DeleteDateColumn({
    type: 'timestamp with time zone',
  })
  deletedAt: Date
}
