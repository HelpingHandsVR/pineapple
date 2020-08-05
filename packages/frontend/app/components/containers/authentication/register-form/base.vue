<script lang="ts">
import Vue from 'vue'
import {validate} from 'email-validator'

export type RegisterFormData = {
  email: string,
  password: string,
  display: string,
}

export default Vue.extend({
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      formData: {
        email: '',
        password: '',
        passwordConfirm: '',
        display: '',
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
        email: [
          (v: string) => !!v || 'E-mail is required',
          (v: string) => validate(v) || 'Must be a valid e-mail address',
        ],
        password: [
          (v: string) => !!v || 'Password is required'
        ],
        passwordConfirm: [
          (v: string) => !!v || 'Password confirmation is required',
          (v: string) => v === this.formData.password || 'Password confirmation doesn\'t match password',
        ],
        username: [
          (v: string) => !!v || 'Username is required'
        ]
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
    v-row
      v-col
        v-text-field(
          v-model='formData.email'
          label='E-mail address'
          required
          :disabled='loading'
          :rules='rules.email'
        )

      v-col
        v-text-field(
          v-model='formData.display'
          label='Username'
          type='text'
          required
          :disabled='loading'
          :rules='rules.display'
        )

    v-text-field(
      v-model='formData.password'
      label='Password'
      type='password'
      required
      :disabled='loading'
      :rules='rules.password'
    )
    v-text-field(
      v-model='formData.passwordConfirm'
      label='Password confirmation'
      type='password'
      required
      :disabled='loading'
      :rules='rules.passwordConfirm'
    )

    v-row
      v-col
        v-btn(color='primary', type='submit', :loading='loading')
          | Register

      v-spacer

      v-col.d-flex.justify-end
        v-btn(color='primary', text, @click.stop='$emit("to-login")')
          v-icon mdi-arrow-left
          | Log in
</template>
