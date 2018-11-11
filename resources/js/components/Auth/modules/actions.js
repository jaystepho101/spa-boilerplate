import { isEmpty } from 'lodash'
window.localforage = require('localforage')
import { setHttpToken } from '../../../helpers'
import router from 'vue-router'
import Route from '../../../router/index'
import beforeEach from '../../../router/beforeEach'
import { mapMutations, mapActions } from 'vuex'
import store from './state'

export const register = ({ commit, dispatch }, { payload, context }) => {
     return axios.post(laroute.route('register'), payload).then((response) => {
       dispatch('setToken', response.data.access_token).then(() => {
             commit('unAuthorised', false)
             dispatch('fetchUser')
       }).catch((error) => {
         context.errors = error
         dispatch('rejectAuth')
       })
     }).catch((error) => {
       console.log('failed 4')
       context.errors = error
     })
}

export const login = ({ commit, dispatch }, { payload, context }) => {
     return axios.post(laroute.route('login'), payload).then((response) => {
       dispatch('setToken', response.data.access_token).then(() => {
             commit('unAuthorised', false)
             dispatch('fetchUser')
       }).catch((error) => {
         context.errors = error
         dispatch('rejectAuth')
       })
     }).catch((error) => {
       console.log('failed 4')
       context.errors = error
     })
}

export const setToken = ({ commit, dispatch }, token) => {
	if (isEmpty(token)) {
      return dispatch('checkTokenExists').then((token) => {

         setHttpToken(token)

      }).catch((error) => {
        console.log('failed 2')
        throw 'Unauthorised'
   	 })
	}

    commit('setToken', token)

    setHttpToken(token)

}

export const checkTokenExists = ({ commit, dispatch }, token) => {

   return localforage.getItem('authtoken').then((token) => {

      if (isEmpty(token)) {
      	 return Promise.reject('NO_STORAGE_TOKEN');
      }

   	  return Promise.resolve(token)
   }).catch((error) => {
     dispatch('clearAuth')
     return router.replace({ name: 'login' })
   })

}

export const fetchUser = ({ commit, dispatch }) => {

    return axios.get(laroute.route('user')).then((response) => {
      dispatch('setUser', response.data).then(() => {
        commit('setAuthenticated', true)
      })
    }).catch((error) => {
      dispatch('rejectAuth')
    })

}

export const setUser = ({ commit }, data) => {
  commit('setUserData', data)
}

export const clearAuth = ({ commit, dispatch }, token) => {
   commit('setAuthenticated', false)
   commit('setUserData', null)
   commit('setToken', null)
   setHttpToken(null)
}

export const logout = ({ dispatch }) => {

  return axios.post(laroute.route('logout')).then((response) => {
    dispatch('rejectAuth').then(() => {
      localforage.setItem('intended', 'dashboard').catch((error) => {})
      Route.beforeEach(beforeEach)
    }).catch((error) => {
    })

  }).catch((error) => {
    context.errors = error
  })

}


// errors

export const rejectAuth = ({ dispatch, commit }) => {
  commit('unAuthorised', true)
  dispatch('clearAuth')
}

// errors
