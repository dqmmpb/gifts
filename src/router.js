// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const lazyLoading = (path) => () => System.import(`components/${path}.vue`)

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
  path: '/gift/logistics',
  name: '物流详情',
  component: lazyLoading('Gift/Logistics/logistics')
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
  path: '/gift/wantToOrder',
  name: '确认订单',
  component: lazyLoading('Gift/WantTo/wantToOrder')
},
{
  path: '/gift/wantToPayResult',
  name: '支付成功',
  component: lazyLoading('Gift/WantTo/wantToPayResult')
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

export default router
