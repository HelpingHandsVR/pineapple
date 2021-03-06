import { Ability } from '@casl/ability'

export enum Action {
  CREATE,
  READ,
  UPDATE,
  SOFT_DELETE,
  DELETE,

  LOG_OUT,
  LOG_OUT_OTHERS,
  ATTACH,
  DETACH,
}

export enum Subject {
  USER_SELF,
  USER_OTHERS,

  LESSON_SELF,
  LESSON_OTHERS,

  DISCORD_ACCOUNT_SELF,
  DISCORD_ACCOUNT_OTHERS,

  DISCORD_OAUTH_REQUEST_SELF,

  PERMISSION_SELF,

  ATTENDANCE_RECORD_SELF,
  ATTENDANCE_RECORD_OTHERS,

  ATTENDABLE_SELF,
  ATTENDABLE_OTHERS,

  SYSTEM_QUEUE,
  SYSTEM_ROLE,
  SYSTEM_PERMISSION,
}

export type CaslRole = () => Ability

export const crud = [
  Action.CREATE,
  Action.READ,
  Action.UPDATE,
  Action.SOFT_DELETE,
]
