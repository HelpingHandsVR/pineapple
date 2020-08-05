<script lang="ts">
import Vue from 'vue'
import {validate} from 'email-validator'

export type LoginFormData = {
  email: string,
  password: string,
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
      v-model='formData.email'
      label='E-mail address'
      required
      :disabled='loading'
      :rules='rules.email'
    )
    v-text-field(
      v-model='formData.password'
      label='Password'
      type='password'
      required
      :disabled='loading'
      :rules='rules.password'
    )

    v-row
      v-col
        v-btn(color='primary', type='submit', :loading='loading')
          | Log in

      v-spacer

      v-col.d-flex.justify-end
        v-btn(color='primary', text, @click.stop='$emit("to-register")')
          | Register
          v-icon mdi-arrow-right
</template>
