// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

const lazyLoading = (path) => () => System.import(`components/${path}.vue`)

Vue.use(VueRouter)
import App from './App'
import Vuex from 'vuex'
Vue.use(Vuex)

import zhCN from 'vee-validate/dist/locale/zh_CN'

import VeeValidate, { Validator } from 'vee-validate'

// Add locale helper.
Validator.addLocale(zhCN)

// Install the Plugin and set the locale.
Vue.use(VeeValidate, {
  locale: 'zh_CN'
})

require('es6-promise').polyfill()

import store from './store'

store.registerModule('vux', {
  state: {
    appScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updatePosition (state, payload) {
      state.appScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateAppPosition ({commit}, top) {
      commit({type: 'updateAppPosition', top: top})
    }
  }
})

// plugins
import { LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)

// test
if (process.env.platform === 'app') {
  Vue.use(AppPlugin, store)
}

const FastClick = require('fastclick')
FastClick.attach(document.body)

const routes = [{
  path: '/mainPage',
  name: '礼物说',
  component: lazyLoading('mainPage')
}, {
  path: '/addressList',
  name: '收货地址',
  component: lazyLoading('Address/addressList')
},
{
  path: '/addressAdd',
  name: '新增收货地址',
  component: lazyLoading('Address/addressAdd')
},
{
  path: '/addressEdit',
  name: '编辑收货地址',
  component: lazyLoading('Address/addressEdit')
},
{
  path: '/giftAddress',
  name: '选择收货地址',
  component: lazyLoading('Gift/giftAddress')
},
{
  path: '/gift/gainList',
  name: '收到的礼物',
  component: lazyLoading('Gift/Gain/gain')
},
{
  path: '/gift/gainInfo',
  name: '收到的礼物详情',
  component: lazyLoading('Gift/Gain/gainInfo')
},
{
  path: '/gift/baseInfo',
  name: '礼物详情',
  component: lazyLoading('Gift/Gain/baseInfo')
},
{
  path: '/gift/sendList',
  name: '送出的礼物',
  component: lazyLoading('Gift/Send/send')
},
{
  path: '/gift/sendDetail',
  name: '送出的礼物详情',
  component: lazyLoading('Gift/Send/sendDetail')
},
{
  path: '/logistics',
  name: '物流详情',
  component: lazyLoading('Logistics/logistics')
},
{
  path: '/gift/askForGive/detail',
  name: '讨礼物详情',
  component: lazyLoading('Gift/AskFor/askForGiveDetail')
},
{
  path: '/gift/wantToGive',
  name: '送礼物',
  component: lazyLoading('Gift/WantTo/wantToGive')
},
{
  path: '/gift/recommendList',
  name: '选礼物',
  component: lazyLoading('Gift/WantTo/recommendList')
},
{
  path: '/gift/wantToShare',
  name: '分享送礼物',
  component: lazyLoading('Gift/WantTo/wantToShare')
},
{
  path: '/gift/askForGive',
  name: '讨礼物',
  component: lazyLoading('Gift/AskFor/askForGive')
},
{
  path: '/gift/askForShare',
  name: '分享讨礼物',
  component: lazyLoading('Gift/AskFor/askForShare')
},
{
  path: '/qrcode',
  name: '关注公众号',
  component: lazyLoading('Gift/qrCode')
}]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({y: 0}), // 这个功能只在 HTML5 history 模式下可用
  routes
})

sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
      // history.removeItem(fromIndex)
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
