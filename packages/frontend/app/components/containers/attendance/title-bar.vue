<script lang="ts">
import Vue from 'vue'

import UpsertForm from './upsert-form.vue'
import {
  AttendanceUpsertFormSubmitDocument,
} from '../../../../generated/composition'
import { DateTime } from 'luxon'

export default Vue.extend({
  name: 'title-bar',
  components: {
    UpsertForm,
  },
  data () {
    return {
      dialog: false,
      formValue: null,
    }
  },
  methods: {
    async handleSubmit () {
      await this.$apollo.mutate({
        mutation: AttendanceUpsertFormSubmitDocument,
        variables: {
          input: {
            attendableId: this.formValue.attendable,
            startsAt: this.formValue.timeRange ? DateTime.fromISO(this.formValue.timeRange.start).toISO() : null,
            endsAt: this.formValue.timeRange ? DateTime.fromISO(this.formValue.timeRange.end).toISO() : null,
          }
        }
      })

      this.dialog = false
    }
  }
})
</script>

<template lang="pug">
  dialog-button(
    button-dark
    button-colour='primary'
    v-model='dialog'
  )
    template(v-slot:button)
      | Open me

    template
      v-card
        v-card-title
          | Record your attendance
        v-card-subtitle
          | If you want to edit an existing record, just select the same event
        v-card-text
          upsert-form(v-model='formValue', @submit='handleSubmit')

        v-card-actions
          v-btn(
            text
            color='error',
            @click.stop='dialog = false'
          ) Cancel

          v-spacer

          v-btn(
            @click.stop='handleSubmit'
          ) Submit
</template>
