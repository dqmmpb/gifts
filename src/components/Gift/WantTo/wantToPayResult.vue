<template>

  <div>
    <div v-if="getOrder" class="panel-padding">
      <div>支付成功</div>
      <card>
        <div slot="content">
          <group>
            <cell title="购买数量" :value="orderFee(getOrder)"></cell>
            <cell title="订单编号" :value="orderNo(getOrder)"></cell>
          </group>
        </div>
      </card>

      <div v-if="getGainDetail.isDevlieried === 0">
        <div class="gain-other">
          <div class="gain-panel text-align-center">
            <router-link v-if="getGainDetail.isDevlieried === 0" :to="toAddressList()">
              <x-button type="warn" class="btn-normal btn-default btn-fill padding5px0px border40px btn-address">填写收货地址</x-button>
            </router-link>
          </div>
        </div>
        <div>
          放弃填写地址，点击右上角可以将该商品转赠给朋友
        </div>
      </div>
      <div v-if="getGainDetail.isDevlieried === 1">
        <div class="gain-other">
          <div class="gain-panel text-align-center">
            <router-link :to="toQrCode()">
              <x-button type="warn" class="btn-normal btn-default padding5px0px border40px">关注公众号，查看物流信息>></x-button>
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="getGainDetail.isDevlieried === 2">
        <div class="gain-other">
          <div class="gain-panel text-align-center">
            <router-link :to="toQrCode()">
              <x-button type="warn" class="btn-normal btn-default padding5px0px border40px">关注公众号，获取更多惊喜>></x-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from '../Gain/bll/gainStore'
import store from '../../../store'
(!store.state.gainStore) && store.registerModule('gainStore', moduleStore)

import wechatUtil from '../../../common/wechatUtil'

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
    ...mapGetters(['getOrder'])
  },
  methods: {
    ...mapActions(['queryOrder']),
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
    orderFee (item) {
      return item.orderFee
    },
    orderNo (item) {
      return item.orderNo
    },
    refresh () {
      console.log('refresh... ')
      let self = this
      if (this.$route.query) {
        const orderNo = this.$route.query.orderNo

        self.queryOrder({orderNo: orderNo}).then(data => {
          let shareCode = data.shareCode
          wechatUtil.share({url: location.href}).then(data => {
            if (shareCode) {
              wechatUtil.configWantToShare(self, data, shareCode)
            } else {
              wechatUtil.config(self, data)
            }
          })

          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scrollerGainInfo.donePulldown()
            }, 10)
          })
        })
      }
    },
    initPage () {
      let self = this
      if (this.$route.query) {
        const orderNo = this.$route.query.orderNo

        self.queryOrder({orderNo: orderNo}).then(data => {
          let shareCode = data.shareCode
          wechatUtil.share({url: location.href}).then(data => {
            if (shareCode) {
              wechatUtil.configWantToShare(self, data, shareCode)
            } else {
              wechatUtil.config(self, data)
            }
          })

          this.$nextTick(() => {
            setTimeout(() => {
              self.$refs.scrollerRecommendList.reset()
            }, 10)
          })
        })
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('[GainInfo Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './payresult.less';

</style>
