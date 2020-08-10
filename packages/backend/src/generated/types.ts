import * as entity from '../entity'
import * as ctx from "../graphql/context/index"
import { core } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "DateTime";
    email<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "EmailAddress";
    url<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "URL";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    email<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "EmailAddress";
    url<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "URL";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AttendableQueryWhereInput: { // input type
    id: string; // ID!
  }
  AttendablesQuerySearchInput: { // input type
    name: string; // String!
  }
  AttendablesQueryWhereInput: { // input type
    endsAt?: NexusGenInputs['AttendablesQueryWhereInputDateConstraint'] | null; // AttendablesQueryWhereInputDateConstraint
    startsAt?: NexusGenInputs['AttendablesQueryWhereInputDateConstraint'] | null; // AttendablesQueryWhereInputDateConstraint
  }
  AttendablesQueryWhereInputDateConstraint: { // input type
    after?: any | null; // DateTime
    before?: any | null; // DateTime
  }
  CreateRoleMutationInput: { // input type
    name?: string | null; // String
    permissions?: Array<string | null> | null; // [ID]
  }
  DiscordOauthMutationInput: { // input type
    accessToken?: string | null; // String
    expiresIn?: number | null; // Int
    state?: string | null; // String
  }
  LoginInput: { // input type
    email?: string | null; // String
    password?: string | null; // String
  }
  PaginationInput: { // input type
    afterCursor?: string | null; // String
    beforeCursor?: string | null; // String
    limit?: number | null; // Int
    order?: NexusGenEnums['PaginationInputOrder'] | null; // PaginationInputOrder
    orderBy?: string | null; // String
  }
  RegisterInput: { // input type
    display: string; // String!
    email: string; // String!
    password: string; // String!
  }
  RoleQueryWhereInput: { // input type
    id?: string | null; // ID
  }
  UpcomingAttendablesQueryInput: { // input type
    take?: number | null; // Int
  }
  UpdateRoleMutationInput: { // input type
    name?: string | null; // String
    permissions?: Array<string | null> | null; // [ID]
  }
  UpdateRoleMutationWhereInput: { // input type
    id?: string | null; // ID
  }
  UpsertAttendaceRecordMutationInput: { // input type
    attendableId: string; // ID!
    endsAt?: any | null; // DateTime
    startsAt?: any | null; // DateTime
  }
  UserQueryWhereInput: { // input type
    id?: string | null; // ID
    vrcUserID?: string | null; // ID
  }
  VRChatUserQueryWhereInput: { // input type
    id?: string | null; // ID
  }
}

export interface NexusGenEnums {
  AbilityAction: 7 | 0 | 4 | 8 | 5 | 6 | 1 | 3 | 2
  AbilitySubject: 11 | 10 | 9 | 8 | 5 | 4 | 6 | 3 | 2 | 7 | 14 | 12 | 13 | 1 | 0
  PaginationInputOrder: "ASC" | "DESC"
  VRChatUserRole: 3 | 1 | 4 | 2 | 0
}

