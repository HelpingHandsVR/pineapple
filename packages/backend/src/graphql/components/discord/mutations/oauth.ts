import { extendType, inputObjectType } from '@nexus/schema'
import { AuthenticationError } from 'apollo-server-errors'
import { DateTime } from 'luxon'

import { DiscordAccount, DiscordOauthRequest } from '~/entity'

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
        const request = await DiscordOauthRequest.findOne({
          where: {
            state: args.input.state,
          },
        })

        if (!request) {
          context.log.warn(args.input, 'invalid request state')

          throw new AuthenticationError('Invalid request state')
        }

        // This request is now "used up". To try again, the user will need to
        // re-request a new oauth URL
        await request.softRemove()

        const discordUser = await context.discord.oauth2.getUser(args.input.accessToken)

        // If we get here, the access token can be trusted

        if (discordUser.bot) {
          throw new AuthenticationError('Bot accounts cannot be linked')
        }

        const user = context.authentication.getUser()

        const expiresAt = DateTime
          .local()
          .plus({
            seconds: args.input.expiresIn,
          })
          .toJSDate()

        const account = await DiscordAccount.findOne({
          where: {
            accessToken: args.input.accessToken,
          },
        })

        if (account) {
          account.accessToken = args.input.accessToken
          account.expiresAt = expiresAt
          account.user = Promise.resolve(user)
          account.updatedBy = user.id

          return discordUser
        }

        const newAccount = new DiscordAccount()

        newAccount.accessToken = args.input.accessToken
        newAccount.expiresAt = expiresAt
        newAccount.user = Promise.resolve(user)
        newAccount.createdBy = user.id

        await newAccount.save()

        return discordUser
      },
    })
  },
})
