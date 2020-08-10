import { extendType } from '@nexus/schema'
import { DiscordAccount } from '~/entity/discord-account'

export const DiscordAccountOnUser = extendType({
  type: 'User',
  definition (t) {
    t.field('discord', {
      type: 'DiscordAccount',
      nullable: true,
      resolve (root, args, context) {
        return context.connection.getRepository(DiscordAccount)
          .findOne({
            where: {
              user: root.id,
            },
          })
      },
    })
  },
})
