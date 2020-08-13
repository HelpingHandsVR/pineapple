<script lang="ts">
import LoginForm from '../components/containers/authentication/login-form/index.vue'
import RegisterForm from '../components/containers/authentication/register-form/index.vue'

const cardBackground = require('~/assets/pineapple-bg.jpg')

export default {
  layout: 'flush-guest',
  components: {
    LoginForm,
    RegisterForm,
  },
  data () {
    return {
      cardBackground,
      windowState: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
  .full-height {
    height: 100%
  }

  .constrain {
    max-width: 500px;
  }
</style>

<template lang="pug">
  v-layout.full-height(column, justify-center, align-center)
    gradient-card.constrain(
      :src='cardBackground'
    )
      template(v-slot:image-content)
        | Welcome!

      template
        | Please log in with your Pineapple account, or register here.
        v-window(v-model='windowState')
          v-window-item(key='login')
            login-form(@to-register='windowState = 1')

          v-window-item(key='register')
            register-form(@to-login='windowState = 0')
</template>
