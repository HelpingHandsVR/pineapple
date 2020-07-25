import { objectType, interfaceType, inputObjectType, enumType } from '@nexus/schema'

export const PaginationResultCursor = objectType({
  name: 'PaginationResultCursor',
  definition (t) {
    t.string('afterCursor', {
      nullable: true,
    })

    t.string('beforeCursor', {
      nullable: true,
    })
  },
})

export const PaginationInputOrder = enumType({
  name: 'PaginationInputOrder',
  members: [
    'ASC',
    'DESC',
  ],
})

export const PaginationInput = inputObjectType({
  name: 'PaginationInput',
  definition (t) {
    t.int('limit', {
      required: false,
      default: 15,
    })

    t.field('order', {
      type: 'PaginationInputOrder',
      required: false,
      default: 'ASC',
    })

    t.string('afterCursor', {
      required: false,
    })

    t.string('beforeCursor', {
      required: false,
    })
  },
})

export const PaginationResult = interfaceType({
  name: 'PaginationResult',
  definition (t) {
    // This is just for reusability, there will never be a situation where
    // a union pagination result type can be returned so we don't need to
    // create a discriminator here
    t.resolveType(() => null)

    t.field('cursor', {
      type: 'PaginationResultCursor',
    })
  },
})
