<template>
  <div>

    <form ref="form" v-model="getCurrentAddress">
      <group class="group-address">
        <x-input title="收件人" :value="getCurrentAddress.name" placeholder="请填写您的姓名"></x-input>

        <x-input title="联系方式" :value="getCurrentAddress.phone" placeholder="请填写您的联系方式" keyboard="number" :min="11" :max="11" is-type="china-mobile"></x-input>

        <x-address title="收件地址" v-model="getCurrentAddress.area" :list="addressData" placeholder="请填写您的收件地址" value-text-align="left"></x-address>
        <cell title="上面value值" style="display: none;" :value="getCurrentAddress.area"></cell>

        <x-textarea :max="100" placeholder="请输入详细地址..."></x-textarea>
      </group>
    </form>

    <tabbar>
      <div class="tabbar-button">
        <x-button type="warn" class="tabbar-button__btn" @click.native="saveHandler">确认添加</x-button>
      </div>
    </tabbar>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/giftAddressStore'
import store from '../../store'
(!store.state.addresss) && store.registerModule('addresss', moduleStore)

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
    ...mapGetters(['getAddresss', 'getCurrentAddress'])
  },
  methods: {
    ...mapActions(['queryAddresss', 'saveAddress', 'updateAddress', 'deleteAddress']),
    saveHandler () {
      let self = this

      self.saveAddress(self.form).then(function () {
       // self.$router.push('/giftAddress')
      })
    },
    initPage () {
      console.log(this.$route)
      if (this.$route.query) {
        const addressId = this.$route.query.addressId
        if (addressId) {
          this.queryAddress({addressId: addressId})
        }
        console.log(this.getCurrentAddress)
      }
    }
  },
  data () {
    return {
      form: {
        name: null,
        phone: null,
        area: null
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

& .vux-input-icon.vux-input-icon {
  font-size: 14px;
  }

  & .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before {
  font-size: 14px;
    }

}

.tabbar-button {
  width: 100%;
  & .tabbar-button__btn {
    border-radius: 0;
  }
}
</style>
