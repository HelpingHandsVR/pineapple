import { CrudEntity } from '~/db/entity-type/crud'
import {
  Entity,
  Column,
  OneToOne,
} from 'typeorm'
import { DiscordAccount } from './discord-account'

@Entity({ name: 'User' })
export class User extends CrudEntity {
  @Column({
    type: 'varchar',
    // VRC User IDs are usr_<uuid4>
    length: 40,
  })
  vrcUserID: string

  @OneToOne(() => DiscordAccount, (discordAccount) => discordAccount.user, {
    nullable: true,
  })
  discordAccount: Promise<DiscordAccount>
}
