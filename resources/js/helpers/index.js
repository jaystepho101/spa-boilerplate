import { isEmpty } from 'lodash'
import store from '../store/modules/state.js'
window.axios = require('axios');

export const setHttpToken = (token) => {

	axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
	axios.defaults.headers.common['_token'] = getCsrf()
	axios.defaults.headers.common['X-Authorization'] = getApi()
	axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
	if (isEmpty(token)) {
    window.axios.defaults.headers.common['Authorization'] = null
	}
    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

}

export function getApi () {
  return store.general.api
}

export function getCsrf () {
  return store.general.csrf
}
