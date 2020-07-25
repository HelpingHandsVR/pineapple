// REMINDER: Always add new items to the bottom of the enum as the database
// stores the index, not the string representation of the value

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
}
