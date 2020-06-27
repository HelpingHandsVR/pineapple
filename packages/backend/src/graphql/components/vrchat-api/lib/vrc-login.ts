import { AuthenticationError } from 'apollo-server-errors'
import cookie from 'cookie'

import { NexusGenArgTypes, NexusGenFieldTypes } from '~/generated/types'
import { Context } from '~/graphql/context'
import { User, Role } from '~/entity'

type LoginArgs = NexusGenArgTypes['Mutation']['vrcLogin']
type LoginResult = NexusGenFieldTypes['VRChatLoginResult']

const onLoginComplete = async (userId: string): Promise<LoginResult> => {
  // Just in case we get a null user, we return 2FA required state to the user
  // so that the request can be made again or retried from the beginning.
  // Not sure if this is a good idea, but let's see how it works in practice.
  if (!userId) {
    return {
      complete: false,
      authCookie: null,
    }
  }

  // Upsert an entry into the User table to store the user -> vrcUser relation
  // to the VRChat API.
  const user = await User.findOne({
    where: {
      vrcUserID: userId,
    },
    select: ['id'],
  })

  if (!user) {
    const newUser = new User()

    newUser.vrcUserID = userId

    // When they first register, users are going to be students. This relies on
    // the assumption that such a role exists. A student role is seeded, but
    // this could be dynamic.
    newUser.role = Role.findOne({
      where: {
        name: 'student',
      },
    })

    await newUser.save()
  }

  // Login done, 2FA or not
  return {
    complete: true,
    authCookie: null,
  }
}

export const handleLoginTwoFactor = async (args: LoginArgs, context: Context): Promise<LoginResult> => {
  const result = await context.dataSources.vrchat.verifyTotp(args.input.totp)

  if (!result.verified) {
    throw new AuthenticationError('Invalid two-factor authentication code')
  }

  // getViewer has already been called on context creation, so the
  // results are memoized by the datasource. Auth changes here so we
  // need to clear the memoize store
  context.dataSources.vrchat.memoizedResults.clear()
  const response = await context.dataSources.vrchat.getViewer()

  // If the fresh query gives us a user, login was successful
  if ('id' in response) {
    return onLoginComplete(response.id)
  }

  throw new AuthenticationError('VRChat did not return your profile even though authentication was successful. Please try again.')
}

export const handleLoginBasic = async (args: LoginArgs, context: Context): Promise<LoginResult> => {
  const response = await context.dataSources.vrchat.login(args.input.username, args.input.password)
  const { auth } = cookie.parse(response.__headers.get('set-cookie'))

  // If this condition is true, it means that the session is created
  // (credentials were valid), but it needs to be upgraded as 2FA is on.
  if ('requiresTwoFactorAuth' in response) {
    return {
      complete: false,
      authCookie: auth,
    }
  }

  // No 2FA, we have the auth cookie
  return onLoginComplete(response.id)
}
