<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="100%" :pulldownConfig="pulldownConfig" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div v-if="getGainDetail">
        <card>
          <div slot="content" class="card-padding">
            <!--<group>-->
              <!--<div v-if="getGainDetail.address" class="with-before address">-->
                <!--<cell :title="getGainDetail.name + ' ' + getGainDetail.phone" class="no-before first"></cell>-->
                <!--<cell :title="getGainDetail.address.state + '' + getGainDetail.address.streetAddress" class="no-before second"></cell>-->
              <!--</div>-->
            <!--</group>-->
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
              <img src="../../assets/sorry.png" class="sorry-img">
              <div class="sorry-text">暂无任何物流信息</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="sorry">
          <img src="../../assets/sorry.png" class="sorry-img">
          <div class="sorry-text">暂无订单信息</div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/logisticsStore'
import store from '../../store'
(!store.state.logisticsStore) && store.registerModule('logisticsStore', moduleStore)

import moduleGainStore from '../Gift/Gain/bll/gainStore'
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
                this.$refs.scroller.donePulldown()
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
      },
      pulldownConfig: {
        content: '下拉刷新',
        downContent: '下拉刷新',
        upContent: '松开刷新',
        loadingContent: '正在刷新...'
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

@import '~vux/src/styles/1px.less';

.xs-container {
  min-height: 100%;
}
.weui-panel {
  &:before, &:after {
    display: none;
  }
}
.card-padding {

  .weui-cells {
    margin-top: 0;
    font-size: 14px;

    &:before, &:after {
      display: none;
    }
  }

  .weui-cell.no-before {
    &:before {
      display: none !important;
    }
  }
  .weui-cell.with-before {
    &:before {
      left: 0;
    }
    &.cell-padding {
      &:before {
        left: 15px;
        right: 15px;
      }
    }
  }

  .address {
    padding: 5px 15px 5px 15px;
    & .weui-cell.first {
      font-size: 12px;
      padding: 5px 0 0 0;
    }
    & .weui-cell.second {
      font-size: 10px;
      padding: 0 0 5px 0;
    }
  }

  .btn-detail {
    font-size: 12px;
    line-height: 1.8;
    padding: 0 0.8em;
    border-radius: 0;
    vertical-align: middle;
    background-color: #fff;
    color: #E64340;
    &:after {
       border-color: #E64340;
       border-radius: 0;
    }
  }
}

.logistics {
  & .weui-panel__hd {
    color: #000;
    font-size: 12px;
    padding: 5px 15px;
    &:after {
      display: none;
     }
  }

& .weui-panel__bd {
& .ct {
    margin-left: 20px;
  margin-right: 20px;
    position: relative;
    margin-bottom: 7px;

&:before {
   content: '';
   position: absolute;
   top: 6px;
   left: 1px;
   width: 4px;
   height: 4px;
   background: #ddd;
   border-radius: 50%;
 }

&:after {
   content: '';
   position: absolute;
   top: 12px;
   left: 2px;
   bottom: 0;
   width: 2px;
   height: 100%;
   background: #ddd;
 }
}
&:first-child .ct {
   color: #F70968;
 & .info, & .date {
  color: #F70968;
   }
&:before {
   content: '';
   position: absolute;
   top: 4px;
   left: 0;
   width: 6px;
   height: 6px;
   background: #F70968;
   border-radius: 50%;
 }
}

& .info {
    font-size: 11px;
    font-weight: normal;
    padding-left: 1em;
    overflow: visible;
    text-overflow: normal;
    white-space: normal;
  }
& .date {
    font-size: 10px;
    padding-left: 1em;
    padding-bottom: 15px;
  }
}
}

.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}
.pullup-arrow {
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
.router-view {
  height: 100%;
}
.sorry {
  padding: 50px 0 100px;
  text-align: center;
  .sorry-img {
    width: 160px;
    display: block;
    font-size: 0;
    margin: 0 auto;
  }
  .sorry-text {
    font-size: 14px;
    color: #ddd;
  }
}

</style>
