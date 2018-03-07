import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SRATCH_MAX_LENGTH = 5
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

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, item => {
    return item === query
  }, SRATCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
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
