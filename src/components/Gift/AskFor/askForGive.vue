<template>
  <div>

    <form ref="askForForm" v-model="form" @submit.prevent="validateBeforeSubmit">
      <group class="group-askfor">

        <popup-picker title="几次郎" :data="options" v-model="form.amount" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>

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

import moduleStore from './bll/askForStore'
import store from '../../../store'
import assignDeep from 'assign-deep'
(!store.state.askForStore) && store.registerModule('askForStore', moduleStore)

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
    ...mapGetters(['getAskForAmount'])
  },
  methods: {
    ...mapActions(['saveAskForAmount', 'storeAskForAmount']),
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    getAmount (amount) {
      if (Object.prototype.toString.call(amount) === '[object Array]') {
        if (amount.length > 0) {
          return Number(amount[0])
        } else {
          return 0
        }
      } else if (Object.prototype.toString.call(amount) === '[object String]') {
        return Number(amount[0])
      } else {
        return 0
      }
    },
    validateBeforeSubmit () {
      let self = this
      if (!self.getAmount(self.form.amount)) {
        self.$vux.toast.show({
          text: '你是几次郎？',
          type: 'text'
        })
      } else {
        self.$validator.validateAll().then(() => {
          let preForm = {
            amount: self.getAmount(self.form.amount)
          }
          self.saveAskForAmount(preForm).then(data => {
            let askForShare = '/gift/askForShare?shareCode=' + data
            self.$router.push(askForShare)
          })

          return false
        }).catch(() => {
          let err = self.$validator.errorBag
          console.log(err)
          if (err.has('limitCount')) {
            self.$vux.toast.show({
              text: '你是几次郎？',
              type: 'text'
            })
          }
        })
      }
    },
    initPage () {
      let self = this
      if (this.$route.query) {
        const amount = this.$route.query.amount
        let preForm = {}
        if (amount) {
          preForm.amount = self.getAmount(amount ? ['' + amount] : [])
        }
        self.storeAskForAmount(preForm).then(function () {
          let tempForm = assignDeep({}, self.getAskForAmount)
          tempForm.amount = tempForm.amount ? [tempForm.amount + ''] : []
          self.form = tempForm
        })
      } else {
        let preForm = {
          amount: self.getAmount([])
        }
        self.storeAskForAmount(preForm).then(function () {
          let tempForm = assignDeep({}, self.getAskForAmount)
          tempForm.amount = tempForm.amount ? [tempForm.amount + ''] : []
          self.form = tempForm
        })
      }
    }
  },
  data () {
    return {
      form: {
        amount: []
      },
      options: [[
        {
          name: '1',
          value: '1'
        },
        {
          name: '2',
          value: '2'
        },
        {
          name: '3',
          value: '3'
        },
        {
          name: '4',
          value: '4'
        },
        {
          name: '5',
          value: '5'
        },
        {
          name: '6',
          value: '6'
        },
        {
          name: '7',
          value: '7'
        },
        {
          name: '8',
          value: '8'
        },
        {
          name: '9',
          value: '9'
        },
        {
          name: '10',
          value: '10'
        },
        {
          name: '11',
          value: '11'
        },
        {
          name: '12',
          value: '12'
        }
      ]]
    }
  },
  mounted () {
    console.log('[AskFor Add Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import "./askfor.less";

</style>
