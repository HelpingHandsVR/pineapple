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

export type LoginInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  discordOauthCallback: DiscordUser;
  login: User;
  logout: Scalars['Boolean'];
  register: User;
};


export type MutationDiscordOauthCallbackArgs = {
  input: DiscordOauthMutationInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  discordOauthURL: Scalars['String'];
  viewer?: Maybe<Viewer>;
};

export type RegisterInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
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
  vrchat?: Maybe<VrChatUser>;
};

export type Viewer = {
  __typename?: 'Viewer';
  ability: Array<Maybe<Ability>>;
  user: User;
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

export type LoginFormLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginFormLoginMutation = (
  { __typename?: 'Mutation' }
  & { loginFormLogin: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type ProfileMenuLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type ProfileMenuLogoutMutation = (
  { __typename?: 'Mutation' }
  & { profileMenuLogout: Mutation['logout'] }
);

export type ProfileMenuViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileMenuViewerQuery = (
  { __typename?: 'Query' }
  & { profileMenuViewer?: Maybe<(
    { __typename?: 'Viewer' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'id' | 'name'>
      ), vrchat?: Maybe<(
        { __typename?: 'VRChatUser' }
        & Pick<VrChatUser, 'id' | 'displayName' | 'currentAvatarImageUrl' | 'currentAvatarThumbnailImageUrl' | 'role'>
      )> }
    ) }
  )> }
);

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

export type IndexPageViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexPageViewerQuery = (
  { __typename?: 'Query' }
  & { indexPageViewer?: Maybe<(
    { __typename?: 'Viewer' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { vrchat?: Maybe<(
        { __typename?: 'VRChatUser' }
        & Pick<VrChatUser, 'id' | 'displayName' | 'currentAvatarImageUrl' | 'currentAvatarThumbnailImageUrl' | 'role' | 'state' | 'statusDescription'>
      )>, discord?: Maybe<(
        { __typename?: 'DiscordAccount' }
        & Pick<DiscordAccount, 'id'>
        & { account: (
          { __typename?: 'DiscordUser' }
          & Pick<DiscordUser, 'id' | 'username' | 'discriminator'>
        ) }
      )> }
    ) }
  )> }
);

export type DiscordOauthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscordOauthUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'discordOauthURL'>
);


export const LoginFormLoginDocument = gql`
    mutation loginFormLogin($email: String!, $password: String!) {
  loginFormLogin: login(input: {email: $email, password: $password}) {
    id
  }
}
    `;

/**
 * __useLoginFormLoginMutation__
 *
 * To run a mutation, you first call `useLoginFormLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginFormLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginFormLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginFormLoginMutation(options: VueApolloComposable.UseMutationOptionsWithVariables<LoginFormLoginMutation, LoginFormLoginMutationVariables>) {
            return VueApolloComposable.useMutation<LoginFormLoginMutation, LoginFormLoginMutationVariables>(LoginFormLoginDocument, options);
          }
export type LoginFormLoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginFormLoginMutation, LoginFormLoginMutationVariables>;
export const ProfileMenuLogoutDocument = gql`
    mutation profileMenuLogout {
  profileMenuLogout: logout
}
    `;

/**
 * __useProfileMenuLogoutMutation__
 *
 * To run a mutation, you first call `useProfileMenuLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useProfileMenuLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useProfileMenuLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useProfileMenuLogoutMutation(options: VueApolloComposable.UseMutationOptionsNoVariables<ProfileMenuLogoutMutation, ProfileMenuLogoutMutationVariables> = {}) {
            return VueApolloComposable.useMutation<ProfileMenuLogoutMutation, ProfileMenuLogoutMutationVariables>(ProfileMenuLogoutDocument, options);
          }
export type ProfileMenuLogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ProfileMenuLogoutMutation, ProfileMenuLogoutMutationVariables>;
export const ProfileMenuViewerDocument = gql`
    query profileMenuViewer {
  profileMenuViewer: viewer {
    user {
      id
      role {
        id
        name
      }
      vrchat {
        id
        displayName
        currentAvatarImageUrl
        currentAvatarThumbnailImageUrl
        role
      }
    }
  }
}
    `;

/**
 * __useProfileMenuViewerQuery__
 *
 * To run a query within a Vue component, call `useProfileMenuViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileMenuViewerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useProfileMenuViewerQuery(
 *   {
 *   }
 * );
 */
export function useProfileMenuViewerQuery(options: VueApolloComposable.UseQueryOptions<ProfileMenuViewerQuery, ProfileMenuViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProfileMenuViewerQuery, ProfileMenuViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProfileMenuViewerQuery, ProfileMenuViewerQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<ProfileMenuViewerQuery, undefined>(ProfileMenuViewerDocument, undefined, options);
          }
export type ProfileMenuViewerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ProfileMenuViewerQuery, ProfileMenuViewerQueryVariables>;
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
export const IndexPageViewerDocument = gql`
    query indexPageViewer {
  indexPageViewer: viewer {
    user {
      id
      vrchat {
        id
        displayName
        currentAvatarImageUrl
        currentAvatarThumbnailImageUrl
        role
        state
        statusDescription
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
  }
}
    `;

/**
 * __useIndexPageViewerQuery__
 *
 * To run a query within a Vue component, call `useIndexPageViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexPageViewerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useIndexPageViewerQuery(
 *   {
 *   }
 * );
 */
export function useIndexPageViewerQuery(options: VueApolloComposable.UseQueryOptions<IndexPageViewerQuery, IndexPageViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IndexPageViewerQuery, IndexPageViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IndexPageViewerQuery, IndexPageViewerQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<IndexPageViewerQuery, undefined>(IndexPageViewerDocument, undefined, options);
          }
export type IndexPageViewerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IndexPageViewerQuery, IndexPageViewerQueryVariables>;
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