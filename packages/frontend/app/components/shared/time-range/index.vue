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
  },
  methods: {
    onChange (side: 'start' | 'end', newValue: string) {
      this.$emit('input', {
        start: side === 'start' ? newValue : this.value.start,
        end: side === 'end' ? newValue : this.value.end,
      })
    }
  },
})
</script>

<template lang="pug">
  v-row(justify='space-around', align='center')
    v-col(cols='auto')
      h2 From:
      v-time-picker(
        :value='value.start'
        :max='value.end'
        :min='min'
        @input='(value) => onChange("start", value)'
        width='200px'
      )

    v-col(cols='auto')
      h2 To:
      v-time-picker(
        :value='value.end'
        :min='value.start'
        :max='max'
        @input='(value) => onChange("end", value)'
        width='200px'
      )
</template>
