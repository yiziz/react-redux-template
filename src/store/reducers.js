import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { createReducer } from 'utils/redux'

import toSearchResultRecord from 'models/SearchResult'
import toUserRecord from 'models/user'
import toAccountRecord from 'models/account'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    account: createReducer('account', {
      fromTemplate: toAccountRecord,
      key: 'id',
    }),
    search: createReducer('search', {
      fromTemplate: toSearchResultRecord,
    }),
    user: createReducer('user', {
      fromTemplate: toUserRecord,
      key: 'id',
    }),
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
