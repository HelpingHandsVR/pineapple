import { InternalEntity } from '~/db/entity-type/internal'
import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  BeforeUpdate,
  AfterLoad,
  BeforeInsert,
} from 'typeorm'

import bcrypt from 'bcrypt'

import { DiscordAccount } from './discord-account'
import { Role } from './role'

@Entity({ name: 'User' })
export class User extends InternalEntity {
  @Column({
    type: 'varchar',
    // VRC User IDs are usr_<uuid4>
    length: 40,
    unique: true,
    nullable: true,
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

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  email: string

  @Column({
    type: 'varchar',
    nullable: true,
  })
  pendingEmail: string

  @Column({
    type: 'boolean',
    default: false,
  })
  emailVerified: boolean

  /**
   * Password related stuff
   */

  @Column({
    type: 'varchar',
    unique: true,
  })
  private passwordHash: string

  password: string

  @AfterLoad()
  private loadPassword () {
    // There's no "decoding" of a hash, so we just make the hash available for
    // bcrypt verification elsewhere in the app
    this.password = this.passwordHash
  }

  @BeforeUpdate()
  private hashPasswordOnUpdate () {
    // If the password is changed, re-hash it
    if (this.password !== this.passwordHash) {
      this.passwordHash = bcrypt.hashSync(this.password, 12)
    }
  }

  @BeforeInsert()
  private hashPasswordOncreate () {
    this.passwordHash = bcrypt.hashSync(this.password, 12)
  }
}
