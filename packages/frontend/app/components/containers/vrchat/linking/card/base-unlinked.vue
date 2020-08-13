<script lang="ts">
import Vue from 'vue'

const vrchatBackground = require('~/assets/vrchat-longart.jpg')
const vrchatBackgroundSmall = require('~/assets/vrchat-longart-small.jpg')

export default Vue.extend({
  name: 'vrchat-profile-card-base',
  data () {
    return {
      vrchatBackground,
      vrchatBackgroundSmall,
    }
  }
})
</script>

<template lang="pug">
  gradient-card(
    :src='vrchatBackground'
    :lazy-src='vrchatBackgroundSmall'
  )
    template(v-slot:image-content)
      | VRChat link

    template
      v-row(no-gutters)
        v-col
          v-badge.mr-2(
            color='error'
            icon='mdi-link-off'
            inline
            left
          )
            | Not linked yet

        v-col(align='end')
          v-btn(
            small
            text
            to='/linking/vrchat'
            nuxt
            disabled
          )
            | Link now
</template>
