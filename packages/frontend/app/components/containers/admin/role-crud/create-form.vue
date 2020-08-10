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
      AdminRoleCrudPermissionsDocument,
      formData: {
        permissions: [],
      }
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

    handleItemAdd (item: any) {
      this.formData.permissions.push(item)
    },

    getItemDisabled (item: any) {
      const index = this.formData.permissions.findIndex((addedItem: any) => {
        return addedItem.id === item.id
      })

      return index !== -1
    }
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
          template(v-slot:item='{ item }')
            v-list-item(@click.stop='handleItemAdd(item)', :disabled='getItemDisabled(item)')
              | can
              v-chip.ml-2(color='primary') {{item.action}}
              v-chip.ml-2(color='secondary') {{item.subject}}
            v-divider
      v-col
        v-data-table(
          :headers='headers'
          :items='formData.permissions'
        )
          template(v-slot:item='{ item }')
            v-list-item(@click.stop)
              | can
              v-chip.ml-2(color='primary') {{item.action}}
              v-chip.ml-2(color='secondary') {{item.subject}}
            v-divider
</template>
