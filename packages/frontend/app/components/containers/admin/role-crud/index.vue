<script lang="ts">
import Vue from 'vue'

import TitleBar from './title-bar.vue'

import {
  AdminRoleCrudTableDocument
} from '../../../../../generated/composition'

export default Vue.extend({
  components: {
    TitleBar,
  },
  data () {
    return {
      AdminRoleCrudTableDocument,
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Name',
          value: 'name'
        },
      ]
    }
  },
  methods: {
    getResult (data: Record<string, any>) {
      return data ? data.roles : null
    },
  }
})
</script>

<template lang="pug">
  graphql-data-table(
    :query='AdminRoleCrudTableDocument'
    :headers='headers'
    :get-result='getResult'
    title='Roles'
  )
    template(v-slot:crud-actions)
      title-bar
</template>
