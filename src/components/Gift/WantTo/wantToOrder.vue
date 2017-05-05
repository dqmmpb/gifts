<template>
  <div>
    <form ref="recommendForm" v-model="form" @submit.prevent="validateBeforeSubmit">
      <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerRecommendList">
        <div>
          <card v-if="getActive">
            <div slot="content" class="card-wantto">
              <group>
                <cell :title="goodsName(getActive)" :value="goodsPrice(getActive)" class="no-before">
                  <img slot="icon" width="38" style="display:block;margin-right:5px;" :src="goodsPic(getActive)">
                </cell>
                <cell title="购买数量" class="no-before">
                  <div slot="value">
                    <table class="goods-table" v-if="form.amount">
                      <tr>
                        <td class="btn-w">
                          <div class="minus">
                            <x-button class="btn-default btn-fill" action-type="button" @click.native="minus">-</x-button>
                          </div>
                        </td>
                        <td class="input-w">
                          <input class="weui-input count-input" disabled type="text" name="amount" v-model="form.amount" placeholder="数量" keyboard="number" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('amount') }">
                        </td>
                        <td class="btn-w">
                          <div class="plus">
                            <x-button class="btn-default btn-fill" action-type="button" @click.native="plus">+</x-button>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </cell>
              </group>
            </div>
          </card>
        </div>
      </scroller>


      <tabbar class="view-tabbar" slot="bottom">
        <tabbar-item class="weui-bar-total">
          <span slot="label">合计： 7188元{{form.type}}</span>
        </tabbar-item>
        <tabbar-item @on-item-click="toPrePay" class="weui-bar__item_normal">
          <span slot="label">确认支付</span>
        </tabbar-item>
      </tabbar>
    </form>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/wantToStore'
import store from '../../../store'
(!store.state.wantToStore) && store.registerModule('wantToStore', moduleStore)

import wechatUtil from '../../../common/wechatUtil'

import { Tabbar, TabbarItem, Scroller, Group, Cell, Card, XButton, Spinner } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Scroller,
    Group,
    Cell,
    Card,
    XButton,
    Spinner
  },
  computed: {
    ...mapGetters(['getActive', 'getPreForm'])
  },
  methods: {
    ...mapActions(['queryActive', 'storePreForm', 'giftPrePay']),
    validateBeforeSubmit () {
      let self = this
      let preForm = self.getPreForm
      const activeCode = preForm.activeCode
      const pkgType = preForm.pkgType
      const amount = self.form.amount

      if (activeCode && pkgType && amount) {
        self.$validator.validateAll().then(() => {
          let goods = self.getActive
          let amounts = [amount].join(',')
          let goodsIds = [goods.goodsId].join(',')

          let payPreForm = {
            amounts: amounts,
            goodsIds: goodsIds,
            activeCode: activeCode,
            pkgType: Number(pkgType)
          }

          wechatUtil.giftPrePay(payPreForm).then(data => {
            wechatUtil.chooseWXPay(self, data.payInfo, function (res) {
//              self.$vux.toast.show({
//                text: '支付成功',
//                type: 'text'
//              })
              let wantToPayResult = '/gift/wantToPayResult?activeCode=' + preForm.activeCode + '&type=' + preForm.type + '&amount=' + preForm.amount
              self.$router.push(wantToPayResult)
            })
          })

          return false
        }).catch(() => {
          let err = self.$validator.errorBag
          console.log(err)
          if (err.has('amount')) {
            self.$vux.toast.show({
              text: '数据有误',
              type: 'text'
            })
          }
        })
      } else {
        self.$vux.toast.show({
          text: '参数异常',
          type: 'text'
        })
      }
    },
    minus () {
      console.log('minus: ' + this.form.amount)
      if (this.form.amount) {
        if (this.form.amount > 1) {
          this.form.amount--
        } else {
          this.form.amount = 1
        }
      }
    },
    plus () {
      console.log('plus: ' + this.form.amount)
      if (this.form.amount) {
        if (this.form.amount < 100) {
          this.form.amount++
        } else {
          this.form.amount = 100
        }
      }
    },
    toPrePay () {
      this.validateBeforeSubmit()
    },
    goodsPrice (item) {
      let price = item ? item.price : ''
      return '￥' + price
    },
    goodsName (item) {
      let name = item ? item.goodsName : ''
      return name
    },
    goodsPic (item) {
      let goodsPic = item ? item.goodsPic : ''
      let defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
      if (/^(data:image)|(http)/.test(goodsPic)) {
        return goodsPic
      } else {
        return defaultImg
      }
    },
    refresh () {
      let self = this
      if (this.$route.query) {
        const activeCode = this.$route.query.activeCode
        const pkgType = this.$route.query.pkgType
        const amount = this.$route.query.amount
        let preForm = { }
        if (activeCode && amount && pkgType) {
          preForm.activeCode = activeCode
          preForm.amount = Number(amount)
          preForm.pkgType = pkgType
        }
        self.storePreForm(preForm).then(() => {
          self.queryActive({ activeCode: activeCode }).then(data => {
            if (data && data.goodsId) {
              self.form.amount = preForm.amount
            }
            this.$nextTick(() => {
              setTimeout(() => {
                self.$refs.scrollerRecommendList.donePulldown()
              }, 10)
            })
          })
        })
      }
    },
    initPage () {
      let self = this
      if (this.$route.query) {
        const activeCode = this.$route.query.activeCode
        const pkgType = this.$route.query.pkgType
        const amount = this.$route.query.amount
        let preForm = { }
        if (activeCode && amount && pkgType) {
          preForm.activeCode = activeCode
          preForm.amount = Number(amount)
          preForm.pkgType = pkgType
        }
        self.storePreForm(preForm).then(() => {
          self.queryActive({ activeCode: activeCode }).then(data => {
            if (data && data.goodsId) {
              self.form.amount = preForm.amount
            }
            this.$nextTick(() => {
              setTimeout(() => {
                self.$refs.scrollerRecommendList.reset()
              }, 10)
            })
          })
        })

        wechatUtil.share({url: encodeURIComponent(location.href)}).then(data => {
          let shareCode
          if (self.$route.query) {
            shareCode = self.$route.query.shareCode
          }
          if (shareCode) {
            wechatUtil.configWantToShare(self, data, shareCode)
          } else {
            wechatUtil.config(self, data)
          }
        })
      }
    }
  },
  data () {
    return {
      form: {
        amount: 1
      },
      status: {
        pulldownStatus: 'default'
      }
    }
  },
  mounted () {
    console.log('[RecommendList Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './wantto.less';

</style>
