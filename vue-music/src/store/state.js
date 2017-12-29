import {playMode} from '../common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false, // 全屏
  playlist: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence,
  currentIndex: -1 // 当前播放的索引
}

export default state
