/**
 * Created by alphabeta on 16-12-29.
 */

import http from './httpUtil'

const wechatConfig = {
  title: '鹅毛礼', // 分享标题
  link: 'http://emaoli.com', // 分享链接
  imgUrl: 'http://7xjclc.com2.z0.glb.qiniucdn.com/1002.png', // 分享图标
  desc: '小小鹅毛礼，快来领取！' // 分享描述
}

/**
 * Wechat方法基类
 */
const wechatUtil = {

  share ({url}) {
    return http.post(`general/wechatconfig/get?url=${url}`)
      .then(data => {
        return data.data
      })
  },

  giftPrePay ({ amounts, goodsIds }) {
    return http.post(`user/gift/prepay?amounts=${amounts}&goodsIds=${goodsIds}`)
      .then(data => {
        return data.data
      })
  },

  chooseWXPay (self, data) {
    // 微信支付
    self.$wechat.chooseWXPay({
      timestamp: parseInt(data.timestamp),
      nonceStr: data.nonceStr,
      package: data.packageStr,
      signType: data.signType,
      paySign: data.paySign,
      success: function (res) {
        // 支付成功后的回调函数
        self.$vux.toast.show({
          text: '支付成功',
          type: 'text'
        })
      }
    })
  },

  config (self, data) {
    // 设置
    self.$wechat.config({
      debug: false,
      appId: data.appid,
      timestamp: parseInt(data.timestamp),
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage'
      ]
    })
    self.$wechat.ready(function () {
      // 分享朋友圈
      self.$wechat.onMenuShareTimeline({
        title: wechatConfig.title, // 分享标题
        link: wechatConfig.link, // 分享链接
        imgUrl: wechatConfig.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })

      // 分享给朋友
      self.$wechat.onMenuShareAppMessage({
        title: wechatConfig.title, // 分享标题
        link: wechatConfig.link, // 分享链接
        imgUrl: wechatConfig.imgUrl, // 分享图标
        desc: wechatConfig.desc, // 分享描述
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  },

  configWantToShare (self, data, shareCode) {
    // 设置
    self.$wechat.config({
      debug: false,
      appId: data.appid,
      timestamp: parseInt(data.timestamp),
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage'
      ]
    })
    self.$wechat.ready(function () {
      // 分享朋友圈
      self.$wechat.onMenuShareTimeline({
        title: wechatConfig.title, // 分享标题
        link: 'http://192.168.1.104:8080/hongbao/view/' + shareCode, // 分享链接
        imgUrl: wechatConfig.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })

      // 分享给朋友
      self.$wechat.onMenuShareAppMessage({
        title: wechatConfig.title, // 分享标题
        link: 'http://192.168.1.104:8080/hongbao/view/' + shareCode, // 分享链接
        imgUrl: wechatConfig.imgUrl, // 分享图标
        desc: wechatConfig.desc, // 分享描述
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  },

  configAskForShare (self, data, shareCode) {
    self.$wechat.config({
      debug: false,
      appId: data.appid,
      timestamp: parseInt(data.timestamp),
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage'
      ]
    })
    self.$wechat.ready(function () {
      // 分享朋友圈
      self.$wechat.onMenuShareTimeline({
        title: wechatConfig.title, // 分享标题
        link: 'http://192.168.1.104:8080/hongbao/view/' + shareCode, // 分享链接
        imgUrl: wechatConfig.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })

      // 分享给朋友
      self.$wechat.onMenuShareAppMessage({
        title: wechatConfig.title, // 分享标题
        link: 'http://192.168.1.104:8080/hongbao/view/' + shareCode, // 分享链接
        imgUrl: wechatConfig.imgUrl, // 分享图标
        desc: wechatConfig.desc, // 分享描述
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  }
}

export default wechatUtil
