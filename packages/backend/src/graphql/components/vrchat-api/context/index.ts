import { VRChatAPI } from '~/data-sources/vrchat'
import { Config } from '@/lib/config/type'

export type VRChatAPIContext = {
  dataSources: {
    vrchat: VRChatAPI | null,
  }
}

export const makeVRChatAPIContext = async (config: Config): Promise<VRChatAPIContext> => {
  const vrchat = new VRChatAPI(config.vrchat.bot.username, config.vrchat.bot.password)

  return {
    dataSources: {
      vrchat,
    },
  }
}
