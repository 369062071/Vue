// 从getters里面取数据到组件中

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currenntSong = (state) => {
  return state.playlist[state.currentIdndex] || {}
}
