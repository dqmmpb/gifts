<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerMainPage">
      <div>
        活动规则
      </div>
    </scroller>


    <tabbar class="view-tabbar" slot="bottom">
      <tabbar-item :link="{path:'/gift/askForGive'}">
        <span slot="label">讨礼物</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/gift/wantToGive'}" class="weui-bar__item_normal">
        <span slot="label">送礼物</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>

  import { Tabbar, TabbarItem, Scroller, Group, Cell, Card, XButton, Spinner } from 'vux'

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
    },
    methods: {
      toAddressList () {
        const shareCode = this.$route.query.shareCode
        if (shareCode) {
          return '/giftAddress?shareCode=' + shareCode + '&redirectUrl=' + encodeURIComponent(this.$route.fullPath)
        } else {
          return '/giftAddress?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
        }
      },
      refresh () {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scrollerMainPage.donePulldown()
          }, 10)
        })
      },
      initPage () {
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
