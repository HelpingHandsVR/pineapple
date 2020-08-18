import { rule } from 'graphql-shield'
import { Context } from '~/graphql/context'
import { OwnershipMismatchError } from '../errors'

export const isCreatedByViewer = rule('isCreatdByViewer', { cache: 'no_cache' })(async (root, args, context: Context) => {
  if (!('createdBy' in root)) {
    return new OwnershipMismatchError('This object does not support ownership')
  }

  const user = await root.createdBy

  return user.id === context.authentication.getUser().id || new OwnershipMismatchError('This object does not belong to you, and thus you cannot change it')
})
