import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // vuex自带插件，每次修改state，它会在我们的控制台打印一个logger

Vue.use(Vuex)

// 调试工具，检测对 state 的修改是不是通过 mutation，不是则会报错
// 如果是 npm run dev,NODE_ENV就是dev环境，如果是 npm run build,就是production环境
// 开发环境使用
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
