<template>
  <div>
    <div v-if="user.authenticated">
      Hello {{ user.data.name }}!
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    }
  }
</script>
