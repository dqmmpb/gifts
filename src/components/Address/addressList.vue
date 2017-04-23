<template>
  <div>

    <confirm v-model="show"></confirm>

<!--    <scroller v-if="!isInit" lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerAddressList">
      <div>-->
        <div v-if="!isInit && !empty">
          <swipeout class="vux-1px-b">

            <swipeout-item v-for="item in getAddressList" :key="item.id" underlay-color="#ccc" :ref="'swipeoutItem' + item.id" :auto-close-on-button-click="false">
              <div slot="right-menu">
                <!--<swipeout-button @click.native="onButtonClick('edit', item)" type="primary">编辑</swipeout-button>-->
                <swipeout-button @click.native="onButtonClick('delete', item)" type="warn">删除</swipeout-button>
              </div>
              <div slot="content" class="swipeout-content vux-1px-t">
                <div class="weui-media-box address">
                  <div class="text" @click="onItemClick(item)">
                    <div class="first">{{item.name}}&nbsp;{{item.phone}}</div>
                    <div class="second">{{getAreaAndAddress(item)}}</div>
                  </div>
                  <div class="edit">
                    <router-link :to="toAddressEdit(item)">编辑</router-link>
                  </div>
                </div>
              </div>
            </swipeout-item>

          </swipeout>
        </div>
        <div v-show="!isInit && empty">
          <div class="sorry">
            <img src="../../assets/sorry.png" class="sorry-img">
            <div class="sorry-text">还没有添加过地址哦</div>
          </div>
        </div>
<!--      </div>
    </scroller>-->

    <tabbar>
      <div class="tabbar-button">
        <router-link :to="toAddressAdd()"><x-button type="warn" class="tabbar-button__btn">新增收货地址</x-button></router-link>
      </div>
    </tabbar>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/addressStore'
import store from '../../store'
(!store.state.addressesStore) && store.registerModule('addressesStore', moduleStore)

import { Scroller, Tabbar, Group, Cell, Swipeout, SwipeoutItem, SwipeoutButton, XButton, Confirm, Spinner, ChinaAddressData, Value2nameFilter as value2name } from 'vux'

export default {
  components: {
    Scroller,
    Tabbar,
    Group,
    Cell,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton,
    Spinner,
    Confirm
  },
  computed: {
    ...mapGetters(['getAddressList'])
  },
  methods: {
    ...mapActions(['queryAddressList', 'selectAddress', 'deleteAddress']),
    getName (value) {
      return value2name(value, ChinaAddressData, ' ').replace(/\s/g, '')
    },
    onItemClick (item) {
      let self = this
      let redirectUrl = self.$route.query.redirectUrl
      if (redirectUrl) {
        this.selectAddress({addressId: item.id}).then(() => {
          let redirectUrl = self.$route.query.redirectUrl
          if (redirectUrl) {
            let dec = decodeURIComponent(redirectUrl)
            self.$router.back(dec)
          }
        })
      }
    },
    onButtonClick (type, item) {
      let self = this
      if (type === 'delete') {
        this.$vux.confirm.show({
          title: '',
          content: '请确认是否删除',
          onCancel () {
            self.$refs['swipeoutItem' + item.id][0].close()
          },
          onConfirm () {
            self.deleteAddress({addressId: item.id}).then(() => {
            })
          }
        })
      }
    },
    handleEvents (type) {
      // console.log('event: ', type)
    },
    toAddressAdd () {
      return '/addressAdd?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
    },
    toAddressEdit (item) {
      return '/addressEdit?addressId=' + item.id + '&redirectUrl=' + encodeURIComponent(this.$route.fullPath)
    },
    addressAddHandle (type) {
      // console.log('event: ', type)
    },
    getAreaAndAddress (item) {
      let area = item.areaCode ? item.areaCode : ''
      let address = item.address ? item.address : ''
      return this.getName(area.split(',')) + address
    },
    refresh () {
      let self = this
      this.queryAddressList().then(() => {
        this.$nextTick(() => {
          setTimeout(() => {
            // this.$refs.scrollerAddressList.donePulldown()
            self.isInit = false
            self.empty = !(this.getAddressList && this.getAddressList.length > 0)
          }, 10)
        })
      })
    },
    initPage () {
      let self = this
      this.queryAddressList().then(() => {
        this.$nextTick(() => {
          self.isInit = false
          self.empty = !(this.getAddressList && this.getAddressList.length > 0)
        })
      })
    }
  },
  data () {
    return {
      status: {
        pulldownStatus: 'default'
      },
      btnClick: false,
      show: false,
      empty: true,
      isInit: true,
      addressData: ChinaAddressData
    }
  },
  mounted () {
    console.log('[Address Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './address.less';

</style>
