<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'time-range',
  props: {
    value: {
      type: Object,
      required: true,
    },
    min: {
      type: String,
      required: false,
    },
    max: {
      type: String,
      required: false,
    },
    restrictMin: {
      type: Boolean,
      required: false,
      default: false,
    },
    restrictMax: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods: {
    onChange (side: 'start' | 'end', newValue: string) {
      this.$emit('input', {
        start: side === 'start' ? newValue : this.value.start,
        end: side === 'end' ? newValue : this.value.end,
      })
    },
    getActualMin (time: string): string | void {
      if (this.restrictMin) {
        return time
      }
    },
    getActualMax (time: string): string | void {
      if (this.restrictMax) {
        return time
      }
    },
  }
})
</script>

<template lang="pug">
  v-row(justify='space-around', align='center')
    v-col(cols='auto')
      h2 From:
      v-time-picker(
        :value='value.start'
        :max='getActualMax(value.end)'
        :min='min'
        @input='(value) => onChange("start", value)'
        width='200px'
      )

    v-col(cols='auto')
      h2 To:
      v-time-picker(
        :value='value.end'
        :min='getActualMin(value.start)'
        :max='max'
        @input='(value) => onChange("end", value)'
        width='200px'
      )
</template>
