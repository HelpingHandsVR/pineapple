import { asNexusMethod } from '@nexus/schema'

import {
  DateTimeResolver,
  EmailAddressResolver,
  URLResolver,
} from 'graphql-scalars'

export const DateTimeScalar = asNexusMethod(DateTimeResolver, 'dateTime')
export const EmailScalar = asNexusMethod(EmailAddressResolver, 'email')
export const URLScalar = asNexusMethod(URLResolver, 'url')
