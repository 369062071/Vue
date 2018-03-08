import storage from 'good-storage'

const FQ_ID = '__FQID__'

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function saveFq (query) {
  let searches = storage.get(FQ_ID, [])
  insertArray(searches, query, item => {
    return item === query
  }, 1)
  storage.set(FQ_ID, searches)
  return searches
}

export function loadFq () {
  return storage.get(FQ_ID, [])
}
