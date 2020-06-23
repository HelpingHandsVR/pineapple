import { objectType } from '@nexus/schema'

export const DiscordUser = objectType({
  name: 'DiscordUser',
  definition (t) {
    t.id('id')
    t.string('username')
  },
})
