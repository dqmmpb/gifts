<template>
  <div>
    <scroller v-if="getGainDetail" lock-x scrollbar-y use-pulldown height="-96" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div>
        <card v-if="getGainDetail">
          <div slot="content" class="card-padding">
            <group>
              <cell :title="firstTitle(getGainDetail)" :value="firstValue(getGainDetail)" class="no-before first"></cell>

              <cell :title="secondTitle(getGainDetail)" :value="secondValue(getGainDetail)" class="with-before second"></cell>


              <cell :title="thirdTitle(getGainDetail)" class="with-before cell-padding">
                <div slot="value">
                  <router-link v-if="getGainDetail.isDevlieried === 0" :to="toAddressList()"><x-button mini type="warn" class="btn-detail">请确认发货</x-button></router-link>
                  <router-link v-else :to="{path:'/logistics',query: {deliveryId:getGainDetail.id}}"><x-button mini type="warn" class="btn-detail">查看物流详情</x-button></router-link>
                </div>
              </cell>
            </group>
          </div>
        </card>

        <card v-if="getGainDetail">
          <div slot="content" class="card-padding">
            <group>
              <cell v-for="item in getGainDetail.gainUsers" :inline-desc="item.gainTime" :key="item.id" :title="forthTitle(item)" class="no-before">
                <img slot="icon" width="40" style="display:block;margin-right:5px;" :src="getHeadImg(item)">
                <div slot="value">
                  <span class="small">赠送了</span>
                  <span>"{{thirdValue(item)}}"</span>
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
    ...mapGetters(['getGainDetail'])
  },
  methods: {
    ...mapActions(['queryGainInfo']),
    toAddressList () {
      const shareCode = this.$route.query.shareCode
      if (shareCode) {
        return '/giftAddress?shareCode=' + shareCode + 'redirectUrl=' + encodeURIComponent(this.$route.fullPath)
      } else {
        return '/giftAddress?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
      }
    },
    firstTitle (item) {
      return item.goodsName
    },
    firstValue (item) {
      return item.leftAmount + '/' + item.totalAmount
    },
    secondTitle (item) {
      return item.goodsName
    },
    secondValue (item) {
      return item.goodsPrice
    },
    thirdTitle (item) {
      if (item.isDevlieried === 0) {
        return '您已领取'
      } else if (item.isDevlieried === 1) {
        return '已确认发货'
      }
    },
    thirdValue (item) {
      return item.goodsName
    },
    forthTitle (item) {
      return item.nickName
    },
    forthValue (item) {
      return item.goodsName
    },
    getHeadImg (item) {
      let defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
      if (/^(data:image)|(http)/.test(item.headImg)) {
        return item.headImg
      } else {
        return defaultImg
      }
    },
    refresh () {
      console.log('refresh... ' + 1)
      const shareCode = this.$route.query.shareCode
      if (shareCode) {
        this.queryGainInfo({shareCode: shareCode}).then(() => {
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
        const shareCode = this.$route.query.shareCode
        if (shareCode) {
          console.log(shareCode)
          this.queryGainInfo({shareCode: shareCode})
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
  .small {
    font-size: 80%;
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
