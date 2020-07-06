import Queue from 'bull'
import { getConnection } from 'typeorm'
import pAll from 'p-all'
import { DateTime } from 'luxon'

import { WithDevonAPI } from '~/data-sources/devon'
import { Attendable, User } from '~/entity'
import { AttendableType } from '~/db/enums'

const devonImporter = new Queue('import events from devon')

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

  // Get the connection from the builtin connection manager
  // This has to be refactored if we want to run this queue in a separate
  // process, as the connection manager is not shared outside the current
  // process
  const connection = getConnection('default')
  const events = await api.getEvents()

  await connection.getRepository(Attendable)
    .delete({
      definition: null,
    })

  const systemUser = await connection.getRepository(User)
    .findOneOrFail({
      where: {
        display: 'SYSTEM',
      },
    })

  const tasks = events.map((event, index) => {
    return async () => {
      const attendable = new Attendable()
      const startsAt = DateTime.fromMillis(Number.parseInt(event.timestamp, 10))

      attendable.name = `${event.language} with ${event.presenter} - ${event.location}`
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
