import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ability = {
  __typename?: 'Ability';
  action: AbilityAction;
  subject?: Maybe<AbilitySubject>;
};

export enum AbilityAction {
  Attach = 'ATTACH',
  Create = 'CREATE',
  Delete = 'DELETE',
  Detach = 'DETACH',
  LogOut = 'LOG_OUT',
  LogOutOthers = 'LOG_OUT_OTHERS',
  Read = 'READ',
  SoftDelete = 'SOFT_DELETE',
  Update = 'UPDATE'
}

export enum AbilitySubject {
  DiscordAccountOthers = 'DISCORD_ACCOUNT_OTHERS',
  DiscordAccountSelf = 'DISCORD_ACCOUNT_SELF',
  DiscordOauthRequestSelf = 'DISCORD_OAUTH_REQUEST_SELF',
  LessonOthers = 'LESSON_OTHERS',
  LessonSelf = 'LESSON_SELF',
  PermissionSelf = 'PERMISSION_SELF',
  UserOthers = 'USER_OTHERS',
  UserSelf = 'USER_SELF'
}

export type DiscordAccount = {
  __typename?: 'DiscordAccount';
  account: DiscordUser;
  id: Scalars['ID'];
};

export type DiscordOauthMutationInput = {
  accessToken?: Maybe<Scalars['String']>;
  expiresIn?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
};

export type DiscordUser = {
  __typename?: 'DiscordUser';
  discriminator: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  discordOauthCallback: DiscordUser;
  vrcLogin: VrChatLoginResult;
  vrcLogout: VrChatLogoutMutationResult;
};


export type MutationDiscordOauthCallbackArgs = {
  input: DiscordOauthMutationInput;
};


export type MutationVrcLoginArgs = {
  input: VrChatLoginInput;
};

export type Query = {
  __typename?: 'Query';
  discordOauthURL: Scalars['String'];
  viewer?: Maybe<Viewer>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  discord?: Maybe<DiscordAccount>;
  id: Scalars['ID'];
  role: Role;
};

export type Viewer = {
  __typename?: 'Viewer';
  ability: Array<Maybe<Ability>>;
  user: User;
  vrchatUser: VrChatExtendedUser;
};

export type VrChatConfig = {
  __typename?: 'VRChatConfig';
  announcements: Array<Maybe<VrChatConfigAnnouncement>>;
  dynamicWorldRows: Array<Maybe<VrChatConfigDynamicWorldRow>>;
  messageOfTheDay: Scalars['String'];
};

export type VrChatConfigAnnouncement = {
  __typename?: 'VRChatConfigAnnouncement';
  name: Scalars['String'];
  text: Scalars['String'];
};

export type VrChatConfigDynamicWorldRow = {
  __typename?: 'VRChatConfigDynamicWorldRow';
  index: Scalars['Int'];
  name: Scalars['String'];
  platform: Scalars['String'];
  sortHeading: Scalars['String'];
  sortOrder: Scalars['String'];
  sortOwnership: Scalars['String'];
};

export type VrChatExtendedUser = VrChatUserBase & {
  __typename?: 'VRChatExtendedUser';
  activeFriends: Array<Maybe<Scalars['String']>>;
  allowAvatarCopying: Scalars['Boolean'];
  bio: Scalars['String'];
  bioLinks: Scalars['String'];
  currentAvatar: Scalars['String'];
  currentAvatarImageUrl: Scalars['String'];
  currentAvatarThumbnailImageUrl: Scalars['String'];
  displayName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFriend: Scalars['Boolean'];
  last_login: Scalars['String'];
  last_platform: Scalars['String'];
  obfuscatedEmail: Scalars['String'];
  offlineFriends: Array<Maybe<Scalars['String']>>;
  onlineFriends: Array<Maybe<Scalars['String']>>;
  role: VrChatUserRole;
  state: Scalars['String'];
  status: Scalars['String'];
  statusDescription: Scalars['String'];
  twoFactorAuthEnabled: Scalars['Boolean'];
  user?: Maybe<User>;
  username: Scalars['String'];
};

