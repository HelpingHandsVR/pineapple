<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'

import CreateForm from './create-form.vue'
import {
  AdminRoleCrudCreateDocument
} from '../../../../../generated/composition'

export default Vue.extend({
  name: 'adin-role-crud-title-bar',
  components: {
    CreateForm,
  },
  data () {
    return {
      AdminRoleCrudCreateDocument,
      dialog: false,
      formValue: null,
    }
  },
  computed: {
    variables () {
      if (!this.formValue) {
        return null
      }

      return {}
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
    text
    max-width='1200px'
  )
    template(v-slot:button)
      v-icon.mr-2 mdi-plus
      | Create role

    template
      v-card
        v-card-title
          | Create a new role

        apollo-mutation(
          :mutation='AdminRoleCrudCreateDocument'
          :variables='variables'
          @done='handleMutationDone'
        )
          template(v-slot='{mutate, loading, error}')
            v-card-text
              create-form(
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
