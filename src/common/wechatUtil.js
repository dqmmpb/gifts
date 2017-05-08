/**
 * Created by alphabeta on 16-12-29.
 */

import http from './httpUtil'

const wechatConfig = {
  title: '鹅毛礼', // 分享标题
  link: 'http://192.168.2.123', // 分享链接
  shareLink: 'http://192.168.2.123/hongbao/view', // 分享链接
  imgUrl: 'http://7xjclc.com2.z0.glb.qiniucdn.com/1002.png', // 分享图标
  desc: '小小鹅毛礼，快来领取！' // 分享描述
}

/**
 * Wechat方法基类
 */2
const wechatUtil = {

  share ({url}) {
    let encodeURLShare = encodeURIComponent(url.split('#')[0])
    console.log(url.split('#')[0])
    return http.post(`general/wechatconfig/get?url=${encodeURLShare}`)
      .then(data => {
        return data.data
      })
  },

  giftPrePay ({ amounts, goodsIds, activeCode, pkgType }) {
    return http.post(`user/gift/prepay?activeCode=${activeCode}&pkgType=${pkgType}&amounts=${amounts}&goodsIds=${goodsIds}`)
      .then(data => {
        return data.data
      })
  },

  chooseWXPay (self, data, callback) {
    // 微信支付
    let param = {
      timestamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.packageStr,
      signType: data.signType,
      paySign: data.paySign,
      success: function (res) {
        if (typeof callback === 'function') {
          callback(res)
        }
      }
    }
    alert(JSON.stringify(param))
    self.$wechat.chooseWXPay(param)
  },

  config (self, data) {
    console.log('config')
    // 设置
    self.$wechat.config({
      debug: true,
      appId: data.appid,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'
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
    console.log('configWantToShare')
    // 设置
    self.$wechat.config({
      debug: true,
      appId: data.appid,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'
      ]
    })
    self.$wechat.ready(function () {
      console.log(wechatConfig.shareLink + '/' + shareCode)
      // 分享朋友圈
      self.$wechat.onMenuShareTimeline({
        title: wechatConfig.title, // 分享标题
        link: wechatConfig.shareLink + '/' + shareCode, // 分享链接
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
        link: wechatConfig.shareLink + '/' + shareCode, // 分享链接
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
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'
      ]
    })
    self.$wechat.ready(function () {
      // 分享朋友圈
      self.$wechat.onMenuShareTimeline({
        title: wechatConfig.title, // 分享标题
        link: wechatConfig.shareLink + '/' + shareCode, // 分享链接
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
        link: wechatConfig.shareLink + '/' + shareCode, // 分享链接
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
