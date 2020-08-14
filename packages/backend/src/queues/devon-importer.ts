import Queue from 'bull'
import { getConnection } from 'typeorm'
import pAll from 'p-all'
import { DateTime } from 'luxon'

import { Attendable, User } from '~/db/entity'

import { WithDevonAPI } from '~/data-sources/devon'
import { AttendableType } from '~/db/types'
import { BetweenDates } from '@/lib/typeorm/helpers'
import { log as logger } from '@/lib/log'
import { getConfig } from '@/lib/config/coerce'

const config = getConfig(process.env)

const log = logger.child({
  component: 'external-event-importer',
})

const devonImporter = new Queue('import events from devon', {
  redis: config.redis,
})

enum HHWorld {
  GlobalHelpingHands = 'wrld_43955869-159c-4517-9677-661253f483bf',
  MrDummySignAndFun = 'wrld_2147b034-c6e9-4919-b74a-a0c81b596d95',
  HelpingHandsHQ = 'wrld_2ee6d793-61fe-433f-b0f6-ffe3d88986b5',
}

const determineWorldId = (worldName: string): HHWorld | null => {
  if (worldName.toLowerCase().includes('global')) {
    return HHWorld.GlobalHelpingHands
  }

  if (
    worldName.toLowerCase().includes('hq')
    || worldName.toLowerCase().includes('head')
    || worldName.toLowerCase().includes('club')
  ) {
    return HHWorld.HelpingHandsHQ
  }

  if (
    worldName.toLowerCase().includes('dummy')
    || worldName.toLowerCase().includes('sign')
  ) {
    return HHWorld.MrDummySignAndFun
  }

  return null
}

devonImporter.process(async (job) => {
  const api = new WithDevonAPI()

  log.debug('importing events from Devon\'s API')

  // Get the connection from the builtin connection manager
  // This has to be refactored if we want to run this queue in a separate
  // process, as the connection manager is not shared outside the current
  // process
  const connection = getConnection('default')
  const events = await api.getEvents()

  job.progress(8)

  log.debug(`received ${events.length} events`)

  const systemUser = await connection.getRepository(User)
    .findOneOrFail({
      where: {
        display: 'SYSTEM',
      },
    })

  job.progress(10)

  const progressStep = 100 / events.length

  const tasks = events.map((event, index) => {
    const startsAt = DateTime.fromMillis(Number.parseInt(event.timestamp, 10))

    return async () => {
      log.debug(`processing ${event.language} (${event.presenter})`)

      // If this event was already registered, update it
      // There's no key, so we need to guess based on the name.
      // TODO: Cancelled events will not be removed from the db!
      const existing = await connection.getRepository(Attendable)
        .findOne({
          where: {
            name: event.language,
            startsAt: BetweenDates(startsAt.startOf('day'), startsAt.endOf('day')),
            definition: null,
          },
        })

      if (existing) {
        log.debug('is updating existing attendable')

        existing.name = event.language
        existing.startsAt = startsAt.toJSDate()
        existing.endsAt = startsAt.plus({ hours: 2 }).toJSDate()
        existing.type = AttendableType.LESSON
        existing.createdBy = systemUser.id
        existing.vrcWorldId = determineWorldId(event.location)

        const saved = await existing.save()

        job.progress(index + progressStep)

        return saved
      }

      log.debug('creating new attendable')

      const attendable = new Attendable()

      attendable.name = event.language
      attendable.startsAt = startsAt.toJSDate()
      attendable.endsAt = startsAt.plus({ hours: 2 }).toJSDate()
      attendable.type = AttendableType.LESSON
      attendable.createdBy = systemUser.id
      attendable.vrcWorldId = determineWorldId(event.location)

      const saved = await attendable.save()

      job.progress(index + 1)

      return saved
    }
  })

  await pAll(tasks, {
    concurrency: 1,
  })

  return null
})

export {
  devonImporter,
}
