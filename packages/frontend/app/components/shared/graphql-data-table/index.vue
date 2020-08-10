<script lang="ts">
import Vue from 'vue'
import { PaginationInputOrder, PaginationInput } from '../../../../generated/composition'

type Data = {
  currentPage: number,
  itemsPerPage: number,
  serverItemsLength: number,
  variables: {
    pagination: PaginationInput,
  }
}

const ownSlots = [
  'crud-actions'
]

export default Vue.extend({
  inheritAttrs: false,
  props: {
    query: {
      type: Object,
      required: true,
    },
    getResult: {
      type: Function,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    itemsPerPageOptions: {
      type: Array,
      required: false,
      default () {
        return [10, 15, 30, 50]
      }
    }
  },
  data (): Data {
    return {
      currentPage: 1,
      itemsPerPage: 15,
      serverItemsLength: Infinity,
      variables: {
        pagination: {
          limit: 15,
          order: PaginationInputOrder.Asc,
          afterCursor: null,
          beforeCursor: null,
        }
      },
    }
  },
  computed: {
    footerProps () {
      return {
        pageText: '',
        itemsPerPageOptions: this.itemsPerPageOptions,
      }
    },

    // We pass all slots to v-data-table, except a few ones that we declared
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
  },
  methods: {
    updatePagination (info: any, result: any) {
      if (!result) {
        return null
      }

      const isNext = info.page > this.currentPage
      const isPrev = info.page < this.currentPage
      const isSize = info.itemsPerPage !== this.itemsPerPage

      // If we're not changing pages, don't do anything
      if (!isNext && !isPrev && !isSize) {
        return null
      }

      const newVariables: Data['variables'] = {
        pagination: {
          limit: info.itemsPerPage,
          afterCursor: isNext ? result.cursor.afterCursor : null,
          beforeCursor: isPrev ? result.cursor.beforeCursor : null,
          order: PaginationInputOrder.Asc,
        }
      }

      this.variables = newVariables
      this.currentPage = info.page
      this.itemsPerPage = info.itemsPerPage
    },

    onResult (response: any) {
      // Update the pagination info when we get results from the API, so that
      // left and right buttons can be disabled/enabled properly
      if (!response || !response.data) {
        return null
      }

      const result = this.getResult(response.data)

      if (!result) {
        return null
      }

      if (result.data.length < this.itemsPerPage) {
        // We've reached the last page

        this.serverItemsLength = this.currentPage * this.itemsPerPage
      } else {
        this.serverItemsLength = Infinity
      }
    }
  }
})
</script>

<style lang="scss">
// While this component is mounted, every other v-data-table
// will also stretch (style isn't scoped), but that's fine as
// this table should be the only one in use when it's shown
.graphql-data-table {
  height: 100%;
  max-height: calc(100vh - 4rem);

  .v-data-table__wrapper {
    height: calc(100% - 8rem);
    overflow-y: scroll;
  }

  .v-data-footer {
    > .v-data-footer__pagination {
      display: none;
    }
  }
}
</style>

<template lang="pug">
  apollo-query(
    :query='query'
    :variables='variables'
    notify-on-network-status-change
    tag=''
    @result='onResult'
    fetch-policy='cache-and-network'
  )
    template(v-slot='{result: {data, loading}}')
      v-data-table.graphql-data-table(
        :loading='loading'
        loadingText='Fetching data...'
        :server-items-length='serverItemsLength'
        :items-per-page='15'
        :items='data ? getResult(data).data : []'
        :headers='headers'
        @pagination='(info) => updatePagination(info, getResult(data))'
        fixed-header
        disable-sort
        :footer-props='footerProps'
        v-bind='$attrs'
        @click:row='(data) => $emit("click:row", data)'
        @contextmenu:row='(event) => $emit("contextmenu:row", event)'
        @dblclick:row='(event) => $emit("dblclick:row", event)'
      )
        template(v-slot:top, v-if='title')
          v-toolbar.pr-4.pl-4(flat, color='secondary', dark)
            v-toolbar-title {{title}}
            v-spacer
            slot(name='crud-actions')

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
</template>
