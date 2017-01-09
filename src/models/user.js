
import Immutable from 'immutable'

export const CurrentUserRecord = Immutable.Record({
  id: null,
  username: null,
  displayName: null,
  firstName: null,
  lastName: null,
  email: null,
  createdAt: null,
  updatedAt: null,
  exp: null,
})

export default (currentUser) => {
  return new CurrentUserRecord(currentUser)
}
