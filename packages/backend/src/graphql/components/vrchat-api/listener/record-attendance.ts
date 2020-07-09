import { MessageProcessor } from '.'
import { AttendanceRecord, User, Attendable } from '~/entity'
import { MoreThan, LessThan } from 'typeorm'
import { DateTime } from 'luxon'

const trackBegin: MessageProcessor = async (message, context) => {
  if (message.type !== 'friend-location' && message.type !== 'friend-online') {
    return null
  }

  console.log('[WS]', 'Checking attendance-start for', message.content.user.displayName, 'in', message.content.location)

  let user = await context.connection.getRepository(User)
    .findOne({
      where: {
        vrcUserID: message.content.userId,
      },
    })

  if (!user) {
    // Create a new user and do not set "provisioned" to true
    // this will cause users who haven't registered to still be tracked and
    // their existing record will show up when they register
    user = new User()

    user.display = message.content.user.displayName
    user.vrcUserID = message.content.userId

    user = await user.save()
  }

  const now = DateTime.fromJSDate(new Date())

  // Check if that world currently has an event running, or is about to begin
  const attendable = await context.connection.getRepository(Attendable)
    .findOne({
      where: [
        {
          vrcWorldId: message.content.location,
          endsAt: MoreThan(now.toJSDate()),
          startsAt: LessThan(now.toJSDate()),
        },
        {
          vrcWorldId: message.content.location,
          endsAt: MoreThan(now.toJSDate()),
          startsAt: MoreThan(now.minus({ minutes: 30 }).toJSDate()),
        },
      ],
    })

  if (!attendable) {
    // This world currently does not host an event
    return null
  }

  console.log('[WS]', 'Begun attendance record for', message.content.user.displayName, 'in', message.content.location)

  const record = new AttendanceRecord()

  record.attendable = Promise.resolve(attendable)
  record.startsAt = now.toJSDate()
  record.user = Promise.resolve(user)

  await record.save()
}

const trackEnd: MessageProcessor = async (message, context) => {
  if (message.type !== 'friend-offline' && message.type !== 'friend-location') {
    return null
  }

  console.log('[WS]', 'Checking attendance-end for', message.content.userId)

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

  console.log('[WS]', 'Ended attendance record for', message.content.userId)

  record.endsAt = now.toJSDate()

  await record.save()
}

export const process: MessageProcessor = async (message, context, dataSource): Promise<void> => {
  await Promise.all([
    trackBegin(message, context, dataSource),
    trackEnd(message, context, dataSource),
  ])
}
