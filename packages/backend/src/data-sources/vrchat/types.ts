/* eslint-disable camelcase */
// Disabled because these properties are dictated by the VRC API and this is a
// strict binding. Casing is changed later in resolvers.

import { Response } from 'apollo-datasource-rest'

type ResponseBase = {
  __headers: Response['headers']
}

export type VRCWorldId = string
export type VRCUserId = string
export type VRCAvatarId = string
export type VRCFavoriteId = string
export type VRCInstanceId = string
export type VRCNotificationId = string
export type VRCModerationId = string
export type VRCDateTimeString = string

type SortOption = 'popularity' | 'created' | 'updated' | 'order' | '_created_at' | '_updated_at'
type OrderOption = 'ascending' | 'descending'

type VRCConfigAnnouncement = {
  name: string,
  text: string,
}

type VRCConfigDownloadUrls = {
  sdk2: string,
  sdk3: string,
}
type VRCConfigDynamicWorldRow = {
  index: number,
  name: string,
  platform: string,
  sortHeading: string,
  sortOrder: string,
  sortOwnership: string,
}

/**
 * The response shape for the /config call, most of this is not useful for us
 */
export type VRCConfig = ResponseBase & {
  address: string,
  announcements: VRCConfigAnnouncement[],
  apiKey: string,
  appName: string,
  buildVersionTag: string,
  clientApiKey: string,
  clientBPSCeiling: number,
  clientDisconnectTimeout: number,
  clientReservedPlayerBPS: number,
  clientSentCountAllowance: number,
  contactEmail: string,
  copyrightEmail: string,
  currentTOSVersion: string,
  defaultAvatar: string,
  deploymentGroup: string,
  devAppVersionStandalone: string,
  devDownloadLinkWindows: string,
  devSdkUrl: string,
  devSdkVersion: string,
  devServerVersionStandalone: string,
  disableAvatarCopying: boolean,
  disableAvatarGating: boolean,
  disableCommunityLabs: boolean,
  disableCommunityLabsPromotion: boolean,
  disableEmail: boolean,
  disableEventStream: string,
  disableFeedbackGating: boolean,
  disableRegistration: string,
  disableSteamNetworking: boolean,
  disableTwoFactorAuth: boolean,
  disableUdon: boolean,
  disableUpgradeAccount: boolean,
  downloadLinkWindows: string,
  downloadUrls: VRCConfigDownloadUrls[],
  dynamicWorldRows: VRCConfigDynamicWorldRow[],
  gearDemoRoomId: VRCWorldId,
  homeWorldId: VRCWorldId,
  hubWorldId: VRCWorldId,
  jobsEmail: string,
  messageOfTheDay: string,
  moderationEmail: string,
  moderationQueryPeriod: number,
  notAllowedToSelectAvatarInPrivateWorldMessage: string,
  plugin: string,
  releaseAppVersionStandalone: string,
  releaseSdkUrl: string,
  releaseSdkVersion: string,
  releaseServerVersionStandalone: string,
  sdkDeveloperFaqUrl: string,
  sdkDiscordUrl: string,
  sdkNotAllowedToPublishMessage: string,
  sdkUnityVersion: string,
  serverName: string,
  supportEmail: string,
  timeOutWorldId: VRCWorldId,
  tutorialWorldId: VRCWorldId,
  updateRateMsMaximum: number,
  updateRateMsMinimum: number,
  updateRateMsNormal: number,
  uploadAnalysisPercent: number,
  useReliableUdpForVoice: boolean,
  userUpdatePeriod: number,
  userVerificationDelay: number,
  userVerificationRetry: number,
  userVerificationTimeout: number,
  viveWindowsUrl: string,
  whiteListedAssetUrls: Array<string | null>,
  worldUpdatePeriod: number,
}

type VRCExtendedUserSteamDetails = {
  avatar: string,
  avatarfull: string,
  avatarmedium: string,
  communityvisibilitystate: number,
  personaname: string,
  personastate: number,
  profilestate: number,
  profileurl: string,
  steamid: string,
}

/**
 * These properties are sent with responses about yourself and friends also
 */
export type VRCUserBase = {
  id: VRCUserId,
  username: string,
  displayName: string,
  bio: string,
  bioLinks: string,
  currentAvatarImageUrl: string,
  currentAvatarThumbnailImageUrl: string,
  status: string,
  statusDescription: string,
  state: string,
  tags: string[],
  developerType: string,
  last_login: string, // ISO string
  last_platform: string,
  allowAvatarCopying: boolean,
  isFriend: boolean,
  friendKey: string,
}

