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

export const VRChatConfig = objectType({
  name: 'VRChatConfig',
  definition (t) {
    t.string('messageOfTheDay')

    t.field('dynamicWorldRows', {
      list: [false],
      type: 'VRChatConfigDynamicWorldRow',
    })

    t.field('announcements', {
      list: [false],
      type: 'VRChatConfigAnnouncement',
    })
  },
})
