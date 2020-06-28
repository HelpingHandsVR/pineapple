/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as ctx from "../graphql/context/index"





declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  DiscordOauthMutationInput: { // input type
    accessToken?: string | null; // String
    expiresIn?: number | null; // Int
    state?: string | null; // String
  }
  VRChatLoginInput: { // input type
    password?: string | null; // String
    totp?: string | null; // String
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
  AbilityAction: 7 | 0 | 4 | 8 | 5 | 6 | 1 | 3 | 2
  AbilitySubject: 5 | 4 | 6 | 3 | 2 | 7 | 1 | 0
  VRChatUserRole: 3 | 1 | 4 | 2 | 0
}

export interface NexusGenRootTypes {
  Ability: any;
  DiscordAccount: { // root type
    id: string; // ID!
  }
  DiscordUser: { // root type
    discriminator: string; // String!
    id: string; // ID!
    username: string; // String!
  }
  Mutation: {};
  Query: {};
  Role: { // root type
    id: string; // ID!
    name: string; // String!
  }
  User: { // root type
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
  VRChatLoginResult: { // root type
    authCookie?: string | null; // String
    complete: boolean; // Boolean!
  }
  VRChatLogoutMutationResult: { // root type
    success: boolean; // Boolean!
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
  Viewer: { // root type
    user: NexusGenRootTypes['User']; // User!
    vrchatUser: NexusGenRootTypes['VRChatExtendedUser']; // VRChatExtendedUser!
  }
  VRChatUserBase: NexusGenRootTypes['VRChatExtendedUser'] | NexusGenRootTypes['VRChatUser'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  DiscordOauthMutationInput: NexusGenInputs['DiscordOauthMutationInput'];
  VRChatLoginInput: NexusGenInputs['VRChatLoginInput'];
  AbilityAction: NexusGenEnums['AbilityAction'];
  AbilitySubject: NexusGenEnums['AbilitySubject'];
  VRChatUserRole: NexusGenEnums['VRChatUserRole'];
}

export interface NexusGenFieldTypes {
  Ability: { // field return type
    action: NexusGenEnums['AbilityAction']; // AbilityAction!
    subject: NexusGenEnums['AbilitySubject'] | null; // AbilitySubject
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
    discordOauthCallback: NexusGenRootTypes['DiscordUser']; // DiscordUser!
    vrcLogin: NexusGenRootTypes['VRChatLoginResult']; // VRChatLoginResult!
    vrcLogout: NexusGenRootTypes['VRChatLogoutMutationResult']; // VRChatLogoutMutationResult!
  }
  Query: { // field return type
    discordOauthURL: string; // String!
    viewer: NexusGenRootTypes['Viewer'] | null; // Viewer
  }
  Role: { // field return type
    id: string; // ID!
    name: string; // String!
  }
  User: { // field return type
    discord: NexusGenRootTypes['DiscordAccount'] | null; // DiscordAccount
    id: string; // ID!
    role: NexusGenRootTypes['Role']; // Role!
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
  VRChatLoginResult: { // field return type
    authCookie: string | null; // String
    complete: boolean; // Boolean!
  }
  VRChatLogoutMutationResult: { // field return type
    success: boolean; // Boolean!
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
  Viewer: { // field return type
    ability: Array<NexusGenRootTypes['Ability'] | null>; // [Ability]!
    user: NexusGenRootTypes['User']; // User!
    vrchatUser: NexusGenRootTypes['VRChatExtendedUser']; // VRChatExtendedUser!
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
    state: string; // String!
    status: string; // String!
    statusDescription: string; // String!
    username: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    discordOauthCallback: { // args
      input: NexusGenInputs['DiscordOauthMutationInput']; // DiscordOauthMutationInput!
    }
    vrcLogin: { // args
      input: NexusGenInputs['VRChatLoginInput']; // VRChatLoginInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  VRChatUserBase: "VRChatExtendedUser" | "VRChatUser"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Ability" | "DiscordAccount" | "DiscordUser" | "Mutation" | "Query" | "Role" | "User" | "VRChatConfig" | "VRChatConfigAnnouncement" | "VRChatConfigDynamicWorldRow" | "VRChatExtendedUser" | "VRChatLoginResult" | "VRChatLogoutMutationResult" | "VRChatUser" | "Viewer";

export type NexusGenInputNames = "DiscordOauthMutationInput" | "VRChatLoginInput";

export type NexusGenEnumNames = "AbilityAction" | "AbilitySubject" | "VRChatUserRole";

export type NexusGenInterfaceNames = "VRChatUserBase";

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

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