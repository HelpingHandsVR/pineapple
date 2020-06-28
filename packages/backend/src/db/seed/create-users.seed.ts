import { Seeder, Factory } from 'typeorm-seeding'
import { User, Role } from '~/entity'

export default class CreateUsers implements Seeder {
  public async run (factory: Factory): Promise<void> {
    const role = await Role.findOneOrFail({
      name: 'student',
    })

    await factory(User)()
      .map(async (user: User) => {
        user.role = Promise.resolve(role)

        return user.save()
      })
      .createMany(10)
  }
}
