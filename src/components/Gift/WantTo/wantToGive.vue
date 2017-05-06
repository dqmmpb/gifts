<template>
  <div>

    <group class="group-wantto">
      <swiper :list="swiper_list" v-model="swiper_index" @on-index-change="swiper_onIndexChange" loop></swiper>
    </group>

    <tabbar class="tabbar-no-border">
      <form class="tabbar-form" ref="wantToForm" v-model="form" @submit.prevent="validateBeforeSubmit">
        <table class="tabbar-table">
          <tr>
            <td class="btn-w">
              <div class="tabbar-button minus">
                <x-button class="tabbar-button__btn" action-type="button" @click.native="minus">-</x-button>
              </div>
            </td>
            <td class="input-w">
              <div class="tabbar-button">
                <input class="weui-input tabbar-input" disabled type="text" name="amount" v-model="form.amount" placeholder="数量" keyboard="number" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('amount') }">
              </div>
            </td>
            <td class="btn-w">
              <div class="tabbar-button plus">
                <x-button class="tabbar-button__btn" action-type="button" @click.native="plus">+</x-button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="tabbar-button">
                <x-button class="tabbar-button__btn" action-type="button" @click.native="buySelf">买给自己</x-button>
              </div>
            </td>
            <td colspan="2">
              <div class="tabbar-button">
                <x-button class="tabbar-button__btn" action-type="button" @click.native="buyFriend">赠送他人</x-button>
              </div>
            </td>
          </tr>
        </table>
      </form>
    </tabbar>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/wantToStore'
import store from '../../../store'
(!store.state.wantToStore) && store.registerModule('wantToStore', moduleStore)

import {Tabbar, Group, Cell, XInput, XButton, Swiper} from 'vux'

export default {
  components: {
    Tabbar,
    Group,
    Cell,
    XInput,
    XButton,
    Swiper
  },
  computed: {
    ...mapGetters(['getGoods', 'getPreForm'])
  },
  methods: {
    ...mapActions(['queryGoods', 'queryActive', 'storePreForm']),
    swiper_onIndexChange (index) {
      this.swiper_index = index
    },
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    minus () {
      if (this.form.amount > 1) {
        this.form.amount--
      } else {
        this.form.amount = 1
      }
    },
    plus () {
      if (this.form.amount < 100) {
        this.form.amount++
      } else {
        this.form.amount = 100
      }
    },
    buySelf () {
      console.log('bySelf ' + this.form.amount)
      this.form.pkgType = 2
      this.validateBeforeSubmit()
    },
    buyFriend () {
      console.log('buyFriend ' + this.form.amount)
      this.form.pkgType = 0
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      if (!self.form || self.form.amount < 1) {
        self.$vux.toast.show({
          text: '请填写数量',
          type: 'text'
        })
      } else {
        self.$validator.validateAll().then(() => {
          let preForm = {
            activeCode: self.form.activeCode,
            goodsId: self.form.goodsId,
            amount: self.form.amount,
            pkgType: self.form.pkgType
          }
          self.storePreForm(preForm).then(() => {
            let wantToOrder = '/gift/wantToOrder?activeCode=' + preForm.activeCode + '&goodsId=' + preForm.goodsId + '&pkgType=' + preForm.pkgType + '&amount=' + preForm.amount
            self.$router.push(wantToOrder)
          })

          return false
        }).catch(() => {
          let err = self.$validator.errorBag
          console.log(err)
          if (err.has('amount')) {
            self.$vux.toast.show({
              text: '请填写数量',
              type: 'text'
            })
          }
        })
      }
    },
    initPage () {
      let self = this
      if (this.$route.query) {
        const activeCode = this.$route.query.activeCode
        const goodsId = this.$route.query.goodsId
        if (activeCode && goodsId) {
          self.queryGoods({ goodsId: goodsId, activeCode: activeCode }).then(data => {
            let pre = self.getPreForm
            if (pre) {
              let preForm = {}
              if (pre.amount && pre.type) {
                preForm.activeCode = activeCode
                preForm.goodsId = goodsId
                preForm.amount = Number(pre.amount)
                preForm.type = pre.type
                self.form = preForm
              } else {
                preForm.activeCode = activeCode
                preForm.goodsId = goodsId
                preForm.amount = 1
                self.form = preForm
              }
            } else {
              let preForm = {}
              preForm.activeCode = activeCode
              preForm.goodsId = goodsId
              preForm.amount = 1
              self.form = preForm
            }
          }).catch(error => {
            console.log(error)
            let preForm = {}
            preForm.activeCode = activeCode
            preForm.goodsId = goodsId
            preForm.amount = 1
            self.form = preForm
          })
        } else {
          self.$vux.toast.show({
            text: '商品ID异常',
            type: 'text'
          })
        }
      } else {
        self.$vux.toast.show({
          text: '商品ID异常',
          type: 'text'
        })
      }
    }
  },
  data () {
    const baseList = [{
      url: 'javascript:',
      img: 'https://static.vux.li/demo/1.jpg',
      title: '送你一朵花'
    }, {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/2.jpg',
      title: '送你一辆车'
    }, {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/3.jpg',
      title: '送你一次旅行'
    }]

    return {
      swiper_list: baseList,
      swiper_index: 0,
      form: {
        amount: 1
      }
    }
  },
  mounted () {
    console.log('[WantTo Add Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import "./wantto.less";

</style>
