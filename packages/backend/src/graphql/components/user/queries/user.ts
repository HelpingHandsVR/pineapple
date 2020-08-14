import { extendType, inputObjectType } from '@nexus/schema'
import { User } from '~/db/entity'

export const UserQueryWhereInput = inputObjectType({
  name: 'UserQueryWhereInput',
  definition (t) {
    t.id('id', {
      nullable: true,
    })

    t.id('vrcUserID', {
      nullable: true,
    })
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition (t) {
    t.field('user', {
      type: 'User',
      nullable: true,
      args: {
        where: UserQueryWhereInput.asArg({
          required: true,
        }),
      },
      resolve (root, args, context) {
        return context.connection.getRepository(User)
          .findOne({
            where: [
              {
                id: args.where.id,
              }, {
                vrcUserID: args.where.vrcUserID,
              },
            ],
          })
      },
    })
  },
})
