<script lang="ts">
import Vue from 'vue'

import UpsertForm from './upsert-form.vue'
import {
  AttendanceUpsertFormSubmitDocument,
} from '../../../../generated/composition'
import { DateTime } from 'luxon'

export default Vue.extend({
  name: 'attendance-title-bar',
  props: {
    selected: {
      type: Array,
      required: true,
    }
  },
  components: {
    UpsertForm,
  },
  data () {
    return {
      AttendanceUpsertFormSubmitDocument,
      dialog: false,
      deleteDialog: false,
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
        }
      }
    }
  },
  methods: {
    handleMutationDone () {
      this.dialog = false
    },

    relativeDate (datetime: string) {
      return DateTime.fromISO(datetime).toRelative()
    }
  }
})
</script>

<style lang="scss" scoped>
  .titlebar-root {
    display: contents
  }
</style>

<template lang="pug">
  .titlebar-root
    dialog-button(
      button-dark
      button-colour='primary'
      v-model='dialog'
      text
    )
      template(v-slot:button)
        v-icon.mr-2 mdi-clock-check
        | Enter time

      template
        v-card
          v-card-title
            | Enter time for an event
          v-card-subtitle
            | Which event did you attend this week?
          apollo-mutation(
            :mutation='AttendanceUpsertFormSubmitDocument'
            :variables='variables'
            @done='handleMutationDone'
          )
            template(v-slot='{mutate, loading, error}')
              v-card-text.pl-6.pr-6
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
                  text
                  color='primary'
                  @click.stop='mutate'
                  :loading='loading'
                ) Submit

    dialog-button(
      button-dark
      button-colour='error'
      v-model='deleteDialog'
      v-if='selected.length !== 0'
      icon
    )
      template(v-slot:button)
        v-icon mdi-delete

      template
        v-card
          v-card-title
            | Delete {{selected.length}} item{{selected.length === 1 ? '' : 's'}}?
          v-card-subtitle
            | Please confirm that you want to delete these attendance records below:
          v-card-text
            v-list
              v-list-item.pr-0.pl-0(
                v-for='record in selected'
                :key='record.id'
              )
                v-list-item-avatar
                  v-icon mdi-timeline-clock
                v-list-item-content
                  v-list-item-title
                    | {{record.attendable.name}}
                  v-list-item-subtitle
                    | {{relativeDate(record.startsAt)}}

          v-card-actions
            v-btn(
              text
              color='black',
              @click.stop='deleteDialog = false'
            ) Cancel

            v-spacer

            v-btn(
              text
              color='error'
            ) Delete
</template>
