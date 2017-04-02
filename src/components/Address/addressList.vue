<template>
  <div>

    <confirm v-model="show"></confirm>

    <swipeout class="vux-1px-b">

      <swipeout-item v-for="item in getAddressList" :key="item.addressId" underlay-color="#ccc" :ref="'swipeoutItem' + item.addressId" :auto-close-on-button-click="false">
        <div slot="right-menu">
          <!--<swipeout-button @click.native="onButtonClick('edit', item)" type="primary">编辑</swipeout-button>-->
          <swipeout-button @click.native="onButtonClick('delete', item)" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="swipeout-content vux-1px-t" @click="onItemClick(item)">
          <div class="weui-media-box address">
            <h4 class="weui-media-box__title first">{{item.name}} {{item.phone}}</h4>
            <p class="weui-media-box__desc second">{{getArea(item)}} {{item.address}}</p>
          </div>
        </div>
      </swipeout-item>

    </swipeout>

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
(!store.state.addresss) && store.registerModule('addresss', moduleStore)

import { Tabbar, Group, Cell, Swipeout, SwipeoutItem, SwipeoutButton, XButton, Confirm } from 'vux'

export default {
  components: {
    Tabbar,
    Group,
    Cell,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton,
    Confirm
  },
  computed: {
    ...mapGetters(['getAddressList'])
  },
  methods: {
    ...mapActions(['queryAddressList', 'selectAddress', 'deleteAddress']),
    onItemClick (item) {
      let self = this
      this.selectAddress({addressId: item.addressId}).then(() => {
        let redirectUrl = self.$route.query.redirectUrl
        if (redirectUrl) {
          let dec = decodeURIComponent(redirectUrl)
          self.$router.push(dec)
        }
      })
    },
    onButtonClick (type, item) {
      let self = this
      console.log('on button click ' + type)
      if (type === 'delete') {
        this.$vux.confirm.show({
          title: '',
          content: '请确认是否删除',
          onCancel () {
            self.$refs['swipeoutItem' + item.addressId][0].close()
            console.log('plugin cancel', item.addressId)
          },
          onConfirm () {
            self.deleteAddress({addressId: item.addressId}).then(() => {
              console.log('plugin confirm', item.addressId)
            })
          }
        })
      }
    },
    handleEvents (type) {
      console.log('event: ', type)
    },
    toAddressAdd () {
      return '/addressAdd?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
    },
    addressAddHandle (type) {
      console.log('event: ', type)
    },
    getArea (item) {
      return item.areaRaw && item.areaRaw.join('')
    },
    initPage () {
      console.log(this.$route)
      this.queryAddressList()
    }
  },
  data () {
    return {
      btnClick: false,
      show: false
    }
  },
  mounted () {
    console.log('[Address Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

@import '~vux/src/styles/1px.less';

.swipeout-content {
  padding: 0;
}
.weui-media-box {
  padding: 0;
}

.address {
  padding: 5px 15px 5px 15px;
& .first {
    font-size: 14px;
    font-weight: normal;
    padding: 5px 0 0 0;
  }
& .second {
    font-size: 12px;
    padding: 0 0 5px 0;
  }
}

.tabbar-button {
  width: 100%;
  & .tabbar-button__btn {
    border-radius: 0;
  }
}
</style>
