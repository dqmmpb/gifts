<template>
  <div>
    <div class="panel-padding text-align-center">
      <div>分享链接获取成功</div>
      <div class="wechat">
        <img src="../../../assets/qrcode.png" class="qrcode">
        <div>已经为您生成分享链接，现在可以找好友助攻了</div>
      </div>
      <x-button type="warn" class="tabbar-button__btn" @click.native="getShareCode">分享至好友或者朋友圈</x-button>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

import moduleStore from './bll/askForStore'
import store from '../../../store'
(!store.state.askForStore) && store.registerModule('askForStore', moduleStore)

import wechatUtil from '../../../common/wechatUtil'

import { Tabbar, Group, Cell, XInput, XAddress, XTextarea, XButton } from 'vux'

export default {
  components: {
    Tabbar,
    Group,
    Cell,
    XInput,
    XAddress,
    XTextarea,
    XButton
  },
  methods: {
    ...mapActions(['share']),
    getShareCode () {
//      let self = this
//      if (this.$route.query) {
//        const shareCode = this.$route.query.shareCode
//        if (shareCode) {
//          self.share({url: location.href}).then(data => {
//            console.log(data)
//            this.$wechat.config({
//              debug: false,
//              appId: data.appid,
//              timestamp: parseInt(data.timestamp),
//              nonceStr: data.nonceStr,
//              signature: data.signature,
//              jsApiList: [
//                'onMenuShareAppMessage'
//              ]
//            })
//            this.$wechat.ready(function () {
//              this.$wechat.onMenuShareAppMessage({
//                title: '测试',
//                link: 'http://10.245.0.125:8080/hongbao/veiw/' + shareCode, // 分享链接
//                imgUrl: 'http://7xjclc.com2.z0.glb.qiniucdn.com/1002.png', // 分享图标
//                desc: '七夕爱发生—爱ta，爱car，银泰武林总店狂送1分洗车服务，快来领取！',
//                success: function () {
//                  // 用户确认分享后执行的回调函数
//                },
//                cancel: function () {
//                  // 用户取消分享后执行的回调函数
//                }
//              })
//            })
//          })
//        }
//      }
    },
    initPage () {
      let self = this

      wechatUtil.share({url: location.href}).then(data => {
        let shareCode
        if (self.$route.query) {
          shareCode = self.$route.query.shareCode
        }
        if (shareCode) {
          wechatUtil.configAskForShare(self, data, shareCode)
        } else {
          wechatUtil.config(self, data)
        }
      })
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('[Qrcode Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './../qrCode.less';

</style>
