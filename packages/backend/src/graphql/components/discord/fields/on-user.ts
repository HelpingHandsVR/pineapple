import { extendType } from '@nexus/schema'
import { DiscordAccount } from '~/entity'

export const DiscordAccountOnUser = extendType({
  type: 'User',
  definition (t) {
    t.field('discord', {
      type: 'DiscordAccount',
      nullable: true,
      resolve (root) {
        return DiscordAccount.findOne({
          where: {
            user: root.id,
          },
        })
      },
    })
  },
})
