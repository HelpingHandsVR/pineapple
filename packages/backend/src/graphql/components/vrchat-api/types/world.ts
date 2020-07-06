import { objectType } from '@nexus/schema'

import { VRCWorldInstanceTuple } from '~/data-sources/vrchat/types'

export const VRChatWorldInstance = objectType({
  name: 'VRChatWorldInstance',
  definition (t) {
    t.id('id', {
      resolve (root: VRCWorldInstanceTuple) {
        return root[0]
      },
    })
    t.int('players', {
      resolve (root: VRCWorldInstanceTuple) {
        return root[1]
      },
    })
  },
})

export const VRChatWorld = objectType({
  name: 'VRChatWorld',
  definition (t) {
    t.id('id')
    t.string('name')

    t.string('description')
    t.boolean('featured')

    t.id('authorId')
    t.field('author', {
      type: 'VRChatLimitedUser',
      nullable: true,
      async resolve (root, args, context) {
        if (!root.authorId) {
          return null
        }

        return context.dataSources.vrchat.getUser(root.authorId)
      },
    })

    t.string('authorName')
    t.int('capacity')
    t.string('tags', {
      list: [false],
    })

    t.string('releaseStatus')
    t.url('imageUrl')
    t.url('thumbnailImageUrl')

    t.int('version')
    t.string('organization')
    t.int('favorites')
    t.dateTime('created_at')
    t.dateTime('updated_at')
    t.dateTime('publicationDate')
    t.dateTime('labsPublicationDate')
    t.int('visits')
    t.int('popularity')
    t.int('heat')
    t.int('publicOccupants')
    t.int('privateOccupants')
    t.int('occupants')

    t.field('instances', {
      type: 'VRChatWorldInstance',
      list: [false],
    })
  },
})
