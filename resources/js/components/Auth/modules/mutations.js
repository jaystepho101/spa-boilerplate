import { isEmpty } from 'lodash'

export const setToken = (state, token) => {

	if (isEmpty(token)) {
   		localforage.removeItem('authtoken', token).catch((error) => {

	 	 })

   		return
	}

   localforage.setItem('authtoken', token).catch((error) => {

	 })

}

export const setAuthenticated = (state, trueOrFalse) => {


  state.user.authenticated = trueOrFalse


}

export const unAuthorised = (state, trueOrFalse) => {


  state.user.denied = trueOrFalse


}

export const generalError = (state, trueOrFalse) => {


  state.user.error = trueOrFalse


}

export const setUserData = (state, data) => {

    state.user.data = data

}
