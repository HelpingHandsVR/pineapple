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
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /**
   * A field whose value conforms to the standard internet email address format as
   * specified in RFC822: https://www.w3.org/Protocols/rfc822/.
   */
  EmailAddress: any;
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
  AttendableOthers = 'ATTENDABLE_OTHERS',
  AttendableSelf = 'ATTENDABLE_SELF',
  AttendanceRecordOthers = 'ATTENDANCE_RECORD_OTHERS',
  AttendanceRecordSelf = 'ATTENDANCE_RECORD_SELF',
  DiscordAccountOthers = 'DISCORD_ACCOUNT_OTHERS',
  DiscordAccountSelf = 'DISCORD_ACCOUNT_SELF',
  DiscordOauthRequestSelf = 'DISCORD_OAUTH_REQUEST_SELF',
  LessonOthers = 'LESSON_OTHERS',
  LessonSelf = 'LESSON_SELF',
  PermissionSelf = 'PERMISSION_SELF',
  UserOthers = 'USER_OTHERS',
  UserSelf = 'USER_SELF'
}

export type Attendable = {
  __typename?: 'Attendable';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  endsAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  startsAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  world?: Maybe<VrChatWorld>;
};

export type AttendanceRecord = {
  __typename?: 'AttendanceRecord';
  attendable: Attendable;
  endsAt: Scalars['DateTime'];
  id: Scalars['ID'];
  startsAt: Scalars['DateTime'];
};

export type AttendanceRecordPagination = PaginationResult & {
  __typename?: 'AttendanceRecordPagination';
  cursor: PaginationResultCursor;
  data: Array<Maybe<AttendanceRecord>>;
};

export type CreateAttendaceRecordMutationInput = {
  attendableId: Scalars['ID'];
  endsAt?: Maybe<Scalars['DateTime']>;
  startsAt?: Maybe<Scalars['DateTime']>;
};


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
  upsertAttendanceRecord: AttendanceRecord;
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


export type MutationUpsertAttendanceRecordArgs = {
  input: CreateAttendaceRecordMutationInput;
};

export type PaginationInput = {
  afterCursor?: Maybe<Scalars['String']>;
  beforeCursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<PaginationInputOrder>;
};

export enum PaginationInputOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PaginationResult = {
  cursor: PaginationResultCursor;
};

export type PaginationResultCursor = {
  __typename?: 'PaginationResultCursor';
  afterCursor?: Maybe<Scalars['String']>;
  beforeCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  attendanceRecords: AttendanceRecordPagination;
  discordOauthURL: Scalars['String'];
  upcomingAttendables: Array<Maybe<Attendable>>;
  user?: Maybe<User>;
  viewer?: Maybe<Viewer>;
  vrchatUser: VrChatUser;
};


export type QueryAttendanceRecordsArgs = {
  pagination?: Maybe<PaginationInput>;
};


export type QueryUpcomingAttendablesArgs = {
  input: UpcomingAttendablesQueryInput;
};


export type QueryUserArgs = {
  where: UserQueryWhereInput;
};


export type QueryVrchatUserArgs = {
  where: VrChatUserQueryWhereInput;
};

export type RegisterInput = {
  display: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpcomingAttendablesQueryInput = {
  take?: Maybe<Scalars['Int']>;
};


export type User = {
  __typename?: 'User';
  discord?: Maybe<DiscordAccount>;
  display: Scalars['String'];
  id: Scalars['ID'];
  role: Role;
  vrchat?: Maybe<VrChatUser>;
};

export type UserQueryWhereInput = {
  id?: Maybe<Scalars['ID']>;
  vrcUserID?: Maybe<Scalars['ID']>;
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

/** User type, when the user has not sent a friend request to Pineapple */
export type VrChatLimitedUser = VrChatUserBase & {
  __typename?: 'VRChatLimitedUser';
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
  username: Scalars['String'];
};

export type VrChatUserQueryWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export enum VrChatUserRole {
  Known = 'KNOWN',
  NewUser = 'NEW_USER',
  Trusted = 'TRUSTED',
  User = 'USER',
  Visitor = 'VISITOR'
}

export type VrChatWorld = {
  __typename?: 'VRChatWorld';
  author?: Maybe<VrChatLimitedUser>;
  authorId: Scalars['ID'];
  authorName: Scalars['String'];
  capacity: Scalars['Int'];
  created_at: Scalars['DateTime'];
  description: Scalars['String'];
  favorites: Scalars['Int'];
  featured: Scalars['Boolean'];
  heat: Scalars['Int'];
  id: Scalars['ID'];
  imageUrl: Scalars['URL'];
  instances: Array<Maybe<VrChatWorldInstance>>;
  labsPublicationDate: Scalars['DateTime'];
  name: Scalars['String'];
  occupants: Scalars['Int'];
  organization: Scalars['String'];
  popularity: Scalars['Int'];
  privateOccupants: Scalars['Int'];
  publicationDate: Scalars['DateTime'];
  publicOccupants: Scalars['Int'];
  releaseStatus: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  thumbnailImageUrl: Scalars['URL'];
  updated_at: Scalars['DateTime'];
  version: Scalars['Int'];
  visits: Scalars['Int'];
};

export type VrChatWorldInstance = {
  __typename?: 'VRChatWorldInstance';
  id: Scalars['ID'];
  players: Scalars['Int'];
};

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
  & { viewer?: Maybe<(
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

export type DiscordLinkingCardQueryQueryVariables = Exact<{
  where: UserQueryWhereInput;
}>;


export type DiscordLinkingCardQueryQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { discord?: Maybe<(
      { __typename?: 'DiscordAccount' }
      & Pick<DiscordAccount, 'id'>
      & { account: (
        { __typename?: 'DiscordUser' }
        & Pick<DiscordUser, 'id' | 'username' | 'discriminator'>
      ) }
    )> }
  )> }
);

export type DiscordOauthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscordOauthUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'discordOauthURL'>
);

