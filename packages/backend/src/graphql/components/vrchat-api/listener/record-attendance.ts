import { MoreThan, LessThan } from 'typeorm'
import { DateTime } from 'luxon'

import { AttendanceRecord, User, Attendable } from '~/db/entity'

import { MessageProcessor } from '.'
import { log as baseLog } from '@/lib/log'

const log = baseLog.child({
  component: 'attendance-recorder',
})

const trackBegin: MessageProcessor = async (message, context) => {
  if (message.type !== 'friend-location' && message.type !== 'friend-online') {
    return null
  }

  log.debug({
    user: message.content.user.displayName,
  }, 'checking attendance-start')

  if (message.content.location === 'private') {
    // If this is private, we cannot see which world the user is in

    return null
  }

  let user = await context.connection.getRepository(User)
    .findOne({
      where: {
        vrcUserID: message.content.userId,
      },
    })

  if (!user) {
    log.debug('Creating user for', message.content.user.displayName)

    // Create a new user and do not set "provisioned" to true
    // this will cause users who haven't registered to still be tracked and
    // their existing record will show up when they register
    user = new User()

    user.display = message.content.user.displayName
    user.vrcUserID = message.content.userId

    // TODO: This will create a duplicate if the user exists but has not linked
    // TODO: their account yet. In theory this should be impossible because the
    // TODO: pipeline only gives info about friends.
    user = await user.save()
  }

  const now = DateTime.fromJSDate(new Date())

  // Location format (everything except world id is optional):
  // <world id>:<instance id>~<privacy>(<user id>)~nonce(<nonce>)
  const locationParser = /^(?<world>wrld_[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})(:(?<instance>[0-9]{0,}))?(~(?<privacy>[a-z]{0,})\((?<user>usr_[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})\))?(~nonce\((?<nonce>[A-Z0-9]{0,})\))?$/igmu
  const { groups } = locationParser.exec(message.content.location)
  const instance = `${groups.instance}~${groups.privacy}(${groups.user})~nonce(${groups.nonce})`

  log.debug({
    user: message.content.user.displayName,
    world: groups.world,
    instance: groups.instance,
  }, 'finding attendance data')

  // Check if that world currently has an event running, or is about to begin
  const attendable = await context.connection.getRepository(Attendable)
    .findOne({
      where: [
        {
          vrcWorldInstance: instance,
          vrcWorldId: groups.world,
          endsAt: MoreThan(now.toJSDate()),
          startsAt: LessThan(now.toJSDate()),
        },
        {
          vrcWorldInstance: instance,
          vrcWorldId: groups.world,
          endsAt: MoreThan(now.toJSDate()),
          startsAt: MoreThan(now.minus({ minutes: 30 }).toJSDate()),
        },
      ],
    })

  if (!attendable) {
    log.debug('This world is not currently hosting an event')

    // This world currently does not host an event
    return null
  }

  log.debug({
    attendable: attendable.name,
    world: groups.world,
    instance: groups.instance,
  }, 'found attendable for world')

  const record = new AttendanceRecord()

  record.attendable = Promise.resolve(attendable)
  record.startsAt = now.toJSDate()
  record.user = Promise.resolve(user)

  await record.save()

  log.debug({
    user: message.content.user.displayName,
    world: groups.world,
    instance: groups.instance,
  }, 'begun attendance record')
}

const trackEnd: MessageProcessor = async (message, context) => {
  if (message.type !== 'friend-offline' && message.type !== 'friend-location') {
    return null
  }

  log.debug({
    userId: message.content.userId,
  }, 'checking attendance-end')

  const user = await context.connection.getRepository(User)
    .findOne({
      where: {
        vrcUserID: message.content.userId,
      },
    })

  if (!user) {
    // This event is a diconnection. If user is null here, that means we didn't
    // catch when this user entered the class and have no attendance record to
    // update here.
    return null
  }

  const now = DateTime.fromJSDate(new Date())

  const record = await context.connection.getRepository(AttendanceRecord)
    .findOne({
      where: {
        user: Promise.resolve(user),
        endsAt: null,
        // At most, this many hours can be credited to a user in case they have
        // an orphan record.
        startsAt: MoreThan(now.minus({
          hours: 4,
        }).toJSDate()),
      },
    })

  if (!record) {
    // We somehow didn't catch the user beginning their lesson, so we discard
    // this event
    return null
  }

  log.debug({
    userId: message.content.userId,
  }, 'ended attendance record')

  record.endsAt = now.toJSDate()

  await record.save()
}

export const process: MessageProcessor = async (message, context, dataSource): Promise<void> => {
  await Promise.all([
    trackBegin(message, context, dataSource),
    trackEnd(message, context, dataSource),
  ])
}
