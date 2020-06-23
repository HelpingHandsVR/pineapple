import { extendType, inputObjectType, objectType } from '@nexus/schema'
import { randomBytes } from 'crypto'
import { AuthenticationError } from 'apollo-server-errors'
import { DateTime } from 'luxon'

import { DiscordAccount } from '~/entity/discord-account'
import { DiscordOauthRequest } from '~/entity/discord-oauth-request'
import { User } from '~/entity'

export const DiscordOauthURLQuery = extendType({
  type: 'Query',
  definition (t) {
    t.string('discordOauthURL', {
      async resolve (root, args, context) {
        const state = randomBytes(32).toString('hex')
        const request = new DiscordOauthRequest()

        request.state = state

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

export const DiscordOauthMutationInput = inputObjectType({
  name: 'DiscordOauthMutationInput',
  definition (t) {
    t.string('accessToken')
    t.string('state')
    t.int('expiresIn')
  },
})

export const DiscordUser = objectType({
  name: 'DiscordUser',
  definition (t) {
    t.id('id')
    t.string('avatar', {
      nullable: true,
    })
    t.string('username')
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
          throw new AuthenticationError('Invalid request state, please try again')
        }

        // This request is not "used up". To try again, the user will need to
        // re-request a new oauth URL
        await request.softRemove()

        const discordUser = await context.discord.oauth2.getUser(args.input.accessToken)

        // If we get here, the access token can be trusted

        if (discordUser.bot) {
          throw new AuthenticationError('Bot accounts cannot be linked')
        }

        const vrcUser = await context.dataSources.vrchat.getViewer()
        const user = await User.findOne({
          where: {
            vrcUserID: vrcUser.id,
          },
        })

        if (!user) {
          throw new AuthenticationError('User not found')
        }

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

          return discordUser
        }

        const newAccount = new DiscordAccount()

        newAccount.accessToken = args.input.accessToken
        newAccount.expiresAt = expiresAt
        account.user = Promise.resolve(user)

        await newAccount.save()

        return discordUser
      },
    })
  },
})
