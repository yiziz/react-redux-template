// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'

import Account from 'containers/Account'

import NotFound from './NotFound'

import { userFromStore } from 'utils/auth'

const onAppInit = (store) => {
  return () => {
  }
}

const loginRedirect = (store) => {
  return (nextState, replace) => {
    const user = userFromStore(store.getState())
    if (!user) {
      replace('/login')
    }
  }
}

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  onEnter: onAppInit(store),
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    { path: 'login', component: Login },
    { path: 'logout', component: Logout },
    { path: '*', component: NotFound },
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
