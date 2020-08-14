import { extendType, inputObjectType } from '@nexus/schema'
import { AuthenticationError } from 'apollo-server-errors'

import { DiscordOauthRequestRepository } from '~/db/repository/discord-oauth-request'
import { DiscordAccountRepository } from '~/db/repository/discord-account'

export const DiscordOauthMutationInput = inputObjectType({
  name: 'DiscordOauthMutationInput',
  definition (t) {
    t.string('accessToken')
    t.string('state')
    t.int('expiresIn')
  },
})

export const DiscordOauthMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('discordOauthCallback', {
      type: 'DiscordUser',
      args: {
        input: DiscordOauthMutationInput.asArg({ required: true }),
      },
      async resolve (root, args, context) {
        // Attempt to use the given state. If a state doesn't exist, it means
        // the user hasn't generated the state (usually happens while getting
        // the linking URL)
        await context.connection.getCustomRepository(DiscordOauthRequestRepository)
          .useState({
            state: args.input.state,
          })

        const discordUser = await context.discord.oauth2.getUser(args.input.accessToken)

        // If we get here, the access token can be trusted

        if (discordUser.bot) {
          throw new AuthenticationError('Bot accounts cannot be linked')
        }

        const user = context.authentication.getUser()

        await context.connection.getCustomRepository(DiscordAccountRepository)
          .upsert(context.authentication.getUser(), {
            user,
            accessToken: args.input.accessToken,
            expiresInSeconds: args.input.expiresIn,
          })

        return discordUser
      },
    })
  },
})
