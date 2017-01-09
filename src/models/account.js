
import Immutable from 'immutable'

export const AccountRecord = Immutable.Record({
  id: null,
  tokens: [],
})

export default (accountObj) => {
  const { id, attributes } = accountObj
  return new AccountRecord({ id, ...attributes })
}
