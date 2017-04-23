<template>
  <div>

    <form ref="addForm" v-model="form" @submit.prevent="validateBeforeSubmit">
      <group class="group-address">
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
          <x-button type="warn" class="tabbar-button__btn" action-type="submit">确认添加</x-button>
        </div>
      </tabbar>
    </form>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/addressStore'
import store from '../../store'
(!store.state.addressesStore) && store.registerModule('addressesStore', moduleStore)

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
    ...mapGetters(['getAddress'])
  },
  methods: {
    ...mapActions(['saveAddress']),
    getName (value) {
      return value2name(value, ChinaAddressData, ',')
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then(() => {
        let preForm = {
          name: self.form.name,
          phone: self.form.phone,
          areaCode: self.form.areaCode.join(','),
          areaName: self.getName(self.form.areaCode),
          address: self.form.address
        }
        self.saveAddress(preForm).then(function () {
          let redirectUrl = self.$route.query.redirectUrl
          if (redirectUrl) {
            let dec = decodeURIComponent(redirectUrl)
            self.$router.back(dec)
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
          console.log(err.first('phone'))
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
    },
    initPage () {
    }
  },
  data () {
    return {
      form: {
        name: null,
        phone: null,
        areaCode: [],
        address: null
      },
      addressData: ChinaAddressData
    }
  },
  mounted () {
    console.log('[Address Add Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './address.less';

</style>
