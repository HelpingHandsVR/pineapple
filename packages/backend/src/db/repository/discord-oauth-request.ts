import { Repository, EntityRepository } from 'typeorm'
import { randomBytes } from 'crypto'

import { log as logger } from '@/lib/log'
import { DiscordOauthRequest, User } from '../entity'

type GetByStateInput = {
  state: string,
}

const log = logger.child({
  component: 'discord-oauth-request-repository',
})

@EntityRepository(DiscordOauthRequest)
export class DiscordOauthRequestRepository extends Repository<DiscordOauthRequest> {
  /**
   * Gets a request with a specific state string and then soft deletes it if found
   *
   * @param input Input object containing the state string
   */
  public async useState (input: GetByStateInput): Promise<void> {
    const request = await this.findOne({
      where: {
        state: input.state,
      },
    })

    if (!request) {
      log.warn(input, 'invalid request state')

      throw new Error('Invalid request state')
    }

    // This request is now "used up". To try again, the user will need to
    // re-request a new oauth URL
    await request.softRemove()
  }

  /**
   * Create an oauth request with a random state, which then needs to be later
   * used to validate the request from Discord (using `useState`).
   *
   * @param user The user who will be permitted to use this state up
   */
  public async createState (user: User): Promise<DiscordOauthRequest> {
    const state = randomBytes(32).toString('hex')
    const request = new DiscordOauthRequest()

    request.state = state
    request.createdBy = user.id

    return this.save(request)
  }
}
