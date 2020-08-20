import Tracker from '@asayerio/tracker'
import Vue from 'vue'

const main = () => {
  if (process.env.ASAYER_ENABLED !== 'true') {
    return null
  }

  const tracker = new Tracker({
    projectID: Number.parseInt(process.env.ASAYER_PROJECT_ID, 10),
  })

  Vue.prototype.$asayer = tracker

  tracker.start()

  return tracker
}

main()
