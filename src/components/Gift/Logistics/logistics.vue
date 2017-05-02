<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerLogistics">
      <div>
        <div v-if="getGainDetail">
          <card>
            <div slot="content" class="card-logistics">
              <group>
                <cell :title="firstTitle(getGainDetail)" :value="firstValue(getGainDetail)" class="no-before first"></cell>

                <cell :title="secondTitle(getGainDetail)" :value="secondValue(getGainDetail)" class="with-before second"></cell>
              </group>
              <img src="../../../assets/logistics-bottom.png" class="logistics-bottom">
            </div>
          </card>

          <div class="weui-panel weui-panel_access logistics">
            <div class="weui-panel__hd">订单{{getLogisticsOrderNo}}的物流信息</div>
            <div v-if="getLogisticsList" >
              <div class="weui-panel__bd" v-for="item in getLogisticsList" :key="item.id">
                <div class="ct">
                  <div class="weui-media-box__title info">{{item.context}}</div>
                  <p class="weui-media-box__desc date">{{item.time}}</p>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="sorry">
                <img src="../../../assets/sorry.png" class="sorry-img">
                <div class="sorry-text">暂无任何物流信息</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="sorry">
            <img src="../../../assets/sorry.png" class="sorry-img">
            <div class="sorry-text">暂无订单信息</div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/logisticsStore'
import store from '../../../store'
(!store.state.logisticsStore) && store.registerModule('logisticsStore', moduleStore)

import moduleGainStore from '../Gain/bll/gainStore'
(!store.state.gainStore) && store.registerModule('gainStore', moduleGainStore)

import { Scroller, Group, Cell, Card, XButton, Spinner, Panel } from 'vux'

export default {
  components: {
    Scroller,
    Group,
    Cell,
    Card,
    XButton,
    Spinner,
    Panel
  },
  computed: {
    ...mapGetters(['getGainDetail', 'getLogisticsList', 'getLogisticsOrderNo'])
  },
  methods: {
    ...mapActions(['queryGainDetail', 'queryLogisticsList']),
    firstTitle (item) {
      return item.gainTime
    },
    firstValue (item) {
      return '[订单号]' + item.nickName
    },
    secondTitle (item) {
      return '[收货人] 收货地址'
    },
    secondValue (item) {
      return '￥' + item.goodsPrice
    },
    refresh () {
      let self = this
      if (!self.isLoading) {
        console.log('refresh... ' + 1)
        const deliveryId = this.$route.query.deliveryId
        if (deliveryId) {
          // this.queryGainDetail({deliveryId: Number(deliveryId)})
          this.queryLogisticsList({deliveryId: Number(deliveryId)}).then(() => {
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.scrollerLogistics.donePulldown()
              }, 10)
            })
          })
        }
        console.log(this.getLogisticsList)
      }
    },
    initPage () {
      console.log(this.$route)

      if (this.$route.query) {
        const deliveryId = this.$route.query.deliveryId
        if (deliveryId) {
          // this.queryGainDetail({deliveryId: Number(deliveryId)})
          this.queryLogisticsList({deliveryId: Number(deliveryId)})
        }
        console.log(this.getLogisticsList)
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
    console.log('[Logistics Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './logistics.less';

</style>
