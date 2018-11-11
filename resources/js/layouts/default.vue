<template>
  <v-app>

    <Header/>

    <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
    </v-content>

    <v-footer app></v-footer>

  </v-app>
</template>

<script>
import Header from './Header'
export default {
  components: {
    Header
  },
  name: 'LayoutDefault',
}
</script>

<style>
  /* Padding */
    .no-padding {
      padding: 0 !important;
    }
    .padding-20 {
      padding: 20px;
    }
  /* Padding */
</style>
