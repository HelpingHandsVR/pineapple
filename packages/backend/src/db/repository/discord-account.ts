import { Repository, EntityRepository } from 'typeorm'
import { DateTime } from 'luxon'

import { DiscordAccount, User } from '../entity'

type UpsertInput = {
  accessToken: string,
  expiresInSeconds: number,
  user: User,
}

@EntityRepository(DiscordAccount)
export class DiscordAccountRepository extends Repository<DiscordAccount> {
  /**
   * Upserts a DiscordAccount for a user. A Discord account is considered linked
   * when a row exists in this repository that points to an existing User.
   *
   * @param viewer The currently logged in user
   * @param input An object containing data about the requested DiscordAccount
   */
  public async upsert (viewer: User, input: UpsertInput): Promise<DiscordAccount> {
    const account = await this.findOne({
      where: {
        accessToken: input.accessToken,
      },
    })

    const expiresAt = DateTime
      .local()
      .plus({
        seconds: input.expiresInSeconds,
      })
      .toJSDate()

    if (account) {
      account.accessToken = input.accessToken
      account.expiresAt = expiresAt
      account.user = Promise.resolve(input.user)
      account.updatedBy = viewer.id

      return account
    }

    const newAccount = new DiscordAccount()

    newAccount.accessToken = input.accessToken
    newAccount.expiresAt = expiresAt
    newAccount.user = Promise.resolve(input.user)
    newAccount.createdBy = viewer.id

    await newAccount.save()

    return newAccount
  }
}
