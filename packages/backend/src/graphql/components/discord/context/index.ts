import DiscordOauth2 from 'discord-oauth2'
import { Config } from '@/lib/config/type'

export type DiscordContext = {
  discord: {
    oauth2: DiscordOauth2,
  },
}

export const makeDiscordContext = (config: Config): DiscordContext => {
  return {
    discord: {
      oauth2: new DiscordOauth2(config.discord),
    },
  }
}
