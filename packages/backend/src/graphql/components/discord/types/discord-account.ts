import { objectType } from '@nexus/schema'
import { DiscordAccount } from '~/entity'

export const DiscordAccountType = objectType({
  name: 'DiscordAccount',
  definition (t) {
    t.id('id')
    t.field('account', {
      type: 'DiscordUser',
      resolve (root: DiscordAccount, args, context) {
        return context.discord.oauth2.getUser(root.accessToken)
      },
    })
  },
})
