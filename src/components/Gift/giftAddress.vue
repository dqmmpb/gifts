<template>
  <div>
    <form ref="selectForm" v-model="form" @submit.prevent="validateBeforeSubmit" class="form-address-select">

      <div class="address-select">
        <router-link :to="toAddressList()" class="link-address-select">
          <x-button type="warn" class="btn-normal btn-default padding5px0px border44px" action-type="button">
            <span class="address-select-text">从地址簿中选择</span>
            <span class="address-select-text-sub">添加到地址簿，未来收件更方便</span>
          </x-button>
        </router-link>
      </div>

      <group class="group-address">
        <div class="vux-x-input weui-cell input" style="display: none;">
          <div class="weui-cell__hd">
            <label class="weui-label" style="width: 5em;">地址ID</label>
          </div>
          <div class="weui-cell__bd weui-cell__primary">
            <input class="weui-input" type="hidden" name="id" v-model="form.id" placeholder="请填写ID">
          </div>
        </div>

        <div class="vux-x-input weui-cell input">
          <div class="weui-cell__hd">
            <label class="weui-label" style="width: 5em;">收件人</label>
          </div>
          <div class="weui-cell__bd weui-cell__primary">
            <input class="weui-input" type="text" name="name" v-model="form.name" placeholder="请填写您的姓名" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('name') }">
          </div>
        </div>

        <div class="vux-x-input weui-cell input">
          <div class="weui-cell__hd">
            <label class="weui-label" style="width: 5em;">联系方式</label>
          </div>
          <div class="weui-cell__bd weui-cell__primary">
            <input class="weui-input" type="text" name="phone" v-model="form.phone" placeholder="请填写您的联系方式" keyboard="number" v-validate:phone.initial="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }">
          </div>
        </div>

        <input class="weui-input" type="hidden" name="areaCode" v-model="form.areaCode" placeholder="请填写您的收件地址" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('areaCode') }">

        <x-address title="收件地址" v-model="form.areaCode" :list="addressData" placeholder="请填写您的收件地址" value-text-align="left"></x-address>

        <x-textarea :min="4" :max="100" name="address" v-model="form.address" :value="form.address" placeholder="请输入详细地址..."  v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('address') }"></x-textarea>
      </group>

      <tabbar>
        <div class="tabbar-button">
          <x-button type="warn" class="tabbar-button__btn" action-type="submit">确认无误</x-button>
        </div>
      </tabbar>
    </form>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from '../Address/bll/addressStore'
import store from '../../store'
import assignDeep from 'assign-deep'
(!store.state.addressesStore) && store.registerModule('addressesStore', moduleStore)

import moduleStoreGain from './Gain/bll/gainStore'
(!store.state.gainStore) && store.registerModule('gainStore', moduleStoreGain)

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
    ...mapActions(['giftAddressAdd']),
    toAddressList () {
      return '/addressList?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
    },
    getName (value) {
      return value2name(value, ChinaAddressData, ',')
    },
    validateBeforeSubmit () {
      this.$nextTick(() => {
        let self = this
        let addForm = self.form
        self.$validator.validateAll().then(() => {
          self.$vux.confirm.show({
            title: '收货地址',
            content: '<div class="confirm-address"><div><b>收货人</b>：' + addForm.name + '</div>' +
            '<div><b>联系方式</b>：' + addForm.phone + '</div>' +
            '<div><b>收件地址</b>：' + self.getName(addForm.areaCode) + ' ' + addForm.address + '</div></div>',
            onCancel () {

            },
            onConfirm () {
              let shareCode = self.$route.query.shareCode
              if (shareCode) {
                let preForm = {
                  shareCode: shareCode,
                  name: self.form.name,
                  phone: self.form.phone,
                  areaCode: self.form.areaCode.join(','),
                  areaName: self.getName(self.form.areaCode),
                  address: self.form.address
                }
                self.giftAddressAdd(preForm).then(data => {
                  console.log(data)
                  if (data && data.rc === '1') {
                    let redirectUrl = self.$route.query.redirectUrl
                    if (redirectUrl) {
                      let dec = decodeURIComponent(redirectUrl)
                      self.$router.back(dec)
                    }
                  } else {
                    self.$vux.toast.show({
                      text: data && data.msg || '网络异常',
                      type: 'text'
                    })
                  }
                })
              }
            }
          })

          return false
        }).catch(() => {
          let err = self.$validator.errorBag
          console.log(err)
          if (err.has('name')) {
            self.$vux.toast.show({
              text: '请填写收件人',
              type: 'text'
            })
          } else if (err.has('phone')) {
            self.$vux.toast.show({
              text: '请填写正确的手机号',
              type: 'text'
            })
          } else if (err.has('areaCode')) {
            self.$vux.toast.show({
              text: '请选择省市区',
              type: 'text'
            })
          } else if (err.has('address')) {
            self.$vux.toast.show({
              text: '请填写详细地址',
              type: 'text'
            })
          }
        })
      })
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

  @import '../Address/address.less';

</style>
