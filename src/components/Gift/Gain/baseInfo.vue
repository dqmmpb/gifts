<template>
  <div>
    <div v-if="getBaseInfo" class="open-red" id="open-red">
      <div class="userinfo">
        <div class="user-picture"><img :src="getHeadImg()"/></div>
        <div class="user-red">您收到了一个来自"{{launcher()}}"的礼物红包</div>
        <div v-if="getBaseInfo.giftStatus === 1" class="red-message">礼物有价，心意无价</div>
        <div v-if="getBaseInfo.giftStatus === 10" class="red-message">您来晚了，红包已经被领完</div>
      </div>
      <div v-if="getBaseInfo.giftStatus === 1" class="open" @click="openHandler" :class="{ opend: taking }">開</div>
      <div v-if="getBaseInfo.giftStatus === 10" class="red-message">
        <router-link :to="{path:'/gift/gainInfo',query: {shareCode: shareCode}}"><x-button type="warn" class="btn-normal btn-inverse btn-fill padding0px0px border30px btn-go-detail" action-type="button">查看领取详情>></x-button></router-link>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/gainStore'
import store from '../../../store'
(!store.state.gainStore) && store.registerModule('gainStore', moduleStore)

import { Tabbar, TabbarItem, Scroller, Group, Cell, Card, XButton, Spinner } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Scroller,
    Group,
    Cell,
    Card,
    XButton,
    Spinner
  },
  computed: {
    ...mapGetters(['getBaseInfo', 'isTaking'])
  },
  methods: {
    ...mapActions(['queryBaseInfo', 'giftTake']),
    toAddressList () {
      const shareCode = this.$route.query.shareCode
      if (shareCode) {
        return '/giftAddress?shareCode=' + shareCode + '&redirectUrl=' + encodeURIComponent(this.$route.fullPath)
      } else {
        return '/giftAddress?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
      }
    },
    toLogistics () {

    },
    toQrCode () {
      return '/qrcode'
    },
    launcher () {
      let nickName = this.getBaseInfo ? this.getBaseInfo.nickName : 0
      return nickName
    },
    getHeadImg (item) {
      let headImg = this.getBaseInfo ? this.getBaseInfo.head_img : ''
      let defaultImg = 'data:image/jpg;base64,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'
      if (/^(data:image)|(http)/.test(headImg)) {
        return headImg
      } else {
        return defaultImg
      }
    },
    openHandler () {
      let self = this
      const shareCode = this.$route.query.shareCode
      if (shareCode) {
        if (!self.isTaking) {
          self.taking = true
          this.giftTake({shareCode: shareCode}).then(data => {
            console.log(data)
            if (data) {
              if (data.rc === 101001) {
                self.$vux.toast.show({
                  text: '已经领过了，请不要重复领取',
                  type: 'text'
                })
              } else if (data.rc === 111201) {
                self.$vux.toast.show({
                  text: '您来晚了，红包已经被领完',
                  type: 'text'
                })
              }
              this.$nextTick(() => {
                setTimeout(function () {
                  self.taking = self.isTaking
                }, 1200)
              })
            }
          })
        }
      }
    },
    refresh () {
      console.log('refresh... ' + 1)
      const shareCode = this.$route.query.shareCode
      if (shareCode) {
        this.queryBaseInfo({shareCode: shareCode}).then(() => {
          this.$nextTick(() => {
          })
        })
      }
    },
    initPage () {
      if (this.$route.query) {
        const shareCode = this.$route.query.shareCode
        if (shareCode) {
          this.shareCode = shareCode
          this.queryBaseInfo({shareCode: shareCode}).then(() => {
            this.$nextTick(() => {
            })
          })
        }
      }
    }
  },
  data () {
    return {
      taking: false,
      shareCode: null
    }
  },
  mounted () {
    console.log('[GainInfo Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

@import '~vux/src/styles/1px.less';

.weui-panel {
  &:before, &:after {
    display: none;
  }
}

@import './gift.less';

.weui-btn {
  &.btn-go-detail {
    width: 120px;
    font-size: 12px;
  }
}

</style>
