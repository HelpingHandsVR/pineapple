import { InternalEntity } from '~/db/entity-type/internal'
import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm'
import { DiscordAccount } from './discord-account'
import { Role } from './role'

@Entity({ name: 'User' })
export class User extends InternalEntity {
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

  @ManyToOne(() => Role, (role) => role.users, {
    lazy: true,
  })
  role: Promise<Role>
}
