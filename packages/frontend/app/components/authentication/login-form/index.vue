<script lang="ts">
import Vue from 'vue'
import {mapMutations} from 'vuex'

import LoginFormBase, { LoginFormData } from './base.vue'

import {
  LoginFormLoginDocument,
  User,
} from '../../../../generated/composition'

export default Vue.extend({
  components: {
    LoginFormBase,
  },
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapMutations({
      setLoggedIn: 'auth/setLoggedIn'
    }),
    onLoginComplete () {
      this.loading = false
      this.setLoggedIn(true)
      this.$router.push('/')
      return null
    },
    async handleFormSubmit (credentials: LoginFormData) {
      this.loading = true

      if (credentials.email && credentials.password) {
        const initialResult = await this.$apollo.mutate({
          mutation: LoginFormLoginDocument,
          variables: {
            email: credentials.email,
            password: credentials.password,
          },
        })

        if (initialResult.data.loginFormLogin && initialResult.data.loginFormLogin.id) {
          // Login is complete, two-factor isn't enabled on the account
          return this.onLoginComplete()
        }

        // Login is successful but the session needs to be elevated using two
        // factor
        this.loading = false
      }
    }
  },
})
</script>

<template lang="pug">
  login-form-base(
    @submit='handleFormSubmit'
    :loading='loading'
  )
</template>
