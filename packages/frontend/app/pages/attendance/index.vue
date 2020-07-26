<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'

import {
  AttendancePageAttendanceRecordsDocument,
  AttendancePageAttendanceRecordsQueryVariables,
  PaginationInputOrder,
} from '../../../generated/composition'

export default {
  layout: 'flush',
  data () {
    return {
      AttendancePageAttendanceRecordsDocument,
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Event',
          value: 'attendable.name'
        },
        {
          text: 'Started / Starting in',
          value: 'startsAt'
        },
        {
          text: 'Ended / Ending in',
          value: 'endsAt'
        },
      ]
    }
  },
  methods: {
    getResult (data: Record<string, any>) {
      return data ? data.attendanceRecords : null
    },

    formatDate (date: string) {
      return DateTime.fromISO(date).toRelative()
    },
  },
  middleware: ['auth'],
}
</script>

<template lang="pug">
  graphql-data-table(
    :query='AttendancePageAttendanceRecordsDocument'
    :headers='headers'
    :get-result='getResult'
    title='Attendances'
  )
    template(v-slot:item.startsAt='{item}')
      span {{formatDate(item.startsAt)}}

    template(v-slot:item.endsAt='{item}')
      span {{formatDate(item.endsAt)}}

    template(v-slot:crud-actions)
      v-btn(
        color='white'
        icon
      )
        v-icon mdi-plus
</template>
