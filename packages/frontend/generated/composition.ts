import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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
  action: Array<Maybe<AbilityAction>>;
  subject?: Maybe<Array<Maybe<AbilitySubject>>>;
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
  SystemPermission = 'SYSTEM_PERMISSION',
  SystemQueue = 'SYSTEM_QUEUE',
  SystemRole = 'SYSTEM_ROLE',
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

export type AttendablePagination = PaginationResult & {
  __typename?: 'AttendablePagination';
  cursor: PaginationResultCursor;
  data: Array<Maybe<Attendable>>;
};

export type AttendableQueryWhereInput = {
  id: Scalars['ID'];
};

export type AttendablesQuerySearchInput = {
  name: Scalars['String'];
};

export type AttendablesQueryWhereInput = {
  endsAt?: Maybe<AttendablesQueryWhereInputDateConstraint>;
  startsAt?: Maybe<AttendablesQueryWhereInputDateConstraint>;
};

export type AttendablesQueryWhereInputDateConstraint = {
  after?: Maybe<Scalars['DateTime']>;
  before?: Maybe<Scalars['DateTime']>;
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

export type AttendanceRecordsSubscriptionWhereInput = {
  records: Array<Scalars['ID']>;
};

export type CreateRoleMutationInput = {
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
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
  createRole: Role;
  discordOauthCallback: DiscordUser;
  login: User;
  logout: Scalars['Boolean'];
  register: User;
  seed: Scalars['Boolean'];
  updateRole: Role;
  upsertAttendanceRecord: AttendanceRecord;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleMutationInput;
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


export type MutationUpdateRoleArgs = {
  input: UpdateRoleMutationInput;
  where: UpdateRoleMutationWhereInput;
};


export type MutationUpsertAttendanceRecordArgs = {
  input: UpsertAttendaceRecordMutationInput;
};

export type PaginationInput = {
  afterCursor?: Maybe<Scalars['String']>;
  beforeCursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<PaginationInputOrder>;
  orderBy?: Maybe<Scalars['String']>;
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
  attendable?: Maybe<Attendable>;
  attendables: AttendablePagination;
  attendanceRecords: AttendanceRecordPagination;
  discordOauthURL: Scalars['String'];
  role?: Maybe<Role>;
  roles: RolePagination;
  /** @deprecated Use the "attendables" query */
  upcomingAttendables: Array<Maybe<Attendable>>;
  user?: Maybe<User>;
  viewer?: Maybe<Viewer>;
  vrchatUser: VrChatUser;
};


export type QueryAttendableArgs = {
  where?: Maybe<AttendableQueryWhereInput>;
};


export type QueryAttendablesArgs = {
  pagination?: Maybe<PaginationInput>;
  search?: Maybe<AttendablesQuerySearchInput>;
  where?: Maybe<AttendablesQueryWhereInput>;
};


export type QueryAttendanceRecordsArgs = {
  pagination?: Maybe<PaginationInput>;
};


export type QueryRoleArgs = {
  where: RoleQueryWhereInput;
};


export type QueryRolesArgs = {
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
  ability: Array<Maybe<Ability>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type RolePagination = PaginationResult & {
  __typename?: 'RolePagination';
  cursor: PaginationResultCursor;
  data: Array<Maybe<Role>>;
};

export type RoleQueryWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  attendanceRecordCreate: AttendanceRecord;
  attendanceRecordRemove: Scalars['String'];
  attendanceRecordUpdate: AttendanceRecord;
};


export type SubscriptionAttendanceRecordRemoveArgs = {
  where: AttendanceRecordsSubscriptionWhereInput;
};


export type SubscriptionAttendanceRecordUpdateArgs = {
  where: AttendanceRecordsSubscriptionWhereInput;
};

export type UpcomingAttendablesQueryInput = {
  take?: Maybe<Scalars['Int']>;
};

export type UpdateRoleMutationInput = {
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UpdateRoleMutationWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type UpsertAttendaceRecordMutationInput = {
  attendableId: Scalars['ID'];
  endsAt?: Maybe<Scalars['DateTime']>;
  startsAt?: Maybe<Scalars['DateTime']>;
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

export type AttendanceUpsertFormAttendablesQueryVariables = Exact<{
  pagination: PaginationInput;
  where: AttendablesQueryWhereInput;
  search: Scalars['String'];
}>;


export type AttendanceUpsertFormAttendablesQuery = (
  { __typename?: 'Query' }
  & { attendables: (
    { __typename?: 'AttendablePagination' }
    & { data: Array<Maybe<(
      { __typename?: 'Attendable' }
      & Pick<Attendable, 'id' | 'startsAt' | 'endsAt'>
      & { value: Attendable['id'], text: Attendable['name'] }
    )>> }
  ) }
);

export type AttendanceUpsertFormAttendableQueryVariables = Exact<{
  where: AttendableQueryWhereInput;
}>;


export type AttendanceUpsertFormAttendableQuery = (
  { __typename?: 'Query' }
  & { attendable?: Maybe<(
    { __typename?: 'Attendable' }
    & Pick<Attendable, 'id' | 'startsAt' | 'endsAt'>
  )> }
);

export type AttendanceUpsertFormSubmitMutationVariables = Exact<{
  input: UpsertAttendaceRecordMutationInput;
}>;


export type AttendanceUpsertFormSubmitMutation = (
  { __typename?: 'Mutation' }
  & { upsertAttendanceRecord: (
    { __typename?: 'AttendanceRecord' }
    & Pick<AttendanceRecord, 'id' | 'startsAt' | 'endsAt'>
  ) }
);

export type LoginFormLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginFormLoginMutation = (
  { __typename?: 'Mutation' }
  & { loginFormLogin: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { role: (
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name'>
      & { ability: Array<Maybe<(
        { __typename?: 'Ability' }
        & Pick<Ability, 'action' | 'subject'>
      )>> }
    ) }
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
      & Pick<User, 'id' | 'display'>
      & { role: (
        { __typename?: 'Role' }
        & Pick<Role, 'id' | 'name'>
        & { ability: Array<Maybe<(
          { __typename?: 'Ability' }
          & Pick<Ability, 'action' | 'subject'>
        )>> }
      ) }
    ) }
  )> }
);

export type RegisterFormRegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterFormRegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerFormRegister: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'display'>
    & { role: (
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name'>
    ) }
  ) }
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

