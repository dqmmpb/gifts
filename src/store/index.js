/**
 * Created by alphabeta on 16-12-13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import assign from 'assign-deep'

// Global Store
let globalStore = {}
assign(globalStore)

// 业务模块应当自己维护 good idea
// import version from './modules/version'
// const modules = {version}
let modules = {}

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
Vue.config.debug = debug

// TODO 优化一下
const store = new Vuex.Store({
  strict: debug,
  ...globalStore,
  modules
})

// or middlewares

export default store
