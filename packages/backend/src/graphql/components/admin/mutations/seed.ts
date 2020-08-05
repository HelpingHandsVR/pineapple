import { extendType } from '@nexus/schema'

import * as allSeeds from '../../../../db/all-seeds'

export const SeedMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('seed', {
      type: 'String',
      async resolve (root, args, context) {
        const seeds = Object.values(allSeeds).map((seeder) => seeder.default)
        const seedsResult = await Promise.all(seeds.map((Seeder) => {
          const seeder = new Seeder()

          return seeder.run(undefined, context.connection)
        }))

        console.log(seedsResult)

        return 'console'
      },
    })
  },
})
