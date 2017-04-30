<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerGain">
      <div>
        <card v-if="getGainList" v-for="item in getGainList" :key="item.id">
          <div slot="content" class="card-gain">
            <group>
              <cell :title="firstTitle(item)" :value="firstValue(item)" class="no-before first"></cell>

              <cell :title="secondTitle(item)" :value="secondValue(item)" class="with-before second"></cell>

              <cell :title="thirdTitle(item)" class="with-before cell-padding third">
                <img slot="icon" width="25" style="display:block;margin-right:5px;" :src="getHeadImg(item)">
                <div slot="value" class="gain-footer-value">
                  <router-link v-if="item.giftSource === 0" :to="{path:'/gift/gainInfo',query: {shareCode:item.shareCode}}"><x-button mini type="warn" class="btn-detail">查看详情</x-button></router-link>
                  <router-link v-if="item.giftSource === 1" :to="{path:'/gift/askForGive/detail',query: {shareCode:item.shareCode}}"><x-button mini type="warn" class="btn-detail">查看详情</x-button></router-link>
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
      let isDelivered = item.isDelivered === 1 ? '已发货' : (item.isDelivered === 0 ? '未发货' : '')
      if (item.giftSource === 0) {
        return '[赠送]' + isDelivered
      } else if (item.giftSource === 1) {
        return '[礼物]' + isDelivered
      }
    },
    secondTitle (item) {
      return item.goodsName
    },
    secondValue (item) {
      return '×' + item.goodsPrice
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
    getHeadImg (item) {
      let defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
      if (/^(data:image)|(http)/.test(item.headImg)) {
        return item.headImg
      } else {
        return defaultImg
      }
    },
    refresh () {
      this.queryGainList().then(() => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scrollerGain.donePulldown()
          }, 10)
        })
      })
    },
    initPage () {
      this.queryGainList().then(() => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scrollerGain.reset()
          }, 10)
        })
      })
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
    console.log('[Gain Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import "./gain.less";

</style>
