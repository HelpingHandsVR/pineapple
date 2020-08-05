<script lang="ts">
import Vue from 'vue'

export default {

}
</script>

<template lang="pug">
  div
    can(I='CREATE' a='LESSON_SELF' pass-through v-slot='{ allowed }')
      | Result: {{allowed}}
</template>
