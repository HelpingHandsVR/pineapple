import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'Test' })
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'uuid' })
  id: string
}
