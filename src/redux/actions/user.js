import { actionCreator } from 'utils/redux'

export const userData = (data) => {
  return { data }
}

export const setUser = actionCreator('user', userData)
