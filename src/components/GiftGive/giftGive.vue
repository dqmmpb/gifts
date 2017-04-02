<template>
  <div>
    <scroller lock-x scrollbar-y use-pullup use-pulldown height="100%" :pulldownConfig="pulldownConfig" :pullupConfig="pullupConfig" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div>
        <card v-for="item in getGiftGives" :key="item.id">
          <div slot="content" class="card-padding">
            <group>
              <cell :title="item.date" :value="'[' + item.type + ']' + item.status" class="no-before first"></cell>

              <cell :title="cardSecond(item)" :value="'￥' + item.money" class="with-before second"></cell>

              <cell :title="cardThird(item)" class="no-before">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                <div slot="value">
                  <router-link :to="{path:'give/detail',query: {giftId:item.id}}"><x-button mini type="warn" class="btn-detail">查看详情</x-button></router-link>
                </div>
              </cell>
            </group>
          </div>
        </card>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="status.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
        <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/giftGiveStore'
import store from '../../store'
(!store.state.giftGive) && store.registerModule('giftGive', moduleStore)

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
    ...mapGetters(['isLoading', 'getGiftGives', 'getGiftGivesCurrentPage', 'getGiftGivesTotalCount'])
  },
  methods: {
    ...mapActions(['queryGiftGives']),
    cardSecond (item) {
      if (item.gifts && item.gifts.length > 0) {
        return item.gifts[0].gift + '×' + item.gifts[0].num
      }
    },
    cardThird (item) {
      return '"' + item.name + '"' + item.type
    },
    loadMore () {
      let self = this
      if (!self.isLoading) {
        console.log('loadMore... ' + self.getGiftGivesCurrentPage + 1)
        this.queryGiftGives({pageIndex: self.getGiftGivesCurrentPage + 1, pageSize: 10}).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scroller.donePullup()
            }, 10)
          })
        })
      }
    },
    refresh () {
      let self = this
      if (!self.isLoading) {
        console.log('refresh... ' + 1)
        this.queryGiftGives({pageIndex: 1, pageSize: 10}).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scroller.donePulldown()
              this.$refs.scroller.enablePullup()
            }, 10)
          })
        })
      }
    },
    initPage () {
      let self = this
      if (!self.isLoading) {
        this.queryGiftGives({pageIndex: self.getGiftGivesCurrentPage || 1, pageSize: 10})
      }
    }
  },
  data () {
    return {
      pageSize: 10,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      pulldownConfig: {
        content: '下拉刷新',
        downContent: '下拉刷新',
        upContent: '松开刷新',
        loadingContent: '正在刷新...'
      },
      pullupConfig: {
        height: 1,
        content: '上拉加载',
        downContent: '上拉加载',
        upContent: '松开加载',
        loadingContent: '正在加载...'
      }
    }
  },
  mounted () {
    console.log('[Activitys Page] mounted')
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
