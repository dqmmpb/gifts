<template>
  <div>
    <form ref="recommendForm" v-model="form" @submit.prevent="validateBeforeSubmit">
      <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerRecommendList">
        <div>
          <card v-if="getWantToGoodsList" v-for="item in getWantToGoodsList" :key="item.id">
            <div slot="content" class="card-wantto">
              <group>
                <cell :title="goodsName(item)" :inline-desc="goodsPrice(item)" :value="goodsAmount(item)" class="no-before">
                  <img slot="icon" width="38" style="display:block;margin-right:5px;" :src="goodsPic(item)">
                </cell>
                <cell title="" class="no-before">
                  <div slot="value">
                    <x-button mini type="warn" class="btn-detail" @click.native="giftSwitchHandler(item)">不喜欢，换一个</x-button>
                  </div>
                </cell>
              </group>
            </div>
          </card>
        </div>
      </scroller>


      <tabbar class="view-tabbar" slot="bottom">
        <tabbar-item :link="toPrev()">
          <span slot="label">上一步</span>
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
    ...mapGetters(['getWantToGoodsList'])
  },
  methods: {
    ...mapActions(['queryRecommendList', 'giftSwitch', 'giftPrePay']),
    toPrev () {
      if (this.$route.query) {
        const budget = this.$route.query.budget
        const limitCount = this.$route.query.limitCount
        let preForm = {}
        if (budget) {
          preForm.budget = Number(budget)
        }
        if (limitCount) {
          preForm.limitCount = Number(limitCount)
        }
        return { path: '/gift/wantToGive', query: { budget: preForm.budget, limitCount: preForm.limitCount } }
      }
      return { path: '/gift/wantToGive' }
    },
    validateBeforeSubmit () {
      let self = this
      if (this.$route.query) {
        const budget = this.$route.query.budget
        const limitCount = this.$route.query.limitCount
        let preForm = {}
        if (budget) {
          preForm.budget = Number(budget)
        }
        if (limitCount) {
          preForm.limitCount = Number(limitCount)
        }

        if (!preForm.budget || !preForm.limitCount) {
          self.$vux.toast.show({
            text: '礼物数量或总预算异常',
            type: 'text'
          })
        } else {
          self.$validator.validateAll().then(() => {
            let goodsList = self.getWantToGoodsList
            let amounts = goodsList.map(goods => {
              return goods.amount
            }).join(',')
            let goodsIds = goodsList.map(goods => {
              return goods.goodsId
            }).join(',')

            let preForm = {
              amounts: amounts,
              goodsIds: goodsIds
            }

            wechatUtil.giftPrePay(preForm).then(data => {
              wechatUtil.chooseWXPay(self, data)
            })

            return false
          }).catch(() => {
            let err = self.$validator.errorBag
            console.log(err)
            if (err.has('limitCount')) {
              self.$vux.toast.show({
                text: '数据有误',
                type: 'text'
              })
            }
          })
        }
      }
    },
    toPrePay () {
      this.validateBeforeSubmit()
    },
    toShare () {
      return { path: '/gift/wantToShare', query: { shareCode: '06c2c01b6eed435d9b36f8ff1db9d0f896652035' } }
    },
    goodsPrice (item) {
      let price = item ? item.price : ''
      return price + '元/只'
    },
    goodsName (item) {
      let name = item ? item.name : ''
      return name
    },
    goodsAmount (item) {
      let amount = item ? item.amount : ''
      return '×' + amount
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
    giftSwitchHandler (item) {
      let goodsId = item.goodsId
      let goodsList = this.getWantToGoodsList
      let goods = goodsList.filter(goods => {
        return goods.goodsId !== goodsId
      })
      let existsGoodsIds = goods.map(goods => {
        return goods.goodsId
      }).join(',')
      console.log(existsGoodsIds)
      this.giftSwitch({goodsId: goodsId, existsGoodsIds: existsGoodsIds})
    },
    refresh () {
      let self = this
      if (this.$route.query) {
        const budget = this.$route.query.budget
        const limitCount = this.$route.query.limitCount
        let preForm = {}
        if (budget) {
          preForm.budget = Number(budget)
        }
        if (limitCount) {
          preForm.limitCount = Number(limitCount)
        }
        self.queryRecommendList(preForm).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scrollerRecommendList.donePulldown()
            }, 10)
          })
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
          preForm.budget = Number(budget)
        }
        if (limitCount) {
          preForm.limitCount = Number(limitCount)
        }
        self.queryRecommendList(preForm).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scrollerRecommendList.reset()
            }, 10)
          })
        })
      }
    }
  },
  data () {
    return {
      form: {
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
