<script lang="ts">
import LoginForm from '../components/authentication/login-form/index.vue'

export default {
  middleware: [
    'no-auth',
  ],
  components: {
    LoginForm,
  }
}
</script>

<template lang="pug">
  v-layout(column, justify-center, align-center)
    v-flex(xs12, sm8, md6)
      v-card.mb-3
        v-card-title.headline
          | Authentication
        v-card-text.
          Please log in with your VRChat account. Your username and password will not be
          stored in this app.

      v-card
        v-card-title.headline
          | Log in
        v-card-text
          login-form
</template>
