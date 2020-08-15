import { Seeder } from 'typeorm-seeding'

import { Role } from '~/db/entity'

export default class CreateRoles implements Seeder {
  public async run (): Promise<void> {
    const rootAdmin = new Role()

    rootAdmin.name = 'ROOT_ADMIN'
    await rootAdmin.save()

    const user = new Role()

    user.name = 'USER'
    user.default = true
    await user.save()
  }
}