type VRCUserBaseResponse = ResponseBase & VRCUserBase

/**
 * So far I've only seen this extended user type being sent is when a user asks
 * about themselves.
 */
export type VRCExtendedUser = VRCUserBaseResponse & {
  pastDisplayNames: string[],
  hasEmail: boolean,
  hasPendingEmail: boolean,
  email: string,
  obfuscatedEmail: string,
  obfuscatedPendingEmail: string,
  emailVerified: boolean,
  hasBirthday: boolean,
  unsubscribe: boolean,
  friends: string[],
  friendGroupNames: string[]
  currentAvatar: VRCAvatarId,
  currentAvatarAssetUrl: string,
  accountDeletionDate?: string | null,
  acceptedTOSVersion: number,
  steamId: string,
  steamDetails?: VRCExtendedUserSteamDetails | null,
  oculusId: string,
  hasLoggedInFromClient: boolean,
  homeLocation: string,
  twoFactorAuthEnabled: boolean,
  feature: {
    twoFactorAuth: boolean,
  },
  onlineFriends: string[],
  activeFriends: string[],
  offlineFriends: string[],
}

/**
 * This information is sent about users that are not the viewer
 */
export type VRCUser = VRCUserBaseResponse & {
  location: string | 'private',
  worldId: VRCWorldId | 'private',
}

/**
 * Authentication
 */
export type VRCLoginResultTotpNeeded = ResponseBase & {
  requiresTwoFactorAuth: string[]
}

export type VRCLoginResult = VRCLoginResultTotpNeeded | VRCExtendedUser

export type VRCTotpVerificationResult = ResponseBase & {
  verified: boolean,
}

export type VRCOperationResult = ResponseBase & {
  success: {
    message: string,
    status_code: number,
  },
}

/**
 * Assets
 */
export type VRCUnityPackage = {
  id: string,
  assetUrl: string,
  assetUrlObject: unknown,
  pluginUrl: string,
  pluginUrlObject: unknown,
  unityVersion: string,
  unitySortNumber: number,
  assetVersion: number,
  platform: string,
  created_at: string,
}

/**
 * Worlds
 */
export type VRCWorldInstanceTuple = [string, number]

export type VRCWorld = ResponseBase & {
  id: string,
  name: string,
  description: string,
  featured: boolean,
  authorId: string,
  authorName: string,
  capacity: number,
  tags: string[],
  releaseStatus: string,
  imageUrl: string,
  thumbnailImageUrl: string,
  assetUrl: string,
  assetUrlObject: unknown,
  pluginUrl: string,
  pluginUrlObject: unknown,
  unityPackageUrl: string,
  unityPackageObject: unknown,
  namespace: string,
  unityPackages: VRCUnityPackage[],
  version: number,
  organization: string,
  previewYoutubeId: unknown | null,
  favorites: number,
  created_at: string,
  updated_at: string,
  publicationDate: string,
  labsPublicationDate: string,
  visits: number,
  popularity: number,
  heat: number,
  publicOccupants: number,
  privateOccupants: number,
  occupants: number,
  instances: VRCWorldInstanceTuple[],
}

/**
 * Friend requests
 */
export type VRCFriendRequestAnswer = ResponseBase & {
  type: 'friend-add',
  content: {
    userId: string,
    user: VRCUserBase,
  }
}

/**
 * Notifications
 */
export type NotificationType = 'all' | 'message' | 'friendrequest' | 'invite' | 'votetokick' | 'halp' | 'hidden'

export type Details = {
  invite: VRCWorldId,
  votetokick: 'userToKickId' | 'initiatorUserId'
  // halp: 'halpId' | 'worldId'
  halp: string
}

export type NotificationInfo = {
  id: VRCNotificationId
  type: NotificationType
  senderUserId: VRCUserId
  receiverUserId: VRCUserId
  message: string
  details: Details
  jobName: string
  jobColor: string
}

export type SendNotificationOptions = {
  message: string
  details: Partial<Details>
}

export type NotificationDetail = {
  id: VRCNotificationId
  type: NotificationType
  senderUserId: VRCUserId
  receiverUserId: VRCUserId
  message: string
  details: Details
  seen: boolean
  created_at: VRCDateTimeString
}
