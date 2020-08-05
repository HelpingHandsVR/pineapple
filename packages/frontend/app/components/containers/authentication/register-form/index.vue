<script lang="ts">
import Vue from 'vue'
import {mapMutations} from 'vuex'

import RegisterFormBase, { RegisterFormData } from './base.vue'

import {
  RegisterFormRegisterDocument,
  User,
} from '../../../../../generated/composition'

export default Vue.extend({
  components: {
    RegisterFormBase,
  },
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    onRegisterComplete () {
      this.loading = false
      this.$emit('to-login')
      return null
    },
    async handleFormSubmit (credentials: RegisterFormData) {
      this.loading = true

      const initialResult = await this.$apollo.mutate({
        mutation: RegisterFormRegisterDocument,
        variables: {
          input: {
            email: credentials.email,
            password: credentials.password,
            display: credentials.display,
          }
        },
      })

      if (initialResult.data.registerFormRegister && initialResult.data.registerFormRegister.id) {
        return this.onRegisterComplete()
      }

      this.loading = false
    },
    handleLogin () {
      this.$emit('to-login')
    }
  },
})
</script>

<template lang="pug">
  register-form-base(
    @submit='handleFormSubmit'
    :loading='loading'
    @to-login='handleLogin'
  )
</template>
