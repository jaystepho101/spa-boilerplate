import store from '../store'
import router from 'vue-router'

const beforeEach = ((to, from, next) => {

  store.dispatch('auth/checkTokenExists').then(() => {
      if (to.meta.guest) {
        next({ name: 'dashboard' })

        return
      }

          next()

  }).catch(() => {
    
      if (to.meta.needsAuth) {
        localforage.setItem('intended', to.name).catch((error) => {

        })

        next({ name: 'login' })

        return
      }

     next()
  })

})

export default beforeEach
