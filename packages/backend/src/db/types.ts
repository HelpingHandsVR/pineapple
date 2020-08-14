import { PagniationOtions } from 'typeorm-cursor-pagination'

export enum AttendableType {
  LESSON,
  MOVIE,
  CLUB,
  OTHER,
}

export type PaginateInput<Entity> = {
  search?: {
    name: string,
  },
  where?: {
    startsAt?: {
      before?: Date,
      after?: Date,
    },
    endsAt?: {
      before?: Date,
      after?: Date,
    },
  },
  query: PagniationOtions<Entity>['query'],
  paginationKeys: PagniationOtions<Entity>['paginationKeys'] | any[],
}
