<script lang="ts">
import Vue from 'vue'

import RolesCrud from './role-crud/index.vue'

export default Vue.extend({
  components: {
    RolesCrud,
  }
})
</script>

<template lang="pug">
  roles-crud
</template>
