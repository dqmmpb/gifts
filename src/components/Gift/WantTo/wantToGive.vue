<template>
  <div>

    <group class="group-wantto">
      礼物详情
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
                <input class="weui-input tabbar-input" disabled type="text" name="limitCount" v-model="form.limitCount" placeholder="数量" keyboard="number" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('limitCount') }">
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

import { Tabbar, Group, Cell, XInput, XAddress, XTextarea, XButton, PopupPicker, Picker } from 'vux'

export default {
  components: {
    Tabbar,
    Group,
    Cell,
    XInput,
    XAddress,
    XTextarea,
    XButton,
    PopupPicker,
    Picker
  },
  computed: {
    ...mapGetters(['getPreForm'])
  },
  methods: {
    ...mapActions(['queryActivity', 'storePreForm']),
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
      if (this.form.limitCount > 1) {
        this.form.limitCount--
      } else {
        this.form.limitCount = 1
      }
    },
    plus () {
      if (this.form.limitCount < 100) {
        this.form.limitCount++
      } else {
        this.form.limitCount = 100
      }
    },
    buySelf () {
      console.log('bySelf ' + this.form.limitCount)
      this.form.type = 'self'
      this.validateBeforeSubmit()
    },
    buyFriend () {
      console.log('buyFriend ' + this.form.limitCount)
      this.form.type = 'friend'
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      if (!self.form || self.form.limitCount < 1) {
        self.$vux.toast.show({
          text: '请填写数量',
          type: 'text'
        })
      } else {
        self.$validator.validateAll().then(() => {
          let preForm = {
            activityId: self.form.activityId,
            limitCount: self.form.limitCount,
            type: self.form.type
          }
          self.storePreForm(preForm).then(() => {
            let wantToOrder = '/gift/wantToOrder?activityId=' + preForm.activityId + '&type=' + preForm.type + '&limitCount=' + preForm.limitCount
            self.$router.push(wantToOrder)
          })

          return false
        }).catch(() => {
          let err = self.$validator.errorBag
          console.log(err)
          if (err.has('limitCount')) {
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
        const activityId = this.$route.query.activityId
        if (activityId) {
          self.queryActivity({ activityId: activityId }).then(data => {
            let pre = self.getPreForm
            if (pre) {
              let preForm = {}
              if (pre.limitCount && pre.type) {
                preForm.activityId = activityId
                preForm.limitCount = Number(pre.limitCount)
                preForm.type = pre.type
                self.form = preForm
              } else {
                preForm.activityId = activityId
                preForm.limitCount = 1
                self.form = preForm
              }
            } else {
              let preForm = {}
              preForm.activityId = activityId
              preForm.limitCount = 1
              self.form = preForm
            }
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
    return {
      form: {
        limitCount: 1
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
