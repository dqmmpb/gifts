<template>
  <div>
<!--    <scroller lock-x scrollbar-y use-pulldown height="100%" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div>-->
        <card v-if="getSendList" v-for="item in getSendList" :key="item.id">
          <div slot="content" class="card-padding">
            <group>
              <cell :title="firstTitle(item)" :value="firstValue(item)" class="no-before first"></cell>

              <div class="with-before second">
                <cell v-for="datalist in item.dataList" :key="datalist.id" :title="datalist" class="no-before"></cell>
              </div>

              <cell :title="thirdTitle(item)" class="with-before cell-padding">
                <div slot="value">
                  <!--<router-link v-if="item.isDelivered === 0" :to="{path:'/giftAddress',query: {giftId:item.id}}"><x-button mini type="warn" class="btn-detail">选择收货地址</x-button></router-link>-->
                  <router-link :to="{path:'/gift/sendDetail',query: {giftId:item.id}}"><x-button mini type="warn" class="btn-detail">查看详情</x-button></router-link>
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
    ...mapGetters(['getSendList'])
  },
  methods: {
    ...mapActions(['querySendList']),
    firstTitle (item) {
      return item.sendTime
    },
    firstValue (item) {
      return '[礼包]'
    },
    secondTitle (item) {
      return item.goodsName
    },
    secondValue (item) {
      return ''
    },
    thirdTitle (item) {
      return '已领取' + item.takeAmount + '份，剩余' + item.leftAmount + '份未领取'
    },
    thirdValue (item) {

    },
    refresh () {
      this.querySendList().then(() => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
          }, 10)
        })
      })
    },
    initPage () {
      this.querySendList()
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
    console.log('[Send Page] mounted')
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
.card-padding {

  .weui-cells {
    margin-top: 0;
    font-size: 14px;

    &:before, &:after {
      display: none;
    }
  }

.second {
  font-size: 12px;
  padding: 3px 15px 3px 15px;
.weui-cell {
  padding: 2px 0;
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

  .weui-cell.first {
    font-size: 12px;
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
