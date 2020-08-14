import { Repository, EntityRepository } from 'typeorm'
import { buildPaginator, PagingResult } from 'typeorm-cursor-pagination'

import { Role } from '../entity/role'
import { PaginateInput } from '../types'

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  public async paginate (input: PaginateInput<Role>): Promise<PagingResult<Role>> {
    const qb = this.createQueryBuilder('Role')

    const paginator = buildPaginator({
      entity: Role,
      alias: 'Role',
      query: input.query,
      paginationKeys: input.paginationKeys,
    })

    return paginator.paginate(qb)
  }
}
