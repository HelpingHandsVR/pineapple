<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

type Data = {
  timer: number,
}

export default Vue.extend({
  props: {
    timeout: {
      type: Number,
      default: 0
    }
  },
  data (): Data {
    return {
      timer: null,
    }
  },
  computed: mapGetters({
    first: 'ui/firstToast',
    all: 'ui/allToasts',
    show: 'ui/showToast',
  }),
  methods: mapMutations({
    dismiss: 'ui/dismissToast',
  }),
  watch: {
    first (newValue) {
      if (!this.timeout) {
        return null
      }

      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      if (newValue) {
        this.timer = setTimeout(() => this.dismiss(), 8000)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .toast-badge {
    position: absolute;
    left: 6px;
    top: 6px;
  }

  .contents {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .contents-row {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
</style>

<template lang="pug">
  v-snackbar(
    key='layout-toast'
    bottom
    right
    :value='show'
    :timeout='-1'
    @input='dismiss'
    :color='first ? first.type : null'
    multi-line
  )
    template(v-slot:action='{ attrs }', v-if='first')
      v-btn(color='accent', text, v-bind='attrs', @click='dismiss')
        | Close

    template(v-slot:default, v-if='first')
      v-badge.toast-badge(
        :content='all.length'
        color='accent'
        v-if='all.length !== 1'
        left
        transition="scale-transition"
      )

      p.contents.contents-row
        v-icon.mr-2
          | {{first.icon}}
        b {{first.title}}
      .contents
        | {{first.message}}
        small(v-if='first.occurrences > 1')
          | Occurred {{first.occurrences}} times
</template>
