import { define } from 'typeorm-seeding'
import { User } from '~/db/entity'

define(User, (faker): User => {
  const user = new User()

  user.email = faker.internet.email()
  user.password = 'password'
  user.emailVerified = faker.random.boolean()

  return user
})
