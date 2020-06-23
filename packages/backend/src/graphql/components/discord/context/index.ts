import DiscordOauth2 from 'discord-oauth2'
import { StaticContext } from '~/graphql/context'

export type DiscordContext = {
  discord: {
    oauth2: DiscordOauth2,
  },
}

export const makeDiscordContext = (context: StaticContext): DiscordContext => {
  return {
    discord: {
      oauth2: new DiscordOauth2(context.config.discord),
    },
  }
}
