import { objectType } from '@nexus/schema'

export const DiscordAccountType = objectType({
  name: 'DiscordAccount',
  rootTyping: 'DiscordAccount.DiscordAccount',
  definition (t) {
    t.id('id')
    t.field('account', {
      type: 'DiscordUser',
      resolve (root, args, context) {
        return context.discord.oauth2.getUser(root.accessToken)
      },
    })
  },
})
