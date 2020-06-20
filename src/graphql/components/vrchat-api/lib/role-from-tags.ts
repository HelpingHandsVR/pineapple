/* eslint-disable camelcase */

export enum VRCUserRole {
  VISITOR,
  NEW_USER,
  USER,
  KNOWN,
  TRUSTED,
}

type TagLinkedItem = {
  role: VRCUserRole,
  next: keyof TagLinked | null,
  prev: keyof TagLinked | null,
}

type TagLinked = {
  system_trust_basic: TagLinkedItem,
  system_trust_known: TagLinkedItem,
  system_trust_trusted: TagLinkedItem,
  system_trust_veteran: TagLinkedItem,
}

const tagLinked: TagLinked = {
  system_trust_basic: {
    role: VRCUserRole.NEW_USER,
    next: 'system_trust_known',
    prev: null,
  },
  system_trust_known: {
    role: VRCUserRole.USER,
    next: 'system_trust_trusted',
    prev: 'system_trust_basic',
  },
  system_trust_trusted: {
    role: VRCUserRole.KNOWN,
    next: 'system_trust_veteran',
    prev: 'system_trust_known',
  },
  system_trust_veteran: {
    role: VRCUserRole.TRUSTED,
    next: null,
    prev: 'system_trust_trusted',
  },
}

export const getRoleFromTags = (tags: string[]): VRCUserRole => {
  let role: VRCUserRole = null

  Object.entries(tagLinked).forEach(([key, value]) => {
    if (tags.includes(key)) {
      ({ role } = value)
    }
  })

  return role
}
