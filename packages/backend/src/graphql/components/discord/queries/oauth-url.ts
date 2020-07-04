import { randomBytes } from 'crypto'
import { extendType } from '@nexus/schema'
import { DiscordOauthRequest } from '~/entity'

export const DiscordOauthURLQuery = extendType({
  type: 'Query',
  definition (t) {
    t.string('discordOauthURL', {
      async resolve (root, args, context) {
        const state = randomBytes(32).toString('hex')
        const request = new DiscordOauthRequest()

        request.state = state
        request.createdBy = context.authentication.getUser().id

        await request.save()

        return context.discord.oauth2.generateAuthUrl({
          state,
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
