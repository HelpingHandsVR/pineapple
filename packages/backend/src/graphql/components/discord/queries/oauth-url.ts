import { extendType } from '@nexus/schema'

import { DiscordOauthRequestRepository } from '~/db/repository/discord-oauth-request'

export const DiscordOauthURLQuery = extendType({
  type: 'Query',
  definition (t) {
    t.string('discordOauthURL', {
      async resolve (root, args, context) {
        const request = await context.connection.getCustomRepository(DiscordOauthRequestRepository)
          .createState(context.authentication.getUser())

        return context.discord.oauth2.generateAuthUrl({
          state: request.state,
          responseType: 'token',
          scope: [
            'identify',
            'guilds',
          ],
        })
      },
    })
  },
})
