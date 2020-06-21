<script lang="ts">
import Vue from 'vue'
import LoginFormBase, { LoginFormData } from './base.vue'

export default Vue.extend({
  components: {
    LoginFormBase,
  },
  data () {
    return {
      totpNeeded: false,
    }
  },
  methods: {
    async handleFormSubmit (credentials: LoginFormData) {
      // this.$emit('submit', this.formData)
      console.log('logging in with', JSON.stringify(credentials, null, 2))

      console.log(this.$vrcapi.get)
    }
  }
})
</script>

<template lang="pug">
  login-form-base(
    @submit='handleFormSubmit'
  )
</template>
