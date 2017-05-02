<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerSendDetail">
      <div>
        <card v-if="getSendDetail">
          <div slot="content" class="card-send">
            <group>
              <cell :title="firstTitle(getSendDetail)" :value="firstValue(getSendDetail)" class="no-before first"></cell>

              <cell :title="secondTitle(getSendDetail)" :value="secondValue(getSendDetail)" class="with-before"></cell>

<!--              <div class="with-before second">
                <cell v-for="item in getSendDetail.gifts" :key="item.id" :title="item.gift" :value="'×' + item.num" class="no-before"></cell>
              </div>-->

              <cell class="with-before cell-padding">
                <div slot="value">
                  <router-link v-if="getSendDetail.isDelivered === 0" :to="{path:'/giftAddress',query: {giftId:getSendDetail.id}}"><x-button mini type="warn" class="btn-detail">选择收货地址</x-button></router-link>
                  <router-link v-else :to="{path:'/gift/logistics',query: {deliveryId:getSendDetail.id}}"><x-button mini type="warn" class="btn-detail">查看物流详情</x-button></router-link>
                </div>
              </cell>
            </group>
          </div>
        </card>
      </div>
    </scroller>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/sendStore'
import store from '../../../store'
(!store.state.sendStore) && store.registerModule('sendStore', moduleStore)

import { Scroller, Group, Cell, Card, XButton, Spinner } from 'vux'

export default {
  components: {
    Scroller,
    Group,
    Cell,
    Card,
    XButton,
    Spinner
  },
  computed: {
    ...mapGetters(['getSendDetail'])
  },
  methods: {
    ...mapActions(['querySendDetail']),
    firstTitle (item) {
      return item.sendTime
    },
    firstValue (item) {
      return '[订单号]' + item.nickName
    },
    secondTitle (item) {
      return item.goodsName
    },
    secondValue (item) {
      return '￥' + item.goodsPrice
    },
    refresh () {
      console.log('refresh... ' + 1)
      const giftId = this.$route.query.giftId
      if (giftId) {
        this.querySendDetail({giftId: Number(giftId)}).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scrollerSendDetail.donePulldown()
            }, 10)
          })
        })
      }
    },
    initPage () {
      if (this.$route.query) {
        const giftId = this.$route.query.giftId
        if (giftId) {
          console.log(giftId)
          this.querySendDetail({giftId: Number(giftId)}).then(() => {
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.scrollerSendDetail.reset()
              }, 10)
            })
          })
        }
      }
    }
  },
  data () {
    return {
      status: {
        pulldownStatus: 'default'
      }
    }
  },
  mounted () {
    console.log('[SendDetail Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './send.less';

</style>
