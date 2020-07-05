/* eslint-disable camelcase */
// Disabled because these properties are dictated by Devon's API and this is a
// strict binding. Casing can be changed later elsewhere.

type Timezone = {
  iana: string,
  alpha2: string,
  alpha3: string,
  territory: string,
  text: string,
}

export type Event = {
  language: string,
  presenter: string,
  location: string,
  timestamp: string,
  time_until: string,
  timezones: Timezone[],
}
