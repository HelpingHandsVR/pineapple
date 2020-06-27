import { extendType, inputObjectType, objectType } from '@nexus/schema'
import { handleLoginTwoFactor, handleLoginBasic } from '../lib/vrc-login'

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
          return handleLoginTwoFactor(args, context)
        }

        return handleLoginBasic(args, context)
      },
    })
  },
})
