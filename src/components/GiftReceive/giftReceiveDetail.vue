<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="100%" :pulldownConfig="pulldownConfig" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div>
        <card v-if="getGiftReceiveDetail">
          <div slot="content" class="card-padding">
            <group>
              <cell :title="getGiftReceiveDetail.date" :value="'[订单号]' + getGiftReceiveDetail.orderNo" class="no-before first"></cell>

              <div class="with-before second">
                <cell v-for="item in getGiftReceiveDetail.gifts" :key="item.id" :title="item.gift" :value="'×' + item.num" class="no-before"></cell>
              </div>

              <cell class="with-before cell-padding">
                <div slot="value">
                  <router-link v-if="getGiftReceiveDetail.status === 1" :to="{path:'/giftAddress',query: {giftId:getGiftReceiveDetail.id}}"><x-button mini type="warn" class="btn-detail">选择收货地址</x-button></router-link>
                  <router-link v-else :to="{path:'/logistics',query: {giftId:getGiftReceiveDetail.id}}"><x-button mini type="warn" class="btn-detail">查看物流详情</x-button></router-link>
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

import moduleStore from './bll/giftReceiveDetailStore'
import store from '../../store'
(!store.state.giftReceiveDetail) && store.registerModule('giftReceiveDetail', moduleStore)

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
    ...mapGetters(['getGiftReceiveDetail'])
  },
  methods: {
    ...mapActions(['queryGiftReceiveDetail']),
    refresh () {
      let self = this
      if (!self.isLoading) {
        console.log('refresh... ' + 1)
        const giftId = this.$route.query.giftId
        const status = this.$route.query.status
        if (giftId) {
          this.queryGiftReceiveDetail({giftId: giftId, status: status}).then(() => {
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.scroller.donePulldown()
              }, 10)
            })
          })
        }
        console.log(this.getGiftReceiveDetail)
      }
    },
    initPage () {
      console.log(this.$route)

      if (this.$route.query) {
        const giftId = this.$route.query.giftId
        const status = this.$route.query.status
        if (giftId) {
          this.queryGiftReceiveDetail({giftId: giftId, status: status})
        }
        console.log(this.getGiftReceiveDetail)
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
    console.log('[GiftReceiveDetail Page] mounted')
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
    color: #E64340;
    &:after {
       border-color: #E64340;
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
