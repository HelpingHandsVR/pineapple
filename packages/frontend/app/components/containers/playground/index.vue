<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'

// import {PlaygroundAttendablesDocument} from '../../../../generated/composition'

export default Vue.extend({
  name: 'dev-playground',
  data () {
    return {
      range: {
        start: null,
        end: null,
      },
    }
  }
  // data () {
  //   return {
  //     PlaygroundAttendablesDocument,
  //     selected: null,
  //   }
  // },
  // methods: {
  //   getResult (data: any) {
  //     if (!data) {
  //       return []
  //     }

  //     return data.attendables ? data.attendables.data : []
  //   },

  //   getDay (iso: string) {
  //     return DateTime.fromISO(iso).toLocaleString({
  //       weekday: 'long'
  //     })
  //   }
  // }
})
</script>

<template lang="pug">
  .playground
    time-range(v-model='range')
    | {{range}}

  //- graphql-select(
  //-   v-model='selected'
  //-   :query='PlaygroundAttendablesDocument'
  //-   :get-result='getResult'
  //-   placeholder='Select an event to log time for'
  //-   search
  //-   auto-select-first
  //-   hint='Showing past and current events for this week only'
  //- )
  //-   template(v-slot:item='{item}')
  //-     span
  //-       b {{item.text}}
  //-       | &nbsp;on {{getDay(item.startsAt)}}
</template>