export type VrChatLoginInput = {
  password?: Maybe<Scalars['String']>;
  totp?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type VrChatLoginResult = {
  __typename?: 'VRChatLoginResult';
  authCookie?: Maybe<Scalars['String']>;
  complete: Scalars['Boolean'];
};

export type VrChatLogoutMutationResult = {
  __typename?: 'VRChatLogoutMutationResult';
  success: Scalars['Boolean'];
};

export type VrChatUser = VrChatUserBase & {
  __typename?: 'VRChatUser';
  allowAvatarCopying: Scalars['Boolean'];
  bio: Scalars['String'];
  bioLinks: Scalars['String'];
  currentAvatarImageUrl: Scalars['String'];
  currentAvatarThumbnailImageUrl: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['ID'];
  isFriend: Scalars['Boolean'];
  last_login: Scalars['String'];
  last_platform: Scalars['String'];
  location: Scalars['String'];
  role: VrChatUserRole;
  state: Scalars['String'];
  status: Scalars['String'];
  statusDescription: Scalars['String'];
  user?: Maybe<User>;
  username: Scalars['String'];
  worldId: Scalars['String'];
};

export type VrChatUserBase = {
  allowAvatarCopying: Scalars['Boolean'];
  bio: Scalars['String'];
  bioLinks: Scalars['String'];
  currentAvatarImageUrl: Scalars['String'];
  currentAvatarThumbnailImageUrl: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['ID'];
  isFriend: Scalars['Boolean'];
  last_login: Scalars['String'];
  last_platform: Scalars['String'];
  role: VrChatUserRole;
  state: Scalars['String'];
  status: Scalars['String'];
  statusDescription: Scalars['String'];
  username: Scalars['String'];
};

export enum VrChatUserRole {
  Known = 'KNOWN',
  NewUser = 'NEW_USER',
  Trusted = 'TRUSTED',
  User = 'USER',
  Visitor = 'VISITOR'
}

export type DiscordOauthCallbackMutationVariables = Exact<{
  accessToken: Scalars['String'];
  state: Scalars['String'];
  expiresIn: Scalars['Int'];
}>;


export type DiscordOauthCallbackMutation = (
  { __typename?: 'Mutation' }
  & { discordOauthCallback: (
    { __typename?: 'DiscordUser' }
    & Pick<DiscordUser, 'id'>
  ) }
);

export type VrcLoginMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type VrcLoginMutation = (
  { __typename?: 'Mutation' }
  & { vrcLogin: (
    { __typename?: 'VRChatLoginResult' }
    & Pick<VrChatLoginResult, 'complete' | 'authCookie'>
  ) }
);

export type VrcLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type VrcLogoutMutation = (
  { __typename?: 'Mutation' }
  & { vrcLogout: (
    { __typename?: 'VRChatLogoutMutationResult' }
    & Pick<VrChatLogoutMutationResult, 'success'>
  ) }
);

export type VrcLoginTotpMutationVariables = Exact<{
  code?: Maybe<Scalars['String']>;
}>;


export type VrcLoginTotpMutation = (
  { __typename?: 'Mutation' }
  & { vrcLogin: (
    { __typename?: 'VRChatLoginResult' }
    & Pick<VrChatLoginResult, 'complete' | 'authCookie'>
  ) }
);

export type DiscordOauthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscordOauthUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'discordOauthURL'>
);

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = (
  { __typename?: 'Query' }
  & { viewer?: Maybe<(
    { __typename?: 'Viewer' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'id' | 'name'>
      ), discord?: Maybe<(
        { __typename?: 'DiscordAccount' }
        & Pick<DiscordAccount, 'id'>
        & { account: (
          { __typename?: 'DiscordUser' }
          & Pick<DiscordUser, 'id' | 'username' | 'discriminator'>
        ) }
      )> }
    ), vrchatUser: (
      { __typename?: 'VRChatExtendedUser' }
      & Pick<VrChatExtendedUser, 'id' | 'displayName' | 'currentAvatarImageUrl' | 'currentAvatarThumbnailImageUrl' | 'role' | 'state' | 'statusDescription' | 'last_login' | 'twoFactorAuthEnabled'>
    ), ability: Array<Maybe<(
      { __typename?: 'Ability' }
      & Pick<Ability, 'action' | 'subject'>
    )>> }
  )> }
);


export const DiscordOauthCallbackDocument = gql`
    mutation discordOauthCallback($accessToken: String!, $state: String!, $expiresIn: Int!) {
  discordOauthCallback(input: {accessToken: $accessToken, state: $state, expiresIn: $expiresIn}) {
    id
  }
}
    `;

/**
 * __useDiscordOauthCallbackMutation__
 *
 * To run a mutation, you first call `useDiscordOauthCallbackMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDiscordOauthCallbackMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDiscordOauthCallbackMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      state: // value for 'state'
 *      expiresIn: // value for 'expiresIn'
 *   },
 * });
 */
