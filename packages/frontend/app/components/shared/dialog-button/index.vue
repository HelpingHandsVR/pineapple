<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'dialog-button',
  inheritAttrs: false,
  props: {
    buttonColour: {
      type: String,
      required: false,
      default: 'primary',
    },
    buttonDark: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<template lang="pug">
  v-dialog(
    :value='value'
    max-width='600px'
    persistent
    @input='(value) => $emit("input", value)'
  )
    template(v-slot:activator='{ on, attrs }')
      v-btn(
        :color='buttonColour'
        :dark='buttonDark'
        v-bind='{...attrs, ...$attrs}'
        v-on='on'
      )
        slot(name='button')

    slot(name='default')
</template>
