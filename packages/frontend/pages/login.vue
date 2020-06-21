<template lang="pug">
  v-layout(column, justify-center, align-center)
    v-flex(xs12, sm8, md6)
      v-card
        v-card-title.headline
          | Authentication
        v-card-text
          p.
            Please log in with your VRChat account. Your username and password will not be
            stored or transmitted through this app.
        v-card-actions
          v-btn(primary, nuxt, to='/login')
            | Log In
</template>
