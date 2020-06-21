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

export type Query = {
  __typename?: 'Query';
  test: Scalars['String'];
  vrcViewer: VrChatExtendedUser;
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

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'test'>
);

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = (
  { __typename?: 'Query' }
  & { vrcViewer: (
    { __typename?: 'VRChatExtendedUser' }
    & Pick<VrChatExtendedUser, 'id' | 'displayName'>
  ) }
);


export const TestDocument = gql`
    query test {
  test
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a Vue component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTestQuery(
 *   {
 *   }
 * );
 */
export function useTestQuery(options: VueApolloComposable.UseQueryOptions<TestQuery, TestQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TestQuery, TestQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<TestQuery, TestQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<TestQuery, undefined>(TestDocument, undefined, options);
          }
export type TestQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<TestQuery, TestQueryVariables>;
export const ViewerDocument = gql`
    query viewer {
  vrcViewer {
    id
    displayName
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