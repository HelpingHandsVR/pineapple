import { CrudEntity } from './crud'
import { Column } from 'typeorm'
import { AttendableType } from '../enums'

// These are columns that exist in both Attendable and AttendableDefinition.
// This way single events can be changed by users (for example, the host can be
// changed only for the next event if they become unavailable that day)
//
// Also, the sync from external sources can this way sync to Attendable, without
// bothering the definitions.
export class AttendableBase extends CrudEntity {
  @Column({
    type: 'int',
  })
  type: AttendableType

  @Column({
    type: 'varchar',
  })
  name: string

  @Column({
    type: 'varchar',
    // VRC World IDs are wld_<uuid4>
    length: 40,
    nullable: true,
  })
  hostVrcUserId: string

  @Column({
    type: 'varchar',
    // VRC World IDs are wrld_<uuid4>
    length: 41,
    nullable: true,
  })
  vrcWorldId: string
}
