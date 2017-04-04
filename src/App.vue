<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="leftOptions"
                :title="title"
                :transition="headerTransition"
                @on-click-title="scrollTop"></x-header>

      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view class="router-view"></router-view>
      </transition>

      <tabbar class="view-tabbar" v-show="!isTabbarApp" slot="bottom">
        <tabbar-item :link="{path:'/gift/sendList'}" :selected="route.path === '/gift/sendList'">
          <i class="fa fa-bars" slot="icon"></i>
          <span slot="label">送出的礼物</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/gift/gainList'}" :selected="route.path === '/gift/gainList'">
          <i class="fa fa-bars" slot="icon"></i>
          <span slot="label">收到的礼物</span>
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
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    isTabbarApp () {
      if (/addressList/.test(this.route.path)) return true
      if (/addressAdd/.test(this.route.path)) return true
      if (/addressEdit/.test(this.route.path)) return true
      if (/giftAddress/.test(this.route.path)) return true
      return /tabbar/.test(this.route.path)
    },
    title () {
      return this.route.name
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.view-tabbar .weui-tabbar__item {
  & .weui-tabbar__icon > i {
    color: rgb(53, 73, 94);
  }

  & .weui-tabbar__label {
    color: rgb(53, 73, 94);
  }

  &.weui-bar__item_on {

    & .weui-tabbar__icon  > i.fa {
      color: #ff2c4c;
    }

    & .weui-tabbar__label {
       color: #ff2c4c;
    }
  }
}

.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}

/**
* vue-router transition
*/
.router-view {
  width: 100%;
  height: 100%;
  animation-duration: 0s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}
.vux-pop-out-enter-active {
  animation-name: popInLeft;
}
.vux-pop-out-leave-active {
  animation-name: popOutRight;
}
.vux-pop-in-enter-active {
  perspective: 1000;
  animation-name: popInRight;
}
.vux-pop-in-leave-active {
  animation-name: popOutLeft;
}
@keyframes popInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes popInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}

/*  div[id^="vux-scroller-"] {
    padding-top: 46px !important;
    padding-bottom: 50px !important;
  }*/
</style>
