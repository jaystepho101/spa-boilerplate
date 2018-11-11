<template>

  <div>

      <v-toolbar app class="elevation-0" color="primary" dark>
         <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
         <v-toolbar-title>TS77</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-toolbar-items class="hidden-sm-and-down">
           <v-btn flat>My Work</v-btn>
           <v-btn flat>Store</v-btn>
           <v-btn flat>About Me</v-btn>
           <v-btn flat>Subscribe</v-btn>
           <v-btn flat to="login" v-if="!user.authenticated">Login</v-btn>
           <v-btn flat to="register" v-if="!user.authenticated">Register</v-btn>
           <v-btn
               :loading="loading"
               :disabled="loading"
               @click.native="loader = 'loading'"
               @click="loading = !loading, logout().then(() => {
                   loading = !loading
                   $router.replace({ name: 'login' })
                })" v-if="user.authenticated"
               flat
             >
               Log Out
           </v-btn>

         </v-toolbar-items>
       </v-toolbar>

       <v-navigation-drawer
         v-model="drawer"
         absolute
         temporary
         dark
       >
        <Drawer/>
      </v-navigation-drawer>

    </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Drawer from './Drawer'
  export default {
    components: {
      Drawer
    },
    data() {
      return {
        drawer: false,
        loader: null,
        loading: false,
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },
    methods: {
      ...mapActions({
        logout: 'auth/logout'
      })
    }
  }
</script>
