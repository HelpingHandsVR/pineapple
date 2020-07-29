import { objectType } from '@nexus/schema'
import { User } from '~/entity'

export const AttendableType = objectType({
  name: 'Attendable',
  rootTyping: 'entity.Attendable',
  definition (t) {
    t.id('id')
    t.string('name')
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
    t.dateTime('startsAt')
    t.dateTime('endsAt')

    t.field('createdBy', {
      type: 'User',
      resolve (root, args, context) {
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
      resolve (root, args, context) {
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

export const AttendablePagination = objectType({
  name: 'AttendablePagination',
  definition (t) {
    t.implements('PaginationResult')
    t.field('data', {
      list: [false],
      type: 'Attendable',
    })
  },
})
