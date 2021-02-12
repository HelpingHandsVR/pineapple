<script lang="ts">
import Vue from 'vue'

import { DateTime } from 'luxon'

const ownSlots: string[] = []

export default Vue.extend({
  inheritAttrs: false,
  props: {
    query: {
      type: Object,
      required: true,
    },
    disableEmpty: {
      type: Boolean,
      required: false,
      default: false,
    },
    search: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoSelectFirst: {
      type: Boolean,
      required: false,
      default: false,
    },
    hint: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: false,
    },
    order: {
      type: String,
      required: false,
      default: 'ASC'
    },
    orderBy: {
      type: String,
      required: false,
      default: 'id'
    }
  },
  data () {
    return {
      variables: {
        pagination: {
          limit: 10,
          order: this.order,
          orderBy: this.orderBy,
        },
        where: {
          // Request only events that are currently running or ones that have
          // ended at most 4 hours ago
          endsAt: {
            before: DateTime.local().endOf('week').toISO()
          },
          startsAt: {
            after: DateTime.local().startOf('week').toISO()
          }
        },
        search: ''
      }
    }
  },
  methods: {
    shouldDisable (items: any[]) {
      return items.length === 0 && this.disableEmpty
    },

    onResult (response: any) {
      if (!this.autoSelectFirst || !response.data) {
        return null
      }

      // If the autoSelectFirst prop is set and we have data, set our current
      // value to the first result for better UX

      const result = response.data.list?.data

      if (!result || result.length === 0) {
        return null
      }

      const [first] = result

      if (!first) {
        return null
      }

      this.$emit('input', first.value)
    }
  },
  computed: {
    menuProps () {
      return {
        overflowY: !this.search,
        maxHeight: this.search ? '600px' : null
      }
    },

        // We pass all slots to v-select, except a few ones that we declared
    slots () {
      const clone = {
        ...this.$slots,
      }

      ownSlots.forEach((slotName) => {
        if (clone[slotName]) {
          Reflect.deleteProperty(clone, slotName)
        }
      })

      return clone
    },

    scopedSlots () {
      const clone = {
        ...this.$scopedSlots,
      }

      ownSlots.forEach((slotName) => {
        if (clone[slotName]) {
          Reflect.deleteProperty(clone, slotName)
        }
      })

      return clone
    }
  }
})
</script>

<style lang="scss" scoped>
  .search-root {
    z-index: 2;
    position: sticky;
    top: 10px;
  }
</style>

<template lang="pug">
  apollo-query(
    :query='query'
    :variables='variables'
    notify-on-network-status-change
    tag=''
    fetch-policy='cache-and-network'
    deep
    :throttle='1000'
    @result='onResult'
  )
    template(v-slot='{result: {data, loading}}')
      v-select.select-root(
        v-bind='$attrs'
        :items='data ? data.list.data : []'
        :loading='loading'
        :disabled='loading || shouldDisable(data ? data.list : [])'
        no-data-text='No data'
        :menu-props='menuProps'
        @input='(value) => $emit("input", value)'
        :value='value'
      )
        slot(v-for='(_, name) in slots', :name='name', :slot='name')

        template(
          v-for="(_, name) in scopedSlots"
          :slot="name"
          slot-scope="slotData"
        )
          slot(
            :name="name"
            v-bind="slotData"
          )

        template(v-if='search', v-slot:prepend-item)
          v-container.pt-0.pb-0.search-root
            v-text-field(
              outlined
              placeholder='Search...'
              v-model='variables.search'
              :hint='hint'
              :persistent-hint='Boolean(hint)'
            )

          v-progress-linear.mt-2.mb-2(:indeterminate='loading')
</template>
