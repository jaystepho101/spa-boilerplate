<template>
  <div>
    {{ general.csrf }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        general: 'general/general'
      })
    }
  }
</script>
