<template>
  <div>

    <div class="gift-address">
      <router-link :to="toAddressList()">
        <x-button type="warn" class="gift-address-btn">
          <span class="btn-title">从地址簿中选择</span>
          <span class="btn-title-sub">添加到地址簿，未来收件更方便</span>
        </x-button>
      </router-link>
    </div>

    <form ref="selectForm" v-model="form">
      <group class="group-address">
        <x-input title="地址ID" v-model="form.id" :value="form.id" style="display: none;"></x-input>

        <x-input title="收件人" v-model="form.name" :value="form.name" placeholder="请填写您的姓名"></x-input>

        <x-input title="联系方式" v-model="form.phone" :value="form.phone" placeholder="请填写您的联系方式" keyboard="number" :min="11" :max="11" is-type="china-mobile"></x-input>

        <x-address title="收件地址" v-model="form.areaCode" :list="addressData" placeholder="请填写您的收件地址" value-text-align="left"></x-address>

        <x-textarea :min="4" :max="100" v-model="form.address" :value="form.address" placeholder="请输入详细地址..."></x-textarea>
      </group>
    </form>

    <tabbar>
      <div class="tabbar-button">
        <x-button type="warn" class="tabbar-button__btn" @click.native="saveSelectHandler()">确认无误</x-button>
      </div>
    </tabbar>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from '../Address/bll/addressStore'
import store from '../../store'
import assignDeep from 'assign-deep'
(!store.state.addresssStore) && store.registerModule('addresssStore', moduleStore)

import { Tabbar, Group, Cell, XInput, XAddress, ChinaAddressData, XTextarea, XButton, Value2nameFilter as value2name } from 'vux'

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
    toAddressList () {
      return '/addressList?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
    },
    getName (value) {
      return value2name(value, ChinaAddressData, ',')
    },
    saveSelectHandler () {
//      let self = this
     // let addForm = self.form
    //  console.log(self.$refs.form.valid)
//      this.$vux.confirm.show({
//        title: '收货地址',
//        content: '<div class="confirm-address"><div><b>收货人</b>：' + addForm.name + '</div>' +
//        '<div><b>联系方式</b>：' + addForm.phone + '</div>' +
//        '<div><b>收件地址</b>：' + self.getName(addForm.areaCode) + ' ' + addForm.address + '</div></div>',
//        onCancel () {
//          console.log('plugin cancel', addForm.id)
//        },
//        onConfirm () {
//          let shareCode = self.$route.query.shareCode
//          if (shareCode) {
//            this.giftDelivery({shareCode: shareCode}).then(() => {
//              let redirectUrl = self.$route.query.redirectUrl
//              if (redirectUrl) {
//                let dec = decodeURIComponent(redirectUrl)
//                self.$router.back(dec)
//              }
//            })
//          }
//        }
//      })
    },
    initPage () {
      let tempForm = assignDeep({}, this.getSelectAddress)
      tempForm.areaCode = tempForm.areaCode ? tempForm.areaCode.split(',') : []
      this.form = tempForm
    }
  },
  data () {
    return {
      form: {
        id: null,
        name: null,
        phone: null,
        areaCode: [],
        address: null
      },
      addressData: ChinaAddressData
    }
  },
  mounted () {
    console.log('[Address Select Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

@import '~vux/src/styles/1px.less';

.gift-address {
  padding: 15px 15px;
}

.weui-btn.gift-address-btn {
  padding: 5px 0;
  color: #ff2c4c;
  font-size: 14px;
  background-color: transparent;
  &:after {
    border-color: #ff2c4c;
    border-radius: 46px;
   }
  &.weui-btn_warn:not(.weui-btn_disabled):active {
    color: #ff2c4c;
    font-size: 14px;
    background-color: transparent;
  }
}

.btn-title {
  display: block;
  font-size: 14px;
  line-height: 16px;
}
.btn-title-sub {
  display: block;
  font-size: 10px;
  line-height: 14px;
}

.group-address {
  .weui-cells {
    margin-top: 0;
    font-size: 14px !important;

    & .weui-cell, & .vux-cell-box {
      &:before {
       left: 0;
       }
    }


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

& .vux-input-icon {
  font-size: 14px !important;
  }

  & .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before {
  font-size: 14px !important;
    }

}

.tabbar-button {
  width: 100%;
  & .tabbar-button__btn {
    color: #fdef81;
    background-color: #ff2c4c;
    border-radius: 0;
  }
}
.weui-dialog__btn_primary {
  color: #ff2c4c;
}
.confirm-address {
  text-align: left;
  font-size: 12px;
  b {
    color: #000;
    font-weight: 600;
  }
}

.vux-popup-picker-header {
  color: #ff2c4c !important;
}
</style>
