import { baseRecord } from 'models'

export class SearchResult extends baseRecord({
}) {
}

export default (obj) => {
  const { id, attributes } = obj
  return new SearchResult({ id, ...attributes })
}
