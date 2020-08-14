import { Repository, EntityRepository } from 'typeorm'
import { PagingResult, buildPaginator } from 'typeorm-cursor-pagination'

import { Attendable } from '../entity'
import { PaginateInput } from '../types'

@EntityRepository(Attendable)
export class AttendableRepository extends Repository<Attendable> {
  public async paginate (input: PaginateInput<Attendable>): Promise<PagingResult<Attendable>> {
    const qb = this.createQueryBuilder('Attendable')

    if (input.search) {
      qb.andWhere('"Attendable"."name" ILIKE :name', {
        name: `%${input.search.name}%`,
      })
    }

    if (input.where?.startsAt?.before) {
      qb.andWhere('"Attendable"."startsAt" < :startsAtBeforeLimit', {
        startsAtBeforeLimit: input.where.startsAt.before,
      })
    }

    if (input.where?.startsAt?.after) {
      qb.andWhere('"Attendable"."startsAt" > :startsAtAfterLimit', {
        startsAtAfterLimit: input.where.startsAt.after,
      })
    }

    if (input.where?.endsAt?.before) {
      qb.andWhere('"Attendable"."endsAt" < :endsAtBeforeLimit', {
        endsAtBeforeLimit: input.where.endsAt.before,
      })
    }

    if (input.where?.endsAt?.after) {
      qb.andWhere('"Attendable"."endsAt" > :endsAtAfterLimit', {
        endsAtAfterLimit: input.where.endsAt.after,
      })
    }

    const paginator = buildPaginator({
      entity: Attendable,
      alias: 'Attendable',
      query: input.query,
      paginationKeys: input.paginationKeys,
    })

    return paginator.paginate(qb)
  }
}
