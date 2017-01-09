
import defaults from 'superagent-defaults'
import request from 'superagent-bluebird-promise'

import { authToken } from 'utils/auth'

const defaultRequest = defaults(request)

export const setRequestDefaults = () => {
  const token = authToken()

  if (token) {
    defaultRequest.set('Authorization', `Bearer ${token}`)
  } else {
    defaultRequest.set('Authorization', '')
  }

  if (__DEV__) {
    defaultRequest.on('request', (req) => {
      if (req.url[0] === '/') {
        req.url = `http://localhost:3000${req.url}`
      }
    })
  }
}

export default defaultRequest
