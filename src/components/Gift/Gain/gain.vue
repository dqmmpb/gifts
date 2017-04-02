<template>
  <div v-if="getGainList">
    <scroller lock-x scrollbar-y use-pulldown height="100%" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div>
        <card v-for="item in getGainList" :key="item.id">
          <div slot="content" class="card-padding">
            <group>
              <cell :title="firstTitle(item)" :value="firstValue(item)" class="no-before first"></cell>

              <cell :title="secondTitle(item)" :value="secondValue(item)" class="with-before second"></cell>

              <cell :title="thirdTitle(item)" class="no-before">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.headImg">
                <div slot="value">
                  <router-link :to="{path:'/gift/gainDetail',query: {giftId:item.id}}"><x-button mini type="warn" class="btn-detail">查看详情</x-button></router-link>
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

import moduleStore from './bll/gainStore'
import store from '../../../store'
(!store.state.gainStore) && store.registerModule('gainStore', moduleStore)

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
    ...mapGetters(['getGainList'])
  },
  methods: {
    ...mapActions(['queryGainList']),
    firstTitle (item) {
      return item.gainTime
    },
    firstValue (item) {
      let isDelivered = item.isDelivered === 0 ? '已发货' : (item.isDelivered === 1 ? '未发货' : '')
      if (item.giftSource === 0) {
        return '[赠送]' + isDelivered
      } else if (item.giftSource === 1) {
        return '[领取]' + isDelivered
      }
    },
    secondTitle (item) {
      return item.goodsName
    },
    secondValue (item) {
      return '￥' + item.goodsPrice
    },
    thirdTitle (item) {
      if (item.giftSource === 0) {
        return '"' + item.nickName + '"赠送'
      } else if (item.giftSource === 1) {
        return '从"' + item.nickName + '"讨来的礼包'
      }
    },
    thirdValue (item) {

    },
    refresh () {
      this.queryGainList().then(() => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
          }, 10)
        })
      })
    },
    initPage () {
      this.queryGainList()
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
    console.log('[GiftReceive Page] mounted')
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
  .weui-cell.second {
    padding: 15px 15px 10px 15px;
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
