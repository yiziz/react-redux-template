import { actionCreator } from 'utils/redux'

export const searchResults = (res) => {
  return res.data || { data: [] }
}

export const receiveSearchResults = actionCreator('search', searchResults)
