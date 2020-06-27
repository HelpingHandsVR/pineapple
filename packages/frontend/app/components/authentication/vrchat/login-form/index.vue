<script lang="ts">
import Vue from 'vue'
import {mapMutations} from 'vuex'

import LoginFormBase, { LoginFormData } from './base.vue'

import {
  VrcLoginDocument,
  VrChatLoginResult,
  VrcLoginTotpDocument
} from '../../../../../generated/composition'

export default Vue.extend({
  components: {
    LoginFormBase,
  },
  data () {
    return {
      totpNeeded: false,
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

      if (credentials.totp) {
        const result = await this.$apollo.mutate({
          mutation: VrcLoginTotpDocument,
          variables: {
            code: credentials.totp,
          }
        })

        if (result.data.vrcLogin.complete) {
          // Login is complete, two-factor successful
          return this.onLoginComplete()
        }
      }

      if (credentials.username && credentials.password) {
        const initialResult = await this.$apollo.mutate({
          mutation: VrcLoginDocument,
          variables: {
            username: credentials.username,
            password: credentials.password,
          },
        })

        if (initialResult.data.vrcLogin.authCookie) {
          // This is the only chance we have to store the auth cookie
          this.$apolloHelpers.onLogin(initialResult.data.vrcLogin.authCookie)
        }

        if (initialResult.data.vrcLogin.complete) {
          // Login is complete, two-factor isn't enabled on the account
          return this.onLoginComplete()
        }

        // Login is successful but the session needs to be elevated using two
        // factor
        this.totpNeeded = true
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
    :showTotp='totpNeeded'
  )
</template>
