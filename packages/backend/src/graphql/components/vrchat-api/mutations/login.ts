import { extendType, inputObjectType, objectType } from '@nexus/schema'
import cookie from 'cookie'
import { AuthenticationError } from 'apollo-server-errors'

export const VRChatLoginInput = inputObjectType({
  name: 'VRChatLoginInput',
  definition (t) {
    t.string('username', {
      required: false,
    })
    t.string('password', {
      required: false,
    })
    t.string('totp', {
      required: false,
    })
  },
})

export const VRChatLoginResult = objectType({
  name: 'VRChatLoginResult',
  definition (t) {
    t.boolean('complete')
    t.string('authCookie', {
      nullable: true,
    })
  },
})

export const VRChatLoginMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('vrcLogin', {
      type: 'VRChatLoginResult',
      args: {
        input: VRChatLoginInput.asArg({ required: true }),
      },
      async resolve (root, args, context) {
        // If we have a totp input it means that the user already logged in
        // using their username/password combo and the session is awaiting
        // escalation.
        if (args.input.totp) {
          const result = await context.dataSources.vrchat.verifyTotp(args.input.totp)

          if (!result.verified) {
            throw new AuthenticationError('Invalid two-factor authentication code')
          }

          return {
            complete: true,
            authCookie: null,
          }
        }

        const response = await context.dataSources.vrchat.login(args.input.username, args.input.password)

        const { auth } = cookie.parse(response.__headers.get('set-cookie'))

        if ('requiresTwoFactorAuth' in response) {
          return {
            complete: false,
            authCookie: auth,
          }
        }

        return {
          complete: true,
          user: response,
        }
      },
    })
  },
})
