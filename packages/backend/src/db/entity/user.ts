import { InternalEntity } from '../entity-type/internal'
import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  BeforeUpdate,
  AfterLoad,
  BeforeInsert,
} from 'typeorm'

import * as bcrypt from 'bcrypt'

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
    nullable: false,
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
    nullable: false,
  })
  display: string

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

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  disabled: boolean

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  provisioned: boolean

  /**
   * Password related stuff
   */

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
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
  @BeforeInsert()
  private async hashPasswordOnUpdate () {
    // If the password is changed, re-hash it
    // If this entity is brand new, passwordHash will be falsey so this
    // comparison still works
    if (this.password && this.password !== this.passwordHash) {
      this.passwordHash = await bcrypt.hash(this.password, 12)
    }
  }

  @BeforeInsert()
  private async attachDefaultRole () {
    const role = await Role.findOneOrFail({
      where: {
        default: true,
      },
    })

    this.role = Promise.resolve(role)
  }
}
