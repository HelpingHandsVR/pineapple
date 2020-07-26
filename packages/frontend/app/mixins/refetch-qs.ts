import Vue, { ComponentOptions } from 'vue'

export const withQSRefetch = (queryName: string): ComponentOptions<Vue> => ({
  mounted (): void {
    if ('refetch' in this.$route.query) {
      this.$apollo.queries[queryName].refetch()

      const query = {
        ...this.$route.query,
      }

      Reflect.deleteProperty(query, 'refetch')

      this.$router.replace({ query })
    }
  },
})
