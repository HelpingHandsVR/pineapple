/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as ctx from "../graphql/context/index"





declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  VRChatLoginInput: { // input type
    password?: string | null; // String
    totp?: string | null; // String
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
  VRChatUserRole: 3 | 1 | 4 | 2 | 0
}

export interface NexusGenRootTypes {
  Mutation: {};
  Query: {};
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
  VRChatUserBase: NexusGenRootTypes['VRChatExtendedUser'] | NexusGenRootTypes['VRChatUser'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  VRChatLoginInput: NexusGenInputs['VRChatLoginInput'];
  VRChatUserRole: NexusGenEnums['VRChatUserRole'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    logout: NexusGenRootTypes['VRChatLogoutMutationResult']; // VRChatLogoutMutationResult!
    vrcLogin: NexusGenRootTypes['VRChatLoginResult']; // VRChatLoginResult!
  }
  Query: { // field return type
    test: string; // String!
    vrcViewer: NexusGenRootTypes['VRChatExtendedUser']; // VRChatExtendedUser!
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
    username: string; // String!
    worldId: string; // String!
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
    vrcLogin: { // args
      input: NexusGenInputs['VRChatLoginInput']; // VRChatLoginInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  VRChatUserBase: "VRChatExtendedUser" | "VRChatUser"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Query" | "VRChatConfig" | "VRChatConfigAnnouncement" | "VRChatConfigDynamicWorldRow" | "VRChatExtendedUser" | "VRChatLoginResult" | "VRChatLogoutMutationResult" | "VRChatUser";

export type NexusGenInputNames = "VRChatLoginInput";

export type NexusGenEnumNames = "VRChatUserRole";

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