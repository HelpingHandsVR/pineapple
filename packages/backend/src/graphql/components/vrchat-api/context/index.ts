import { VRChatAPI } from '~/data-sources/vrchat'
import { Config } from '@/lib/config/type'
import { VRCConfig } from '~/data-sources/vrchat/types'

export type VRChatAPIContext = {
  vrchat: {
    config: VRCConfig,
  }
  dataSources: {
    vrchat: VRChatAPI | null,
  }
}

export const makeVRChatAPIContext = async (config: Config): Promise<VRChatAPIContext> => {
  const vrchat = new VRChatAPI(config.vrchat.bot.username, config.vrchat.bot.password)

  // Need to perform the config request in order to obtain an auth cookie and
  // the API key
  const vrcConfig = await vrchat.getConfig()

  return {
    vrchat: {
      config: vrcConfig,
    },
    dataSources: {
      vrchat,
    },
  }
}