export type AttendancePageAttendanceRecordsQueryVariables = Exact<{
  pagination: PaginationInput;
}>;


export type AttendancePageAttendanceRecordsQuery = (
  { __typename?: 'Query' }
  & { attendanceRecords: (
    { __typename?: 'AttendanceRecordPagination' }
    & { cursor: (
      { __typename?: 'PaginationResultCursor' }
      & Pick<PaginationResultCursor, 'afterCursor' | 'beforeCursor'>
    ), data: Array<Maybe<(
      { __typename?: 'AttendanceRecord' }
      & Pick<AttendanceRecord, 'id' | 'startsAt' | 'endsAt'>
      & { attendable: (
        { __typename?: 'Attendable' }
        & Pick<Attendable, 'id' | 'name'>
      ) }
    )>> }
  ) }
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


export const AttendanceUpsertFormAttendablesDocument = gql`
    query attendanceUpsertFormAttendables($pagination: PaginationInput!, $where: AttendablesQueryWhereInput!, $search: String!) {
  attendables(pagination: $pagination, where: $where, search: {name: $search}) {
    data {
      id
      value: id
      text: name
      startsAt
      endsAt
    }
  }
}
    `;
export const AttendanceUpsertFormAttendableDocument = gql`
    query attendanceUpsertFormAttendable($where: AttendableQueryWhereInput!) {
  attendable(where: $where) {
    id
    startsAt
    endsAt
  }
}
    `;
export const AttendanceUpsertFormSubmitDocument = gql`
    mutation attendanceUpsertFormSubmit($input: UpsertAttendaceRecordMutationInput!) {
  upsertAttendanceRecord(input: $input) {
    id
    startsAt
    endsAt
  }
}
    `;
export const LoginFormLoginDocument = gql`
    mutation loginFormLogin($email: String!, $password: String!) {
  loginFormLogin: login(input: {email: $email, password: $password}) {
    id
    role {
      id
      name
      ability {
        action
        subject
      }
    }
  }
}
    `;
export const ProfileMenuLogoutDocument = gql`
    mutation profileMenuLogout {
  profileMenuLogout: logout
}
    `;
export const ProfileMenuViewerDocument = gql`
    query profileMenuViewer {
  viewer {
    user {
      id
      display
      role {
        id
        name
        ability {
          action
          subject
        }
      }
    }
  }
}
    `;
export const RegisterFormRegisterDocument = gql`
    mutation registerFormRegister($input: RegisterInput!) {
  registerFormRegister: register(input: $input) {
    id
    display
    role {
      id
      name
    }
  }
}
    `;
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
export const DiscordOauthUrlDocument = gql`
    query discordOauthURL {
  discordOauthURL
}
    `;
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
export const AttendancePageAttendanceRecordsDocument = gql`
    query attendancePageAttendanceRecords($pagination: PaginationInput!) {
  attendanceRecords(pagination: $pagination) {
    cursor {
      afterCursor
      beforeCursor
    }
    data {
      id
      startsAt
      endsAt
      attendable {
        id
        name
      }
    }
  }
}
    `;
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
export const DiscordOauthCallbackDocument = gql`
    mutation discordOauthCallback($accessToken: String!, $state: String!, $expiresIn: Int!) {
  discordOauthCallback(input: {accessToken: $accessToken, state: $state, expiresIn: $expiresIn}) {
    id
  }
}
    `;