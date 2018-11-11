import { isEmpty } from 'lodash'
window.localforage = require('localforage')
import { mapMutations, mapActions } from 'vuex'
import { setHttpToken } from '../../helpers'
import store from './state'

export const changeTheData = ({ commit }, data) => {
  commit('changeData', data)
}

export const setHeader = ({ commit }, data) => {
  setHttpToken()
}
