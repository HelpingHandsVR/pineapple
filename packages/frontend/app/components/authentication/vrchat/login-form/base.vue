<script lang="ts">
import Vue from 'vue'

export type LoginFormData = {
  username: string,
  password: string,
  totp?: string,
}

export default Vue.extend({
  props: {
    showTotp: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      formData: {
        username: '',
        password: '',
        totp: '',
      },
      valid: false,
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate()

      if (!this.valid) {
        return null
      }

      this.$emit('submit', this.formData)
    }
  },
  computed: {
    rules () {
      return {
        username: [
          (v: string) => !!v || 'Username is required',
          (v: string) => v.length <= 15 || 'Username must be at most 15 characters long',
        ],
        password: [
          (v: string) => !!v || 'Password is required'
        ],
        totp: [
          (v: string) => !!v || 'Your account requires two factor authentication'
        ],
      }
    }
  }
})
</script>

<template lang="pug">
  v-form(
    ref='form'
    v-model='valid'
    @submit.prevent='handleSubmit'
  )
    v-text-field(
      v-model='formData.username'
      label='Username / E-mail address'
      required
      :disabled='loading || showTotp'
      :rules='rules.username'
    )
    v-text-field(
      v-model='formData.password'
      label='Password'
      type='password'
      required
      :disabled='loading || showTotp'
      :rules='rules.password'
    )
    v-text-field(
      v-model='formData.totp'
      label='Two factor token'
      required
      v-if='showTotp'
      :rules='rules.totp'
      :disabled='loading'
    )

    v-btn(color='primary', type='submit', :loading='loading')
      | Log in
</template>
