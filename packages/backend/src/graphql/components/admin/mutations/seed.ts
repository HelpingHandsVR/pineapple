import { extendType } from '@nexus/schema'

export const SeedMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.boolean('seed', {
      async resolve (root, args, context) {
        // const seeds = Object.values(allSeeds).map((seeder) => seeder.default)

        // await Promise.all(seeds.map((Seeder) => {
        //   const seeder = new Seeder()

        //   return seeder.run(undefined, context.connection)
        // }))

        return true
      },
    })
  },
})
