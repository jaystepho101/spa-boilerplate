<template>
  <v-layout>

      <v-flex xs12 sm6 offset-sm3>
        <v-card class="padding-20">
          <v-card-title>
            <span class="headline">Register</span>
          </v-card-title>
          <Register/>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  import Register from '../Pages/Register'
  export default {
    components: {
      Register
    },

  }
</script>
