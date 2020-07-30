<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'

import TitleBar from './title-bar.vue'

import {
  AttendancePageAttendanceRecordsDocument,
  AttendancePageAttendanceRecordsQueryVariables,
  PaginationInputOrder,
} from '../../../../generated/composition'

export default Vue.extend({
  components: {
    TitleBar,
  },
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
})
</script>

<template lang="pug">
  graphql-data-table(
    :query='AttendancePageAttendanceRecordsDocument'
    :headers='headers'
    :get-result='getResult'
    title='Your attendances'
  )
    template(v-slot:item.startsAt='{item}')
      span {{formatDate(item.startsAt)}}

    template(v-slot:item.endsAt='{item}')
      span {{formatDate(item.endsAt)}}

    template(v-slot:crud-actions)
      title-bar
</template>
