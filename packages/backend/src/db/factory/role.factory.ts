import { define } from 'typeorm-seeding'
import { Role } from '~/db/entity'

define(Role, (): Role => {
  return new Role()
})
