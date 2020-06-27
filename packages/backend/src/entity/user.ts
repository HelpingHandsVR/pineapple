import { CrudEntity } from '~/db/entity-type/crud'
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { DiscordAccount } from './discord-account'
import { Role } from './role'

@Entity({ name: 'User' })
export class User extends CrudEntity {
  @Column({
    type: 'varchar',
    // VRC User IDs are usr_<uuid4>
    length: 40,
    unique: true,
  })
  vrcUserID: string

  @OneToOne(() => DiscordAccount, (discordAccount) => discordAccount.user, {
    nullable: true,
    lazy: true,
  })
  discordAccount?: Promise<DiscordAccount>

  @OneToOne(() => Role, {
    lazy: true,
  })
  @JoinColumn()
  role: Promise<Role>
}
