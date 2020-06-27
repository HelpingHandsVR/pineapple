import { Seeder, Factory } from 'typeorm-seeding'
import { Connection } from 'typeorm'

import { Permission, Role } from '~/entity'
import { Action, Subject } from '@/lib/permission'

const fullCrudFor = (subject: Subject) => [
  { action: Action.CREATE, subject },
  { action: Action.CREATE_OTHERS, subject },

  { action: Action.READ, subject },
  { action: Action.READ_OTHERS, subject },

  { action: Action.SOFT_DELETE, subject },
  { action: Action.SOFT_DELETE_OTHERS, subject },

  { action: Action.DELETE, subject },
  { action: Action.DELETE_OTHERS, subject },
]

const allPermissions = [
  ...fullCrudFor(Subject.LESSON),
  ...fullCrudFor(Subject.USER),
  ...fullCrudFor(Subject.PERMISSION),

  { action: Action.ATTACH, subject: Subject.DISCORD_ACCOUNT },
  { action: Action.READ, subject: Subject.DISCORD_OAUTH_REQUEST },
]

export default class CreatePermissions implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<void> {
    const permissions = await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(allPermissions)
      .execute()

    const roles = await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { name: 'rootAdmin', permissions: [] },
        { name: 'admin', permissions: [] },
        { name: 'teacher', permissions: [] },
        { name: 'student', permissions: [] },
      ])
      .execute()

    const rootAdminRole = await connection
      .getRepository(Role)
      .findOneOrFail({
        where: {
          id: roles.identifiers[0].id,
        },
      })

    await Promise.all(permissions.identifiers.map(async (id) => {
      await connection
        .createQueryBuilder()
        .relation(Role, 'permissions')
        .of(rootAdminRole)
        .add(id)
    }))
  }
}