export function useDiscordOauthCallbackMutation(options: VueApolloComposable.UseMutationOptionsWithVariables<DiscordOauthCallbackMutation, DiscordOauthCallbackMutationVariables>) {
            return VueApolloComposable.useMutation<DiscordOauthCallbackMutation, DiscordOauthCallbackMutationVariables>(DiscordOauthCallbackDocument, options);
          }
export type DiscordOauthCallbackMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DiscordOauthCallbackMutation, DiscordOauthCallbackMutationVariables>;
export const VrcLoginDocument = gql`
    mutation vrcLogin($username: String, $password: String) {
  vrcLogin(input: {username: $username, password: $password}) {
    complete
    authCookie
  }
}
    `;

/**
 * __useVrcLoginMutation__
 *
 * To run a mutation, you first call `useVrcLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVrcLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVrcLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useVrcLoginMutation(options: VueApolloComposable.UseMutationOptions<VrcLoginMutation, VrcLoginMutationVariables> = {}) {
            return VueApolloComposable.useMutation<VrcLoginMutation, VrcLoginMutationVariables>(VrcLoginDocument, options);
          }
export type VrcLoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<VrcLoginMutation, VrcLoginMutationVariables>;
export const VrcLogoutDocument = gql`
    mutation vrcLogout {
  vrcLogout {
    success
  }
}
    `;

/**
 * __useVrcLogoutMutation__
 *
 * To run a mutation, you first call `useVrcLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVrcLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVrcLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useVrcLogoutMutation(options: VueApolloComposable.UseMutationOptionsNoVariables<VrcLogoutMutation, VrcLogoutMutationVariables> = {}) {
            return VueApolloComposable.useMutation<VrcLogoutMutation, VrcLogoutMutationVariables>(VrcLogoutDocument, options);
          }
export type VrcLogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<VrcLogoutMutation, VrcLogoutMutationVariables>;
export const VrcLoginTotpDocument = gql`
    mutation vrcLoginTotp($code: String) {
  vrcLogin(input: {totp: $code}) {
    complete
    authCookie
  }
}
    `;

/**
 * __useVrcLoginTotpMutation__
 *
 * To run a mutation, you first call `useVrcLoginTotpMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVrcLoginTotpMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVrcLoginTotpMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVrcLoginTotpMutation(options: VueApolloComposable.UseMutationOptions<VrcLoginTotpMutation, VrcLoginTotpMutationVariables> = {}) {
            return VueApolloComposable.useMutation<VrcLoginTotpMutation, VrcLoginTotpMutationVariables>(VrcLoginTotpDocument, options);
          }
export type VrcLoginTotpMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<VrcLoginTotpMutation, VrcLoginTotpMutationVariables>;
export const DiscordOauthUrlDocument = gql`
    query discordOauthURL {
  discordOauthURL
}
    `;

/**
 * __useDiscordOauthUrlQuery__
 *
 * To run a query within a Vue component, call `useDiscordOauthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscordOauthUrlQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDiscordOauthUrlQuery(
 *   {
 *   }
 * );
 */
export function useDiscordOauthUrlQuery(options: VueApolloComposable.UseQueryOptions<DiscordOauthUrlQuery, DiscordOauthUrlQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<DiscordOauthUrlQuery, DiscordOauthUrlQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<DiscordOauthUrlQuery, DiscordOauthUrlQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<DiscordOauthUrlQuery, undefined>(DiscordOauthUrlDocument, undefined, options);
          }
export type DiscordOauthUrlQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<DiscordOauthUrlQuery, DiscordOauthUrlQueryVariables>;
export const ViewerDocument = gql`
    query viewer {
  viewer {
    user {
      id
      role {
        id
        name
      }
      discord {
        id
        account {
          id
          username
          discriminator
        }
      }
    }
    vrchatUser {
      id
      displayName
      currentAvatarImageUrl
      currentAvatarThumbnailImageUrl
      role
      state
      statusDescription
      last_login
      twoFactorAuthEnabled
    }
    ability {
      action
      subject
    }
  }
}
    `;

/**
 * __useViewerQuery__
 *
 * To run a query within a Vue component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useViewerQuery(
 *   {
 *   }
 * );
 */
export function useViewerQuery(options: VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<ViewerQuery, undefined>(ViewerDocument, undefined, options);
          }
export type ViewerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ViewerQuery, ViewerQueryVariables>;