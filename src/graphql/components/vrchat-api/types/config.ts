import { objectType } from '@nexus/schema'

export const VRChatConfigDynamicWorldRow = objectType({
  name: 'VRChatConfigDynamicWorldRow',
  definition (t) {
    t.string('name')
    t.string('sortHeading')
    t.string('sortOwnership')
    t.string('sortOrder')
    t.string('platform')
    t.int('index')
  },
})

export const VRChatConfigAnnouncement = objectType({
  name: 'VRChatConfigAnnouncement',
  definition (t) {
    t.string('name')
    t.string('text')
  },
})

export const VRChatConfigDownloadUrls = objectType({
  name: 'VRChatConfigDownloadUrls',
  definition (t) {
    t.string('sdk2')
    t.string('sdk3')
  },
})

export const VRChatConfig = objectType({
  name: 'VRChatConfig',
  definition (t) {
    t.string('messageOfTheDay')
    t.string('timeOutWorldId')
    t.string('gearDemoRoomId')
    t.string('releaseServerVersionStandalone')
    t.string('downloadLinkWindows')
    t.string('releaseAppVersionStandalone')
    t.string('devAppVersionStandalone')
    t.string('devServerVersionStandalone')
    t.string('devDownloadLinkWindows')
    t.string('currentTOSVersion')
    t.string('releaseSdkUrl')
    t.string('releaseSdkVersion')
    t.string('devSdkUrl')
    t.string('devSdkVersion')

    t.string('whiteListedAssetUrls', {
      list: [false],
    })

    t.string('clientApiKez')
    t.string('viveWindowsUrl')
    t.string('sdkUnityVersion')
    t.string('hubWorldId')
    t.string('homeWorldId')
    t.string('tutorialWorldId')
    t.string('disableEventStream')
    t.boolean('disableAvatarGating')
    t.boolean('disableFeedbackGating')
    t.string('disableRegistration')
    t.boolean('disableUpgradeAccount')
    t.boolean('disableCommunityLabs')
    t.boolean('disableCommunityLabsPromotion')
    t.boolean('disableTwoFactorAuth')
    t.boolean('disableSteamNetworking')
    t.boolean('disableUdon')
    t.string('plugin')
    t.string('sdkNotAllowedToPublishMessage')
    t.string('sdkDeveloperFaqUrl')
    t.string('sdkDiscordUrl')
    t.string('notAllowedToSelectAvatarInPrivateWorldMessage')
    t.int('userVerificationTimeout')
    t.int('userUpdatePeriod')
    t.int('userVerificationDelay')
    t.int('userVerificationRetry')
    t.int('worldUpdatePeriod')
    t.int('moderationQueryPeriod')
    t.int('clientDisconnectTimeout')
    t.string('defaultAvatar')

    t.field('dynamicWorldRows', {
      list: [false],
      type: 'VRChatConfigDynamicWorldRow',
    })

    t.boolean('disableAvatarCopying')

    t.field('announcements', {
      list: [false],
      type: 'VRChatConfigAnnouncement',
    })

    t.boolean('useReliableUdpForVoice')
    t.int('updateRateMsMaximum')
    t.int('updateRateMsMinimum')
    t.int('updateRateMsNormal')
    t.int('clientBPSCeiling')
    t.int('clientReservedPlayerBPS')
    t.int('clientSentCountAllowance')
    t.int('uploadAnalysisPercent')

    t.field('downloadUrls', {
      type: 'VRChatConfigDownloadUrls',
    })

    t.string('address')
    t.string('contactEmail')
    t.string('supportEmail')
    t.string('jobsEmail')
    t.string('copyrightEmail')
    t.string('moderationEmail')
    t.boolean('disableEmail')
    t.string('appName')
    t.string('serverName')
    t.string('deploymentGroup')
    t.string('buildVersionTag')
    t.string('apiKey')
  },
})
