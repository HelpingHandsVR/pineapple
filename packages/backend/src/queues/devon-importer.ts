import Queue from 'bull'
import { getConnection } from 'typeorm'
import pAll from 'p-all'
import { DateTime } from 'luxon'

import { WithDevonAPI } from '~/data-sources/devon'
import { Attendable, User } from '~/entity'
import { AttendableType } from '~/db/enums'

const devonImporter = new Queue('import events from devon')

devonImporter.process(async (job) => {
  const api = new WithDevonAPI()

  // Get the connection from the builtin connection manager
  // This has to be refactored if we want to run this queue to a separate
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
