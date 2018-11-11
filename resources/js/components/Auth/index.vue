<template>
  <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="padding-20">
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <Login/>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  import Login from './Pages/Login'
  export default {
    components: {
      Login
    }
  }
</script>
