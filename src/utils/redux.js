import { fromJS, List, Map, OrderedMap } from 'immutable'

export const newList = (arr, { fromTemplate }) => {
  if (!fromTemplate) {
    fromTemplate = fromJS
  }
  return List(arr.map((item) => {
    return fromTemplate(item)
  }))
}

export const mergeList = (list, arr, { key, fromTemplate, merge }) => {
  if (merge) return merge(list, arr, { key, fromTemplate })
  if (!key) return list.merge(newList(arr, { fromTemplate }))
  if (!fromTemplate) {
    fromTemplate = fromJS
  }

  // TODO look into using .mergeWith method
  let tempMap = OrderedMap()
  list.forEach((item) => {
    const k = item.get(key)
    tempMap = tempMap.set(k, item)
  })
  arr.forEach((item) => {
    const k = item[key]
    const tempItem = tempMap.get(k)
    if (tempItem) {
      tempMap = tempMap.set(k, tempItem.merge(fromTemplate(item)))
    } else {
      tempMap = tempMap.set(k, fromTemplate(item))
    }
  })
  return tempMap.toList()
}

export const actionObj = (name, status, data) => {
  return {
    type: `${name}_${status}`,
    name,
    status,
    ...data
  }
}

class SuccussAction {
  constructor() {
    this.method = 'update'
    this.status = 'default'
  }

  setStateStatus(name=this.name, component=this.component) {
    if (name && component) {
      component.setState({
        [name]: this.status,
      })
    }
    this.name = name
    this.component = component
  }

  pending() {
    this.status = 'pending'
    this.setStateStatus()
  }

  success() {
    this.status = 'success'
    this.setStateStatus()
  }

  error() {
    this.status = 'error'
    this.setStateStatus()
  }

  set() {
    this.method = 'set'
  }

  update() {
    this.method = 'update'
  }

  clear() {
    this.method = 'clear'
  }
}

export const actionCreator = (name, func, options={}) => {
  return (...params) => {
    return (dispatch, getState) => {
      const successAction = new SuccussAction();
      (async () => {
        successAction.pending()
        dispatch(actionObj(name, 'pending'))
        try {
          let res = await func(...params)
          if (res.constructor.name === 'Response') {
            res = res.body
          }
          successAction.success()
          dispatch(actionObj(name, 'success', {
            ...options,
            _successAction: successAction,
            payload: res
          }))
        } catch (err) {
          successAction.error()
          dispatch(actionObj(name, 'error', { error: err }))
        }
      })()
      return successAction
    }
  }
}

export const createReducer = (actionName, { key, fromTemplate, merge }={}) => {
  return (state = Map({ data: List() }), action) => {
    const {
      name,
      status,
      payload,
      type,
      error,
      _successAction,
      successTemplate,
      successMerge,
      ...rest,
    } = action
    if (actionName !== name) return state

    if (status === 'success') {
      let { data } = payload
      if (typeof data === 'object' && data.constructor.name !== 'Array') {
        data = [data]
      }

      const meta = payload.meta || {}
      if (_successAction.method === 'set') {
        return state.merge({
          data: newList(data, { fromTemplate }),
          status,
          ...meta,
          ...rest
        })
      } else if (_successAction.method === 'update') {
        return state.merge({
          data: mergeList(state.get('data'), data, {
            key,
            fromTemplate: successTemplate || fromTemplate,
            merge: successMerge || merge,
          }),
          status,
          ...meta,
          ...rest
        })
      } else if (_successAction.method === 'clear') {
        return state.merge({
          data: List(),
          status,
          ...meta,
          ...rest
        })
      }
    }

    return state.merge({ status, error, ...rest })
  }
}
