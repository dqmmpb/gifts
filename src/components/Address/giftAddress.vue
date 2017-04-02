<template>
  <div>

    <router-link :to="toAddressList()"><x-button type="warn">从地址簿中选择</x-button></router-link>

    <form ref="form" v-model="form">
      <group class="group-address">
        <x-input title="收件人" :value="form.name" placeholder="请填写您的姓名"></x-input>

        <x-input title="联系方式" :value="form.phone" placeholder="请填写您的联系方式" keyboard="number" :min="11" :max="11" is-type="china-mobile"></x-input>

        <x-address title="收件地址" v-model="form.state" :list="addressData" placeholder="请填写您的收件地址" value-text-align="left"></x-address>
        <cell title="上面value值" :value="form.state"></cell>

        <x-textarea :max="100" :value="form.streetAddress" placeholder="请输入详细地址..."></x-textarea>
      </group>
    </form>

    <tabbar>
      <div class="tabbar-button">
        <x-button type="warn" class="tabbar-button__btn" @click.native="saveSelectHandler">确认无误</x-button>
      </div>
    </tabbar>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/addressStore'
import store from '../../store'
import assignDeep from 'assign-deep'
(!store.state.addresssStore) && store.registerModule('addresssStore', moduleStore)

import { Tabbar, Group, Cell, XInput, XAddress, ChinaAddressData, XTextarea, XButton } from 'vux'

export default {
  components: {
    Tabbar,
    Group,
    Cell,
    XInput,
    XAddress,
    XTextarea,
    XButton
  },
  computed: {
    ...mapGetters(['getSelectAddress'])
  },
  methods: {
    ...mapActions(['saveSelectAddress']),
    toAddress () {
      return '/addressList?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
    },
    saveSelectHandler () {
    },
    initPage () {
      this.form = assignDeep({}, this.getSelectAddress)
    }
  },
  data () {
    return {
      form: {
        name: null,
        phone: null,
        state: [],
        streetAddress: null
      },
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

@import '~vux/src/styles/1px.less';

.group-address {
  .weui-cells {
    font-size: 14px !important;
  }

  .weui-label {
    width: 5em !important;
  }

  .vux-popup-picker-select {
  & span {
      color: #999999;
    }
  & span.vux-popup-picker-value {
      color: #000;
    }
  }
}

.tabbar-button {
  width: 100%;
  & .tabbar-button__btn {
    border-radius: 0;
  }
}
</style>
