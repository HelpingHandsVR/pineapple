import { and, allow, or } from 'graphql-shield'

import { shield, can } from '@/lib/permission/shield'
import { Action, Subject } from '@/lib/permission'
import { isLoggedIn } from '@/lib/permission/rules/is-logged-in'
import { isCreatedByViewer } from '@/lib/permission/rules/is-created-by-viewer'

export const rules = shield({
  Mutation: {
    upsertAttendanceRecord: and(
      isLoggedIn,
      can(Action.CREATE, Subject.ATTENDANCE_RECORD_SELF),
    ),
    deleteAttendanceRecord: or(
      and(
        isLoggedIn,
        isCreatedByViewer,
        can(Action.SOFT_DELETE, Subject.ATTENDANCE_RECORD_SELF),
      ),

      and(
        isLoggedIn,
        can(Action.SOFT_DELETE, Subject.ATTENDANCE_RECORD_OTHERS),
      ),
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
  Subscription: {
    attendanceRecordUpdate: allow,
    attendanceRecordCreate: allow,
    attendanceRecordRemove: allow,
  },
})
