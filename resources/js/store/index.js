import Vue from 'vue'
import Vuetify from 'vuetify';
import Vuex from 'vuex'
import general from './modules'
import auth from '../components/Auth/modules'
import router from 'vue-router'

Vue.use(Vuex)
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

const store = new Vuex.Store({
  modules: {
    general: general,
    auth: auth,
  }
})

store.dispatch('auth/setToken').then(() => {

  store.dispatch('auth/fetchUser').catch(() => {
    store.dispatch('auth/clearAuth')
    router.replace({ name: 'login' })
  })

}).catch(() => {
      store.dispatch('auth/clearAuth')
})

export default store
