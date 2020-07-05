import { Seeder, Factory } from 'typeorm-seeding'
import { User, Role } from '~/entity'

export default class CreateUsers implements Seeder {
  public async run (factory: Factory): Promise<void> {
    const rootAdmin = await Role.findOneOrFail({
      name: 'ROOT_ADMIN',
    })

    await factory(User)()
      .map(async (user: User) => {
        user.role = Promise.resolve(rootAdmin)
        user.email = 'decentm+pineapple-system@decentm.com'
        user.emailVerified = true
        user.disabled = true
        user.display = 'SYSTEM'

        return user.save()
      })
      .create()
  }
}
