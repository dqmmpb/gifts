<template>
  <div>

    <form ref="wantToForm" v-model="form" @submit.prevent="validateBeforeSubmit">
      <group class="group-wantto">

        <popup-picker title="总预算(元)" :data="options" v-model="form.budget" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>

        <div class="vux-x-input weui-cell input">
          <div class="weui-cell__hd">
            <label class="weui-label" style="width: 5em;">数量(个)</label>
          </div>
          <div class="weui-cell__bd weui-cell__primary">
            <input class="weui-input limitCount" type="text" name="limitCount" v-model="form.limitCount" placeholder="请填写礼物数量" keyboard="number" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('limitCount') }">
          </div>
        </div>

      </group>

      <tabbar>
        <div class="tabbar-button">
          <x-button type="warn" class="tabbar-button__btn" action-type="submit">下一步</x-button>
        </div>
      </tabbar>
    </form>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/wantToStore'
import store from '../../../store'
import assignDeep from 'assign-deep'
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
    ...mapGetters(['getWantToBudget'])
  },
  methods: {
    ...mapActions(['storeWantToBudget']),
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    getBudget (budget) {
      if (Object.prototype.toString.call(budget) === '[object Array]') {
        if (budget.length > 0) {
          return Number(budget[0])
        } else {
          return 0
        }
      } else if (Object.prototype.toString.call(budget) === '[object String]') {
        return Number(budget[0])
      } else {
        return 0
      }
    },
    validateBeforeSubmit () {
      let self = this
      if (!self.getBudget(self.form.budget)) {
        self.$vux.toast.show({
          text: '请选择总预算',
          type: 'text'
        })
      } else {
        self.$validator.validateAll().then(() => {
          let preForm = {
            budget: self.getBudget(self.form.budget),
            limitCount: self.form.limitCount
          }
          self.storeWantToBudget(preForm).then(function () {
            let recommendList = '/gift/recommendList?budget=' + preForm.budget + '&limitCount=' + preForm.limitCount
            self.$router.push(recommendList)
          })

          return false
        }).catch(() => {
          let err = self.$validator.errorBag
          console.log(err)
          if (err.has('limitCount')) {
            self.$vux.toast.show({
              text: '请输入礼物数量',
              type: 'text'
            })
          }
        })
      }
    },
    initPage () {
      let self = this
      if (this.$route.query) {
        const budget = this.$route.query.budget
        const limitCount = this.$route.query.limitCount
        let preForm = {}
        if (budget) {
          preForm.budget = self.getBudget(budget ? ['' + budget] : [])
        }
        if (limitCount) {
          preForm.limitCount = Number(limitCount)
        }
        self.storeWantToBudget(preForm).then(function () {
          let tempForm = assignDeep({}, self.getWantToBudget)
          tempForm.budget = tempForm.budget ? [tempForm.budget + ''] : []
          self.form = tempForm
        })
      } else {
        let preForm = {
          budget: self.getBudget([]),
          limitCount: 0
        }
        self.storeWantToBudget(preForm).then(function () {
          let tempForm = assignDeep({}, self.getWantToBudget)
          tempForm.budget = tempForm.budget ? [tempForm.budget + ''] : []
          self.form = tempForm
        })
      }
    }
  },
  data () {
    return {
      form: {
        budget: [],
        limitCount: 10
      },
      options: [[
        {
          name: '50',
          value: '50'
        },
        {
          name: '100',
          value: '150'
        },
        {
          name: '150',
          value: '150'
        },
        {
          name: '200',
          value: '200'
        }
      ]]
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
