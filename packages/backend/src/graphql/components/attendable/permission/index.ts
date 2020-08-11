import { shield, can } from '@/lib/permission/shield'
import { Action, Subject } from '@/lib/permission'
import { and } from 'graphql-shield'
import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'

export const rules = shield({
  Mutation: {
    upsertAttendanceRecord: and(
      isLoggedIn,
      can(Action.CREATE, Subject.ATTENDANCE_RECORD_SELF),
    ),
  },
  Query: {
    attendanceRecords: and(
      isLoggedIn,
      can(Action.READ, Subject.ATTENDANCE_RECORD_SELF),
    ),
    upcomingAttendables: and(
      isLoggedIn,
      can(Action.READ, Subject.ATTENDABLE_SELF), can(Action.READ, Subject.ATTENDABLE_OTHERS),
    ),
  },
})
