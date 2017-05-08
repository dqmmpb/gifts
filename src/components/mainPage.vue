<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerMainPage">
      <div>
        <div v-if="getActive">
          千里送鹅毛，礼轻情意重
        </div>
      </div>
    </scroller>


    <tabbar class="view-tabbar" slot="bottom">
      <tabbar-item v-if="getActive" :link="{path:'/gift/wantToGive', query:{ activeCode: getActive.activeCode, goodsId: getActive.goodsId }}" class="tabbar-button__btn">
        <span slot="label">查看鹅毛礼</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './Gift/WantTo/bll/wantToStore'
import store from '../store'
(!store.state.wantToStore) && store.registerModule('wantToStore', moduleStore)

import wechatUtil from '../common/wechatUtil'

import {Tabbar, TabbarItem, Scroller, Group, Cell, Card, XButton, Spinner} from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Scroller,
    Group,
    Cell,
    Card,
    XButton,
    Spinner
  },
  computed: {
    ...mapGetters(['getActive'])
  },
  methods: {
    ...mapActions(['queryActive']),
    refresh () {
      let self = this
      if (this.$route.query) {
        const activeCode = this.$route.query.activeCode
        if (activeCode) {
          self.queryActive({ activeCode: activeCode }).then(data => {
            console.log(data)
          }).catch(error => {
            console.log(error)
            self.$vux.toast.show({
              text: '活动号异常',
              type: 'text'
            })
          })
        } else {
          self.$vux.toast.show({
            text: '活动号异常',
            type: 'text'
          })
        }
      } else {
        self.$vux.toast.show({
          text: '活动号异常',
          type: 'text'
        })
      }

      wechatUtil.share({url: location.href}).then(data => {
        let shareCode
        if (self.$route.query) {
          shareCode = self.$route.query.shareCode
        }
        if (shareCode) {
          wechatUtil.configWantToShare(self, data, shareCode)
        } else {
          wechatUtil.config(self, data)
        }
      })

      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scrollerMainPage.donePulldown()
        }, 10)
      })
    },
    initPage () {
      let self = this
      if (this.$route.query) {
        const activeCode = this.$route.query.activeCode
        if (activeCode) {
          self.queryActive({ activeCode: activeCode }).then(data => {
            console.log(data)
          }).catch(error => {
            console.log(error)
            self.$vux.toast.show({
              text: '活动号异常',
              type: 'text'
            })
          })
        } else {
          self.$vux.toast.show({
            text: '活动号异常',
            type: 'text'
          })
        }
      } else {
        self.$vux.toast.show({
          text: '活动号异常',
          type: 'text'
        })
      }

      wechatUtil.share({url: location.href}).then(data => {
        let shareCode
        if (self.$route.query) {
          shareCode = self.$route.query.shareCode
        }
        if (shareCode) {
          wechatUtil.configWantToShare(self, data, shareCode)
        } else {
          wechatUtil.config(self, data)
        }
      })

      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scrollerMainPage.reset()
        }, 10)
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
    console.log('[Main Page] mounted')
    this.initPage()
  }
}
</script>
