import { actionCreator } from 'utils/redux'

import request from 'utils/request'

export const getAccount = () => {
  return request.get('/api/users')
}

export const setAccount = actionCreator('account', getAccount)
