import { InternalEntity } from '../db/entity-type/internal'
import {
  Entity,
  Column,
  AfterLoad,
} from 'typeorm'

import { Action, Subject } from '../../lib/permission'

@Entity({ name: 'Permission' })
export class Permission extends InternalEntity {
  @Column({
    type: 'int',
  })
  action: Action

  @Column({
    type: 'int',
  })
  subject: Subject

  @AfterLoad()
  getName (): string {
    return `can ${Action[this.action].toLowerCase()} ${Subject[this.subject].toLowerCase()}`
  }
}
