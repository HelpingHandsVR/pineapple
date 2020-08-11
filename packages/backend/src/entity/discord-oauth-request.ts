import { CrudEntity } from '../db/entity-type/crud'
import {
  Entity,
  Column,
} from 'typeorm'

@Entity({ name: 'DiscordOauthRequest' })
export class DiscordOauthRequest extends CrudEntity {
  @Column({
    type: 'varchar',
    length: 64,
  })
  state: string
}
