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
    }
  },
  watch: {
    attendable (newValue) {
      this.$emit('input', {
        attendable: newValue,
      })
    },
  },
  methods: {
    updateSelected (newValue: string) {
      this.attendable = newValue
      this.timeRange = null
    },

    getDay (iso: string) {
      return DateTime.fromISO(iso).toLocaleString({
        weekday: 'long'
      })
    },
  }
})
</script>

<template lang="pug">
  v-form(v-model='valid')
    graphql-select(
      :value='attendable'
      @input='(value) => updateSelected(value)'
      :query='AttendanceUpsertFormAttendablesDocument'
      placeholder='Select an event to log time for'
      search
      auto-select-first
      hint='Showing events for this week only'
      order='ASC'
      order-by='startsAt'
    )
      template(v-slot:item='{item}')
        span
          b {{item.text}}
          | &nbsp;on {{getDay(item.startsAt)}}
</template>
