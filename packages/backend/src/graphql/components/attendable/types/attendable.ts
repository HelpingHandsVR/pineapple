import { objectType } from '@nexus/schema'
import { User, Attendable } from '~/entity'

export const AttendableType = objectType({
  name: 'Attendable',
  definition (t) {
    t.id('id')
    t.string('name')
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
    t.dateTime('startsAt')
    t.dateTime('endsAt')

    t.field('createdBy', {
      type: 'User',
      resolve (root: Attendable, args, context) {
        return context.connection.getRepository(User)
          .findOne({
            where: {
              id: root.createdBy,
            },
          })
      },
    })

    t.field('updatedBy', {
      type: 'User',
      resolve (root: Attendable, args, context) {
        return context.connection.getRepository(User)
          .findOne({
            where: {
              id: root.updatedBy,
            },
          })
      },
    })
  },
})
