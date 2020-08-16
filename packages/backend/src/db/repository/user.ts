import { Repository, EntityRepository } from 'typeorm'
import bcrypt from 'bcrypt'

import { log as logger } from '@/lib/log'
import { User } from '../entity/user'

const log = logger.child({
  component: 'user-repository',
})

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Logs a user in. Finds by email address and checks eligibility for login.
   *
   * @param email Email address of the user trying to log in
   * @param password Password of the user, this will be hashed and checked against the stored hash
   * @returns Promise<User>
   * @throws Error
   */
  public async login (email: string, password: string): Promise<User> {
    const user = await this.findOne({
      email: email.toLowerCase(),
    })

    const authFailedError = new Error('Authentication failed')

    if (!user) {
      log.info({ email }, 'auth failed because no user')

      throw authFailedError
    }

    if (!user.provisioned) {
      log.error({
        userId: user.id,
        userDisplay: user.display,
      }, 'unprovisioned user tried to log in')

      throw authFailedError
    }

    if (user.disabled) {
      log.error({
        userId: user.id,
        userDisplay: user.display,
      }, 'disabled user tried to log in')

      throw authFailedError
    }

    const result = await bcrypt.compare(password, user.password)

    if (!result) {
      log.warn({
        userId: user.id,
      }, 'auth failed because password')

      throw authFailedError
    }

    return user
  }

  public async register (email: string, password: string, display: string): Promise<User> {
    const duplicate = await this.findOne({
      where: {
        email,
      },
    })

    if (duplicate && duplicate.provisioned) {
      // TODO: This could be used to enumerate users, so need to rate-limit
      throw new Error('You already have an account, Please log in instead of registering.')
    } else if (duplicate && !duplicate.provisioned) {
      // We already have data stored for this account, but the user hasn't
      // logged in yet

      duplicate.provisioned = true
      duplicate.email = email
      duplicate.password = password
      duplicate.display = display

      return this.save(duplicate)
    }

    const user = new User()

    user.email = email
    user.password = password
    user.display = display
    user.provisioned = true

    return this.save(user)
  }
}
