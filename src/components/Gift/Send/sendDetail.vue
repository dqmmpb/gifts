<template>
  <div>
<!--    <scroller lock-x scrollbar-y use-pulldown height="100%" :pulldownConfig="pulldownConfig" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div>-->
        <card v-if="getSendDetail">
          <div slot="content" class="card-padding">
            <group>
              <cell :title="firstTitle(getSendDetail)" :value="firstValue(getSendDetail)" class="no-before first"></cell>

              <cell :title="secondTitle(getSendDetail)" :value="secondValue(getSendDetail)" class="with-before second"></cell>

<!--              <div class="with-before second">
                <cell v-for="item in getSendDetail.gifts" :key="item.id" :title="item.gift" :value="'×' + item.num" class="no-before"></cell>
              </div>-->

              <cell class="with-before cell-padding">
                <div slot="value">
                  <router-link v-if="getSendDetail.isDelivered === 0" :to="{path:'/giftAddress',query: {giftId:getSendDetail.id}}"><x-button mini type="warn" class="btn-detail">选择收货地址</x-button></router-link>
                  <router-link v-else :to="{path:'/logistics',query: {deliveryId:getSendDetail.id}}"><x-button mini type="warn" class="btn-detail">查看物流详情</x-button></router-link>
                </div>
              </cell>
            </group>
          </div>
        </card>
<!--      </div>
    </scroller>-->

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
              this.$refs.scroller.donePulldown()
            }, 10)
          })
        })
      }
    },
    initPage () {
      console.log(this.$route)

      if (this.$route.query) {
        const giftId = this.$route.query.giftId
        if (giftId) {
          console.log(giftId)
          this.querySendDetail({giftId: Number(giftId)})
        }
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
    console.log('[SendDetail Page] mounted')
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

  .second {
    padding: 12px 15px 7px 15px;
    .weui-cell {
      padding: 3px 0;
    }
  }

  .btn-detail {
    font-size: 12px;
    line-height: 1.8;
    padding: 0 0.8em;
    border-radius: 0;
    vertical-align: middle;
    background-color: #fff;
    color: #ff2c4c;
    &:after {
       border-color: #ff2c4c;
       border-radius: 0;
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

</style>
