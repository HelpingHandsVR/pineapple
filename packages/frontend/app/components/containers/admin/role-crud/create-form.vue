<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'

import {
  Attendable,
  AdminRoleCrudPermissionsDocument
} from '../../../../../generated/composition'

export default Vue.extend({
  name: 'role-create-form',
  data () {
    return {
      valid: false,
      selected: [],
      AdminRoleCrudPermissionsDocument,
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Name',
          value: 'name',
        }
      ]
    }
  },
  methods: {
    getResult (data: any) {
      if (!data) {
        return []
      }

      return data ? data.permissions : []
    },
  }
})
</script>

<template lang="pug">
  v-form(v-model='valid')
    v-row
      v-col
        graphql-data-table(
          :query='AdminRoleCrudPermissionsDocument'
          :headers='headers'
          :get-result='getResult'
          title='Available permissions'
          :items-per-page-options='[10]'
        )
      v-col
        graphql-data-table(
          :query='AdminRoleCrudPermissionsDocument'
          :headers='headers'
          :get-result='getResult'
          title='Available permissions'
          :items-per-page-options='[10]'
        )
</template>
