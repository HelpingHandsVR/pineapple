import { Repository, EntityRepository } from 'typeorm'
import { User } from '../entity/user'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
