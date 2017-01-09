
import jwtDecode from 'jwt-decode'
import store from 'store'

import { setRequestDefaults } from 'utils/request'

export const AUTH_TOKEN_KEY = 'authToken'

export const authToken = () => {
  return store.get(AUTH_TOKEN_KEY)
}

export const setAuthToken = (token) => {
  store.set(AUTH_TOKEN_KEY, token)
}

export const removeAuthToken = () => {
  store.remove(AUTH_TOKEN_KEY)
}

export const hasSession = () => {
  return authToken()
}

export const loadSession = (setUser, dispatch) => {
  const token = authToken()
  setRequestDefaults()
  if (token && token !== '') {
    const userObj = userObjFromToken(token)
    if (dispatch) return dispatch(setUser(userObj))
    return setUser(userObj)
  }
  return setUser()
}

export const clearSession = (setUser, dispatch) => {
  removeAuthToken()
  setRequestDefaults()
  if (dispatch) {
    dispatch(setUser().clear())
  } else {
    setUser().clear()
  }
}

export const userObjFromToken = (token) => {
  return jwtDecode(token)
}

export const userFromStore = (reduxStore) => {
  if (!reduxStore) return undefined
  const { user } = reduxStore

  if (!user) return undefined

  const userList = user.get('data')
  return userList.first()
}
