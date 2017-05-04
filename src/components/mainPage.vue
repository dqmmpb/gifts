<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerMainPage">
      <div>
        千里送鹅毛，礼轻情意重
      </div>
    </scroller>


    <tabbar class="view-tabbar" slot="bottom">
      <tabbar-item :link="{path:'/gift/wantToGive', query:{ activeCode: 'ZD521' } }" class="tabbar-button__btn">
        <span slot="label">查看鹅毛礼</span>
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
