import { Repository, EntityRepository } from 'typeorm'
import { DateTime } from 'luxon'
import { buildPaginator, PagingResult } from 'typeorm-cursor-pagination'

import { AttendanceRecord, Attendable, User } from '../entity'
import { PaginateInput } from '../types'

type UpsertInput = {
  startsAt?: Date,
  endsAt?: Date,
}

@EntityRepository(AttendanceRecord)
export class AttendanceRecordRepository extends Repository<AttendanceRecord> {
  public async paginate (user: User, input: PaginateInput<AttendanceRecord>): Promise<PagingResult<AttendanceRecord>> {
    const qb = this.createQueryBuilder('AttendanceRecord')
      .where('"AttendanceRecord"."userId" = :userId', {
        userId: user.id,
      })

    const paginator = buildPaginator({
      entity: AttendanceRecord,
      alias: 'AttendanceRecord',
      query: input.query,
      paginationKeys: input.paginationKeys,
    })

    return paginator.paginate(qb)
  }

  /**
   * Upsert time for an Attendable, in order to record an increase in user time
   * spent in lessons/events (= Attendables).
   *
   * @param attendable The Attendable to record time for
   * @param user The User who the time will belong to
   * @param input Parameters, containing Dates about the start and end of the time slot
   */
  public async upsert (attendable: Attendable, user: User, input: UpsertInput = {}): Promise<AttendanceRecord> {
    const existing = await this.findOne({
      where: {
        attendable: attendable.id,
        user: user.id,
      },
    })

    // Make sure that the user can only specify start and end times within
    // the boundaries of the attendable
    const boundaries = {
      start: DateTime.fromJSDate(attendable.startsAt),
      end: DateTime.fromJSDate(attendable.endsAt),
    }

    if (existing) {
      existing.startsAt = input.startsAt
        ? DateTime.max(boundaries.start, DateTime.fromJSDate(input.startsAt)).toJSDate()
        : boundaries.start.toJSDate()

      existing.endsAt = input.endsAt
        ? DateTime.min(boundaries.end, DateTime.fromJSDate(input.endsAt)).toJSDate()
        : boundaries.end.toJSDate()

      return this.save(existing)
    }

    const record = new AttendanceRecord()

    record.attendable = Promise.resolve(attendable)
    record.user = Promise.resolve(user)

    record.startsAt = input.startsAt
      ? DateTime.max(boundaries.start, DateTime.fromJSDate(input.startsAt)).toJSDate()
      : boundaries.start.toJSDate()

    record.endsAt = input.endsAt
      ? DateTime.min(boundaries.end, DateTime.fromJSDate(input.endsAt)).toJSDate()
      : boundaries.end.toJSDate()

    return this.save(record)
  }
}