export interface NexusGenRootTypes {
  Ability: any;
  Attendable: entity.Attendable;
  AttendablePagination: { // root type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
    data: Array<NexusGenRootTypes['Attendable'] | null>; // [Attendable]!
  }
  AttendanceRecord: entity.AttendanceRecord;
  AttendanceRecordPagination: { // root type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
    data: Array<NexusGenRootTypes['AttendanceRecord'] | null>; // [AttendanceRecord]!
  }
  DiscordAccount: { // root type
    id: string; // ID!
  }
  DiscordUser: { // root type
    discriminator: string; // String!
    id: string; // ID!
    username: string; // String!
  }
  Mutation: {};
  PaginationResultCursor: { // root type
    afterCursor?: string | null; // String
    beforeCursor?: string | null; // String
  }
  Permission: entity.Permission;
  PermissionPagination: { // root type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
    data: Array<NexusGenRootTypes['Permission'] | null>; // [Permission]!
  }
  Query: {};
  Role: { // root type
    id: string; // ID!
    name: string; // String!
  }
  RolePagination: { // root type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
    data: Array<NexusGenRootTypes['Role'] | null>; // [Role]!
  }
  User: { // root type
    display: string; // String!
    id: string; // ID!
  }
  VRChatConfig: { // root type
    announcements: Array<NexusGenRootTypes['VRChatConfigAnnouncement'] | null>; // [VRChatConfigAnnouncement]!
    dynamicWorldRows: Array<NexusGenRootTypes['VRChatConfigDynamicWorldRow'] | null>; // [VRChatConfigDynamicWorldRow]!
    messageOfTheDay: string; // String!
  }
  VRChatConfigAnnouncement: { // root type
    name: string; // String!
    text: string; // String!
  }
  VRChatConfigDynamicWorldRow: { // root type
    index: number; // Int!
    name: string; // String!
    platform: string; // String!
    sortHeading: string; // String!
    sortOrder: string; // String!
    sortOwnership: string; // String!
  }
  VRChatExtendedUser: { // root type
    activeFriends: Array<string | null>; // [String]!
    allowAvatarCopying: boolean; // Boolean!
    bio: string; // String!
    bioLinks: string; // String!
    currentAvatar: string; // String!
    currentAvatarImageUrl: string; // String!
    currentAvatarThumbnailImageUrl: string; // String!
    displayName: string; // String!
    email?: string | null; // String
    id: string; // ID!
    isFriend: boolean; // Boolean!
    last_login: string; // String!
    last_platform: string; // String!
    obfuscatedEmail: string; // String!
    offlineFriends: Array<string | null>; // [String]!
    onlineFriends: Array<string | null>; // [String]!
    state: string; // String!
    status: string; // String!
    statusDescription: string; // String!
    twoFactorAuthEnabled: boolean; // Boolean!
    username: string; // String!
  }
  VRChatLimitedUser: { // root type
    allowAvatarCopying: boolean; // Boolean!
    bio: string; // String!
    bioLinks: string; // String!
    currentAvatarImageUrl: string; // String!
    currentAvatarThumbnailImageUrl: string; // String!
    displayName: string; // String!
    id: string; // ID!
    isFriend: boolean; // Boolean!
    last_login: string; // String!
    last_platform: string; // String!
    username: string; // String!
  }
  VRChatUser: { // root type
    allowAvatarCopying: boolean; // Boolean!
    bio: string; // String!
    bioLinks: string; // String!
    currentAvatarImageUrl: string; // String!
    currentAvatarThumbnailImageUrl: string; // String!
    displayName: string; // String!
    id: string; // ID!
    isFriend: boolean; // Boolean!
    last_login: string; // String!
    last_platform: string; // String!
    location: string; // String!
    state: string; // String!
    status: string; // String!
    statusDescription: string; // String!
    username: string; // String!
    worldId: string; // String!
  }
  VRChatWorld: { // root type
    authorId: string; // ID!
    authorName: string; // String!
    capacity: number; // Int!
    created_at: any; // DateTime!
    description: string; // String!
    favorites: number; // Int!
    featured: boolean; // Boolean!
    heat: number; // Int!
    id: string; // ID!
    imageUrl: any; // URL!
    instances: Array<NexusGenRootTypes['VRChatWorldInstance'] | null>; // [VRChatWorldInstance]!
    labsPublicationDate: any; // DateTime!
    name: string; // String!
    occupants: number; // Int!
    organization: string; // String!
    popularity: number; // Int!
    privateOccupants: number; // Int!
    publicationDate: any; // DateTime!
    publicOccupants: number; // Int!
    releaseStatus: string; // String!
    tags: Array<string | null>; // [String]!
    thumbnailImageUrl: any; // URL!
    updated_at: any; // DateTime!
    version: number; // Int!
    visits: number; // Int!
  }
  VRChatWorldInstance: {};
  Viewer: { // root type
    ability: Array<NexusGenRootTypes['Ability'] | null>; // [Ability]!
    user: NexusGenRootTypes['User']; // User!
  }
  PaginationResult: NexusGenRootTypes['AttendablePagination'] | NexusGenRootTypes['AttendanceRecordPagination'] | NexusGenRootTypes['PermissionPagination'] | NexusGenRootTypes['RolePagination'];
  VRChatUserBase: NexusGenRootTypes['VRChatUser'] | NexusGenRootTypes['VRChatLimitedUser'] | NexusGenRootTypes['VRChatExtendedUser'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
  EmailAddress: any;
  URL: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  AttendableQueryWhereInput: NexusGenInputs['AttendableQueryWhereInput'];
  AttendablesQuerySearchInput: NexusGenInputs['AttendablesQuerySearchInput'];
  AttendablesQueryWhereInput: NexusGenInputs['AttendablesQueryWhereInput'];
  AttendablesQueryWhereInputDateConstraint: NexusGenInputs['AttendablesQueryWhereInputDateConstraint'];
  CreateRoleMutationInput: NexusGenInputs['CreateRoleMutationInput'];
  DiscordOauthMutationInput: NexusGenInputs['DiscordOauthMutationInput'];
  LoginInput: NexusGenInputs['LoginInput'];
  PaginationInput: NexusGenInputs['PaginationInput'];
  RegisterInput: NexusGenInputs['RegisterInput'];
  RoleQueryWhereInput: NexusGenInputs['RoleQueryWhereInput'];
  UpcomingAttendablesQueryInput: NexusGenInputs['UpcomingAttendablesQueryInput'];
  UpdateRoleMutationInput: NexusGenInputs['UpdateRoleMutationInput'];
  UpdateRoleMutationWhereInput: NexusGenInputs['UpdateRoleMutationWhereInput'];
  UpsertAttendaceRecordMutationInput: NexusGenInputs['UpsertAttendaceRecordMutationInput'];
  UserQueryWhereInput: NexusGenInputs['UserQueryWhereInput'];
  VRChatUserQueryWhereInput: NexusGenInputs['VRChatUserQueryWhereInput'];
  AbilityAction: NexusGenEnums['AbilityAction'];
  AbilitySubject: NexusGenEnums['AbilitySubject'];
  PaginationInputOrder: NexusGenEnums['PaginationInputOrder'];
  VRChatUserRole: NexusGenEnums['VRChatUserRole'];
}

export interface NexusGenFieldTypes {
  Ability: { // field return type
    action: NexusGenEnums['AbilityAction']; // AbilityAction!
    subject: NexusGenEnums['AbilitySubject'] | null; // AbilitySubject
  }
  Attendable: { // field return type
    createdAt: any; // DateTime!
    createdBy: NexusGenRootTypes['User']; // User!
    endsAt: any; // DateTime!
    id: string; // ID!
    name: string; // String!
    startsAt: any; // DateTime!
    updatedAt: any; // DateTime!
    updatedBy: NexusGenRootTypes['User']; // User!
    world: NexusGenRootTypes['VRChatWorld'] | null; // VRChatWorld
  }
  AttendablePagination: { // field return type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
    data: Array<NexusGenRootTypes['Attendable'] | null>; // [Attendable]!
  }
  AttendanceRecord: { // field return type
    attendable: NexusGenRootTypes['Attendable']; // Attendable!
    endsAt: any; // DateTime!
    id: string; // ID!
    startsAt: any; // DateTime!
  }
  AttendanceRecordPagination: { // field return type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
    data: Array<NexusGenRootTypes['AttendanceRecord'] | null>; // [AttendanceRecord]!
  }
  DiscordAccount: { // field return type
    account: NexusGenRootTypes['DiscordUser']; // DiscordUser!
    id: string; // ID!
  }
  DiscordUser: { // field return type
    discriminator: string; // String!
    id: string; // ID!
    username: string; // String!
  }
  Mutation: { // field return type
    createRole: NexusGenRootTypes['Role']; // Role!
    discordOauthCallback: NexusGenRootTypes['DiscordUser']; // DiscordUser!
    login: NexusGenRootTypes['User']; // User!
    logout: boolean; // Boolean!
    register: NexusGenRootTypes['User']; // User!
    seed: boolean; // Boolean!
    updateRole: NexusGenRootTypes['Role']; // Role!
    upsertAttendanceRecord: NexusGenRootTypes['AttendanceRecord']; // AttendanceRecord!
  }
  PaginationResultCursor: { // field return type
    afterCursor: string | null; // String
    beforeCursor: string | null; // String
  }
  Permission: { // field return type
    action: NexusGenEnums['AbilityAction']; // AbilityAction!
    id: string; // ID!
    name: string; // String!
    subject: NexusGenEnums['AbilitySubject']; // AbilitySubject!
  }
  PermissionPagination: { // field return type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
    data: Array<NexusGenRootTypes['Permission'] | null>; // [Permission]!
  }
  Query: { // field return type
    attendable: NexusGenRootTypes['Attendable'] | null; // Attendable
    attendables: NexusGenRootTypes['AttendablePagination']; // AttendablePagination!
    attendanceRecords: NexusGenRootTypes['AttendanceRecordPagination']; // AttendanceRecordPagination!
    discordOauthURL: string; // String!
    permissions: NexusGenRootTypes['PermissionPagination']; // PermissionPagination!
    role: NexusGenRootTypes['Role'] | null; // Role
    roles: NexusGenRootTypes['RolePagination']; // RolePagination!
    upcomingAttendables: Array<NexusGenRootTypes['Attendable'] | null>; // [Attendable]!
    user: NexusGenRootTypes['User'] | null; // User
    viewer: NexusGenRootTypes['Viewer'] | null; // Viewer
    vrchatUser: NexusGenRootTypes['VRChatUser']; // VRChatUser!
  }
  Role: { // field return type
    ability: Array<NexusGenRootTypes['Ability'] | null>; // [Ability]!
    id: string; // ID!
    name: string; // String!
  }
  RolePagination: { // field return type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
    data: Array<NexusGenRootTypes['Role'] | null>; // [Role]!
  }
  User: { // field return type
    discord: NexusGenRootTypes['DiscordAccount'] | null; // DiscordAccount
    display: string; // String!
    id: string; // ID!
    role: NexusGenRootTypes['Role']; // Role!
    vrchat: NexusGenRootTypes['VRChatUser'] | null; // VRChatUser
  }
  VRChatConfig: { // field return type
    announcements: Array<NexusGenRootTypes['VRChatConfigAnnouncement'] | null>; // [VRChatConfigAnnouncement]!
    dynamicWorldRows: Array<NexusGenRootTypes['VRChatConfigDynamicWorldRow'] | null>; // [VRChatConfigDynamicWorldRow]!
    messageOfTheDay: string; // String!
  }
  VRChatConfigAnnouncement: { // field return type
    name: string; // String!
    text: string; // String!
  }
  VRChatConfigDynamicWorldRow: { // field return type
    index: number; // Int!
    name: string; // String!
    platform: string; // String!
    sortHeading: string; // String!
    sortOrder: string; // String!
    sortOwnership: string; // String!
  }
  VRChatExtendedUser: { // field return type
    activeFriends: Array<string | null>; // [String]!
    allowAvatarCopying: boolean; // Boolean!
    bio: string; // String!
    bioLinks: string; // String!
    currentAvatar: string; // String!
    currentAvatarImageUrl: string; // String!
    currentAvatarThumbnailImageUrl: string; // String!
    displayName: string; // String!
    email: string | null; // String
    id: string; // ID!
    isFriend: boolean; // Boolean!
    last_login: string; // String!
    last_platform: string; // String!
    obfuscatedEmail: string; // String!
    offlineFriends: Array<string | null>; // [String]!
    onlineFriends: Array<string | null>; // [String]!
    role: NexusGenEnums['VRChatUserRole']; // VRChatUserRole!
    state: string; // String!
    status: string; // String!
    statusDescription: string; // String!
    twoFactorAuthEnabled: boolean; // Boolean!
    user: NexusGenRootTypes['User'] | null; // User
    username: string; // String!
  }
  VRChatLimitedUser: { // field return type
    allowAvatarCopying: boolean; // Boolean!
    bio: string; // String!
    bioLinks: string; // String!
    currentAvatarImageUrl: string; // String!
    currentAvatarThumbnailImageUrl: string; // String!
    displayName: string; // String!
    id: string; // ID!
    isFriend: boolean; // Boolean!
    last_login: string; // String!
    last_platform: string; // String!
    role: NexusGenEnums['VRChatUserRole']; // VRChatUserRole!
    username: string; // String!
  }
  VRChatUser: { // field return type
    allowAvatarCopying: boolean; // Boolean!
    bio: string; // String!
    bioLinks: string; // String!
    currentAvatarImageUrl: string; // String!
    currentAvatarThumbnailImageUrl: string; // String!
    displayName: string; // String!
    id: string; // ID!
    isFriend: boolean; // Boolean!
    last_login: string; // String!
    last_platform: string; // String!
    location: string; // String!
    role: NexusGenEnums['VRChatUserRole']; // VRChatUserRole!
    state: string; // String!
    status: string; // String!
    statusDescription: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
    username: string; // String!
    worldId: string; // String!
  }
  VRChatWorld: { // field return type
    author: NexusGenRootTypes['VRChatLimitedUser'] | null; // VRChatLimitedUser
    authorId: string; // ID!
    authorName: string; // String!
    capacity: number; // Int!
    created_at: any; // DateTime!
    description: string; // String!
    favorites: number; // Int!
    featured: boolean; // Boolean!
    heat: number; // Int!
    id: string; // ID!
    imageUrl: any; // URL!
    instances: Array<NexusGenRootTypes['VRChatWorldInstance'] | null>; // [VRChatWorldInstance]!
    labsPublicationDate: any; // DateTime!
    name: string; // String!
    occupants: number; // Int!
    organization: string; // String!
    popularity: number; // Int!
    privateOccupants: number; // Int!
    publicationDate: any; // DateTime!
    publicOccupants: number; // Int!
    releaseStatus: string; // String!
    tags: Array<string | null>; // [String]!
    thumbnailImageUrl: any; // URL!
    updated_at: any; // DateTime!
    version: number; // Int!
    visits: number; // Int!
  }
  VRChatWorldInstance: { // field return type
    id: string; // ID!
    players: number; // Int!
  }
  Viewer: { // field return type
    ability: Array<NexusGenRootTypes['Ability'] | null>; // [Ability]!
    user: NexusGenRootTypes['User']; // User!
  }
  PaginationResult: { // field return type
    cursor: NexusGenRootTypes['PaginationResultCursor']; // PaginationResultCursor!
  }
  VRChatUserBase: { // field return type
    allowAvatarCopying: boolean; // Boolean!
    bio: string; // String!
    bioLinks: string; // String!
    currentAvatarImageUrl: string; // String!
    currentAvatarThumbnailImageUrl: string; // String!
    displayName: string; // String!
    id: string; // ID!
    isFriend: boolean; // Boolean!
    last_login: string; // String!
    last_platform: string; // String!
    role: NexusGenEnums['VRChatUserRole']; // VRChatUserRole!
    username: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createRole: { // args
      input: NexusGenInputs['CreateRoleMutationInput']; // CreateRoleMutationInput!
    }
    discordOauthCallback: { // args
      input: NexusGenInputs['DiscordOauthMutationInput']; // DiscordOauthMutationInput!
    }
    login: { // args
      input: NexusGenInputs['LoginInput']; // LoginInput!
    }
    register: { // args
      input: NexusGenInputs['RegisterInput']; // RegisterInput!
    }
    updateRole: { // args
      input: NexusGenInputs['UpdateRoleMutationInput']; // UpdateRoleMutationInput!
      where: NexusGenInputs['UpdateRoleMutationWhereInput']; // UpdateRoleMutationWhereInput!
    }
    upsertAttendanceRecord: { // args
      input: NexusGenInputs['UpsertAttendaceRecordMutationInput']; // UpsertAttendaceRecordMutationInput!
    }
  }
  Query: {
    attendable: { // args
      where?: NexusGenInputs['AttendableQueryWhereInput'] | null; // AttendableQueryWhereInput
    }
    attendables: { // args
      pagination?: NexusGenInputs['PaginationInput'] | null; // PaginationInput
      search?: NexusGenInputs['AttendablesQuerySearchInput'] | null; // AttendablesQuerySearchInput
      where?: NexusGenInputs['AttendablesQueryWhereInput'] | null; // AttendablesQueryWhereInput
    }
    attendanceRecords: { // args
      pagination?: NexusGenInputs['PaginationInput'] | null; // PaginationInput
    }
    permissions: { // args
      pagination?: NexusGenInputs['PaginationInput'] | null; // PaginationInput
    }
    role: { // args
      where: NexusGenInputs['RoleQueryWhereInput']; // RoleQueryWhereInput!
    }
    roles: { // args
      pagination?: NexusGenInputs['PaginationInput'] | null; // PaginationInput
    }
    upcomingAttendables: { // args
      input: NexusGenInputs['UpcomingAttendablesQueryInput']; // UpcomingAttendablesQueryInput!
    }
    user: { // args
      where: NexusGenInputs['UserQueryWhereInput']; // UserQueryWhereInput!
    }
    vrchatUser: { // args
      where: NexusGenInputs['VRChatUserQueryWhereInput']; // VRChatUserQueryWhereInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  PaginationResult: "AttendablePagination" | "AttendanceRecordPagination" | "PermissionPagination" | "RolePagination"
  VRChatUserBase: "VRChatUser" | "VRChatLimitedUser" | "VRChatExtendedUser"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Ability" | "Attendable" | "AttendablePagination" | "AttendanceRecord" | "AttendanceRecordPagination" | "DiscordAccount" | "DiscordUser" | "Mutation" | "PaginationResultCursor" | "Permission" | "PermissionPagination" | "Query" | "Role" | "RolePagination" | "User" | "VRChatConfig" | "VRChatConfigAnnouncement" | "VRChatConfigDynamicWorldRow" | "VRChatExtendedUser" | "VRChatLimitedUser" | "VRChatUser" | "VRChatWorld" | "VRChatWorldInstance" | "Viewer";

export type NexusGenInputNames = "AttendableQueryWhereInput" | "AttendablesQuerySearchInput" | "AttendablesQueryWhereInput" | "AttendablesQueryWhereInputDateConstraint" | "CreateRoleMutationInput" | "DiscordOauthMutationInput" | "LoginInput" | "PaginationInput" | "RegisterInput" | "RoleQueryWhereInput" | "UpcomingAttendablesQueryInput" | "UpdateRoleMutationInput" | "UpdateRoleMutationWhereInput" | "UpsertAttendaceRecordMutationInput" | "UserQueryWhereInput" | "VRChatUserQueryWhereInput";

export type NexusGenEnumNames = "AbilityAction" | "AbilitySubject" | "PaginationInputOrder" | "VRChatUserRole";

export type NexusGenInterfaceNames = "PaginationResult" | "VRChatUserBase";

export type NexusGenScalarNames = "Boolean" | "DateTime" | "EmailAddress" | "Float" | "ID" | "Int" | "String" | "URL";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ctx.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}