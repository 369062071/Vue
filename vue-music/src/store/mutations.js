import * as types from './mutation-types'

const matutions = {
  // 方法名
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default matutions
