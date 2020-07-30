<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'

import {
  AttendanceUpsertFormAttendablesDocument,
  AttendanceUpsertFormAttendableDocument,
  Attendable,
} from '../../../../generated/composition'

export default Vue.extend({
  name: 'attendance-upsert-form',
  data () {
    return {
      valid: false,
      AttendanceUpsertFormAttendablesDocument,
      AttendanceUpsertFormAttendableDocument,
      attendable: null,
      timeRange: null,
    }
  },
  watch: {
    attendable (newValue) {
      this.$emit('input', {
        attendable: newValue,
        timeRange: this.timeRange,
      })
    },
    timeRange (newValue) {
      this.$emit('input', {
        attendable: this.attendable,
        timeRange: newValue,
      })
    },
  },
  methods: {
    getResult (data: any) {
      if (!data) {
        return []
      }

      return data.attendables ? data.attendables.data : []
    },

    updateSelected (newValue: string) {
      this.attendable = newValue
      this.timeRange = null
    },

    getDay (iso: string) {
      return DateTime.fromISO(iso).toLocaleString({
        weekday: 'long'
      })
    },

    getTimeFromISO (iso: string) {
      return DateTime.fromISO(iso).toLocaleString(DateTime.TIME_24_SIMPLE)
    },

    getBoundaries (attendable: Attendable) {
      const result = {
        start: this.getTimeFromISO(attendable.startsAt),
        end: this.getTimeFromISO(attendable.endsAt),
      }

      return result
    }
  }
})
</script>

<template lang="pug">
  v-form(v-model='valid')
    graphql-select(
      :value='attendable'
      @input='(value) => updateSelected(value)'
      :query='AttendanceUpsertFormAttendablesDocument'
      :get-result='getResult'
      placeholder='Select an event to log time for'
      search
      auto-select-first
      hint='Showing past and current events for this week only'
      order='DESC'
      order-by='startsAt'
    )
      template(v-slot:item='{item}')
        span
          b {{item.text}}
          | &nbsp;on {{getDay(item.startsAt)}}

    apollo-query(
      :query='AttendanceUpsertFormAttendableDocument',
      notify-on-network-change
      :variables='{where: {id: attendable}}'
      :skip='!attendable'
    )
      template(v-slot='{result: {data, loading}}')
        v-skeleton-loader(
          v-if='loading'
          max-width='300px'
          type='card'
        )

        time-range(
          v-else-if='data'
          :value='timeRange || getBoundaries(data.attendable)'
          @input='(newValue) => timeRange = newValue'
          :min='getTimeFromISO(data.attendable.startsAt)'
          :max='getTimeFromISO(data.attendable.endsAt)'
        )
</template>
