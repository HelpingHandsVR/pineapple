import { Between, FindOperator } from 'typeorm'
import { DateTime } from 'luxon'

export const BetweenDates = <T = unknown>(after: DateTime, before: DateTime): FindOperator<T> => Between(after.toJSDate(), before.toJSDate())
