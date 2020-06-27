import { define } from 'typeorm-seeding'
import { User } from '~/entity'

define(User, (faker): User => {
  const user = new User()

  const uuid = faker.random.uuid()
  user.vrcUserID = `usr_${uuid}`

  return user
})
