<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <view-box ref="viewBox" :body-padding-top="paddingTop" :body-padding-bottom="paddingBottom">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="leftOptions"
                :title="title"
                :transition="headerTransition"
                @on-click-title="scrollTop" v-if="!isLoading && !isShowHeader"></x-header>

      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view class="router-view"></router-view>
      </transition>

      <tabbar class="view-tabbar" v-if="!isLoading && !isTabbar" slot="bottom">
        <tabbar-item :link="{path:'/mainPage'}" :selected="route.path === '/mainPage'">
          <i class="fa fa-bars" slot="icon"></i>
          <span slot="label">活动首页</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/gift/baseInfo', query: {shareCode:'3ce18aeea2b348a6b2d700db3cc2bb2c00795496'}}" :selected="route.path === '/gift/baseInfo'">
          <i class="fa fa-bars" slot="icon"></i>
          <span slot="label">拆礼包</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/gift/sendList'}" :selected="route.path === '/gift/sendList'">
          <i class="fa fa-bars" slot="icon"></i>
          <span slot="label">送出的</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/gift/gainList'}" :selected="route.path === '/gift/gainList'">
          <i class="fa fa-bars" slot="icon"></i>
          <span slot="label">收到的</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/addressList'}" :selected="route.path === '/addressList'">
          <i class="fa fa-bars" slot="icon"></i>
          <span slot="label">收货地址</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapActions } from 'vuex'

import 'font-awesome/css/font-awesome.min.css'

export default {
  directives: {
    TransferDom
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading
  },
  methods: {
    reload () {
      document.location.reload()
    },
    scrollTop () {
      this.$refs.viewBox.scrollTo(0)
    },
    ...mapActions([
      'updateAppPosition'
    ])
  },
  mounted () {
    this.handler = () => {
      if (this.path === '/') {
        this.updateAppPosition(this.$refs.viewBox.getScrollTop())
      }
    }
    this.box = this.$refs.viewBox.getScrollBody()
    if (this.path === '/') {
      this.box.addEventListener('scroll', this.handler, false)
    }
  },
  beforeDestroy () {
    this.box.removeEventListener('scroll', this.handler, false)
  },
  watch: {
    path (path) {
      if (path === '/component/') {
        this.$router.replace('/')
        return
      }
      if (path === '/') {
        this.box.removeEventListener('scroll', this.handler, false)
        this.box.addEventListener('scroll', this.handler, false)
      } else {
        this.box.removeEventListener('scroll', this.handler, false)
      }
      if (path === '/' && this.appTop) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.box.scrollTop = this.appTop
          }, 550)
        })
      } else {
        this.$nextTick(() => {
          this.box.scrollTop = 0
        })
      }
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      appTop: state => state.vux.appScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    paddingTop () {
      return this.isShowHeader ? '0' : '46px'
    },
    paddingBottom () {
      return this.isTabbar ? '0' : '50px'
    },
    isShowHeader () {
      if (/mainPage/.test(this.route.path)) return true
      if (/gift\/baseInfo/.test(this.route.path)) return true
      if (/gift\/gainList/.test(this.route.path)) return true
      if (/gift\/gainInfo/.test(this.route.path)) return true
      if (/gift\/sendList/.test(this.route.path)) return true
      if (/gift\/sendDetail/.test(this.route.path)) return true
      if (/addressList/.test(this.route.path)) return true
      if (/addressAdd/.test(this.route.path)) return true
      if (/addressEdit/.test(this.route.path)) return true
      if (/giftAddress/.test(this.route.path)) return true
      if (/gift\/wantToGive/.test(this.route.path)) return true
      if (/gift\/wantToOrder/.test(this.route.path)) return true
      if (/gift\/wantToShare/.test(this.route.path)) return true
      if (/gift\/askForGive/.test(this.route.path)) return true
      if (/qrcode/.test(this.route.path)) return true
      return false
    },
    isShowBar () {
//      if (/component/.test(this.path)) {
//        return true
//      }
      return false
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    isTabbar () {
      if (/mainPage/.test(this.route.path)) return true
      if (/addressList/.test(this.route.path)) return true
      if (/addressAdd/.test(this.route.path)) return true
      if (/addressEdit/.test(this.route.path)) return true
      if (/giftAddress/.test(this.route.path)) return true
      if (/gift\/gainInfo/.test(this.route.path)) return true
      if (/gift\/wantToGive/.test(this.route.path)) return true
      if (/gift\/wantToOrder/.test(this.route.path)) return true
      if (/gift\/wantToShare/.test(this.route.path)) return true
      if (/gift\/askForGive/.test(this.route.path)) return true
      if (/qrcode/.test(this.route.path)) return true
      return /tabbar/.test(this.route.path)
    },
    title () {
      return this.route.name
    }
  }
}
</script>

<style lang="less">

  @import './app.less';

</style>
