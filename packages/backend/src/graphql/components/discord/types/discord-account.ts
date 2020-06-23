import { objectType } from '@nexus/schema'

export const DiscordAccount = objectType({
  name: 'DiscordAccount',
  definition (t) {
    t.id('id')
  },
})
