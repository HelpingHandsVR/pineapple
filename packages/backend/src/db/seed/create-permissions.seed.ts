import { Seeder, Factory } from 'typeorm-seeding'
import { Connection } from 'typeorm'

import { Permission, Role } from '~/entity'
import { Action, Subject } from '@/lib/permission'

const fullCrudFor = (subject: Subject) => [
  { action: Action.CREATE, subject },
  { action: Action.READ, subject },
  { action: Action.SOFT_DELETE, subject },
  { action: Action.DELETE, subject },
]

const allPermissions = [
  ...fullCrudFor(Subject.LESSON_SELF),
  ...fullCrudFor(Subject.LESSON_OTHERS),
  ...fullCrudFor(Subject.USER_SELF),
  ...fullCrudFor(Subject.USER_OTHERS),
  ...fullCrudFor(Subject.PERMISSION_SELF),
  ...fullCrudFor(Subject.ATTENDANCE_RECORD_SELF),
  ...fullCrudFor(Subject.ATTENDANCE_RECORD_OTHERS),
  ...fullCrudFor(Subject.ATTENDABLE_SELF),
  ...fullCrudFor(Subject.ATTENDABLE_OTHERS),
  ...fullCrudFor(Subject.SYSTEM_ROLE),

  { action: Action.ATTACH, subject: Subject.DISCORD_ACCOUNT_SELF },
  { action: Action.DETACH, subject: Subject.DISCORD_ACCOUNT_OTHERS },
  { action: Action.READ, subject: Subject.DISCORD_OAUTH_REQUEST_SELF },
  { action: Action.READ, subject: Subject.SYSTEM_QUEUE },
  { action: Action.READ, subject: Subject.SYSTEM_PERMISSION },
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
        { name: 'ROOT_ADMIN', permissions: Promise.resolve([]) },
        { name: 'USER', permissions: Promise.resolve([]), default: true },
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
