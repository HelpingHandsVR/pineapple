import { extendType } from '@nexus/schema'

export const DiscordAccountOnUser = extendType({
  type: 'User',
  definition (t) {
    t.field('discordAccount', {
      type: 'DiscordAccount',
      nullable: true,
    })
  },
})
