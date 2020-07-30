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
      AttendanceUpsertFormSubmitDocument,
      dialog: false,
      formValue: null,
    }
  },
  computed: {
    variables () {
      if (!this.formValue) {
        return null
      }

      return {
        input: {
          attendableId: this.formValue.attendable,
          startsAt: this.formValue.timeRange ? DateTime.fromISO(this.formValue.timeRange.start).toISO() : null,
          endsAt: this.formValue.timeRange ? DateTime.fromISO(this.formValue.timeRange.end).toISO() : null,
        }
      }
    }
  },
  methods: {
    handleMutationDone () {
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
        apollo-mutation(
          :mutation='AttendanceUpsertFormSubmitDocument'
          :variables='variables'
          @done='handleMutationDone'
        )
          template(v-slot='{mutate, loading, error}')
            v-card-text
              upsert-form(
                v-model='formValue',
                @submit='mutate'
              )

            template(v-if='error')
              v-banner(
                single-line
                color='error'
                dark
                v-for='(graphQLError, index) in error.graphQLErrors'
                :key='index'
              )
                | {{graphQLError.message}}

            v-card-actions
              v-btn(
                text
                color='error',
                @click.stop='dialog = false'
              ) Cancel

              v-spacer

              v-btn(
                @click.stop='mutate'
                :loading='loading'
              ) Submit
</template>
