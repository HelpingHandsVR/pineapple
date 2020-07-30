<script lang="ts">
import AttendanceContainer from '../../components/containers/attendance/index.vue'

export default {
  layout: 'flush',
  middleware: ['auth'],
  components: {
    AttendanceContainer,
  }
}
</script>

<template lang="pug">
  attendance-container
</template>
