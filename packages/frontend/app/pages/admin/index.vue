<script lang="ts">
import Vue from 'vue'

import AdminContainer from '../../components/containers/admin/index.vue'

export default {
  layout: 'default',
  middleware: ['auth'],
  components: {
    AdminContainer,
  }
}
</script>

<template lang="pug">
  admin-container
</template>