export type ProfileCardQueryQueryVariables = Exact<{
  vrcWhere: VrChatUserQueryWhereInput;
  where: UserQueryWhereInput;
}>;


export type ProfileCardQueryQuery = (
  { __typename?: 'Query' }
  & { vrchatUser: (
    { __typename?: 'VRChatUser' }
    & Pick<VrChatUser, 'id' | 'displayName' | 'statusDescription' | 'currentAvatarImageUrl' | 'currentAvatarThumbnailImageUrl' | 'role' | 'last_login'>
  ), user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { role: (
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name'>
    ) }
  )> }
);

export type IndexPageViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexPageViewerQuery = (
  { __typename?: 'Query' }
  & { viewer?: Maybe<(
    { __typename?: 'Viewer' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { vrchat?: Maybe<(
        { __typename?: 'VRChatUser' }
        & Pick<VrChatUser, 'id'>
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
  viewer {
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
export const DiscordLinkingCardQueryDocument = gql`
    query discordLinkingCardQuery($where: UserQueryWhereInput!) {
  user(where: $where) {
    id
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
    `;

/**
 * __useDiscordLinkingCardQueryQuery__
 *
 * To run a query within a Vue component, call `useDiscordLinkingCardQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscordLinkingCardQueryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDiscordLinkingCardQueryQuery(
 *   {
 *      where: // value for 'where'
 *   }
 * );
 */
export function useDiscordLinkingCardQueryQuery(variables: DiscordLinkingCardQueryQueryVariables | VueCompositionApi.Ref<DiscordLinkingCardQueryQueryVariables> | ReactiveFunction<DiscordLinkingCardQueryQueryVariables>, options: VueApolloComposable.UseQueryOptions<DiscordLinkingCardQueryQuery, DiscordLinkingCardQueryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<DiscordLinkingCardQueryQuery, DiscordLinkingCardQueryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<DiscordLinkingCardQueryQuery, DiscordLinkingCardQueryQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<DiscordLinkingCardQueryQuery, DiscordLinkingCardQueryQueryVariables>(DiscordLinkingCardQueryDocument, variables, options);
          }
export type DiscordLinkingCardQueryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<DiscordLinkingCardQueryQuery, DiscordLinkingCardQueryQueryVariables>;
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
export const ProfileCardQueryDocument = gql`
    query profileCardQuery($vrcWhere: VRChatUserQueryWhereInput!, $where: UserQueryWhereInput!) {
  vrchatUser(where: $vrcWhere) {
    id
    displayName
    statusDescription
    currentAvatarImageUrl
    currentAvatarThumbnailImageUrl
    role
    last_login
  }
  user(where: $where) {
    id
    role {
      id
      name
    }
  }
}
    `;

/**
 * __useProfileCardQueryQuery__
 *
 * To run a query within a Vue component, call `useProfileCardQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileCardQueryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useProfileCardQueryQuery(
 *   {
 *      vrcWhere: // value for 'vrcWhere'
 *      where: // value for 'where'
 *   }
 * );
 */
export function useProfileCardQueryQuery(variables: ProfileCardQueryQueryVariables | VueCompositionApi.Ref<ProfileCardQueryQueryVariables> | ReactiveFunction<ProfileCardQueryQueryVariables>, options: VueApolloComposable.UseQueryOptions<ProfileCardQueryQuery, ProfileCardQueryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProfileCardQueryQuery, ProfileCardQueryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProfileCardQueryQuery, ProfileCardQueryQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<ProfileCardQueryQuery, ProfileCardQueryQueryVariables>(ProfileCardQueryDocument, variables, options);
          }
export type ProfileCardQueryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ProfileCardQueryQuery, ProfileCardQueryQueryVariables>;
export const IndexPageViewerDocument = gql`
    query indexPageViewer {
  viewer {
    user {
      id
      vrchat {
        id
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