<template>
  <div>
    <form ref="wantToForm" v-model="form" @submit.prevent="validateBeforeSubmit">

      <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerRecommendList">
        <div>
          <card v-if="getWantToGoodsList" v-for="item in getWantToGoodsList" :key="item.id">
            <div slot="content" class="card-padding">
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
        <tabbar-item :link="toPrePay()" class="weui-bar__item_normal">
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
      if (!self.getBudget(self.form.budget)) {
        self.$vux.toast.show({
          text: '请选择总预算',
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

          self.giftPrePay(preForm).then(data => {
            console.log(data)
            self.$wechat.chooseWXPay({
              timestamp: parseInt(data.timestamp),
              nonceStr: data.nonceStr,
              package: data.packageStr,
              signType: data.signType,
              paySign: data.paySign,
              success: function (res) {
                // 支付成功后的回调函数
                self.$vux.toast.show({
                  text: '支付成功',
                  type: 'text'
                })
//                let recommendList = '/gift/recommendList?budget=' + preForm.budget + '&limitCount=' + preForm.limitCount
//                self.$router.push(recommendList)
              }
            })
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
    },
    toPrePay () {
      this.$ref.wantToForm.submit()
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

@import '~vux/src/styles/1px.less';

.weui-panel {
  &:before, &:after {
    display: none;
  }
}
.card-padding {

  .weui-cells {
    margin-top: 0;
    font-size: 14px;

    &:before, &:after {
      display: none;
    }
  }

  .weui-cell.no-before {
    &:before {
      display: none !important;
    }
  }
  .weui-cell.with-before {
    &:before {
      left: 0;
    }
    &.cell-padding {
      &:before {
        left: 15px;
        right: 15px;
      }
    }
  }

  .second {
    padding: 12px 15px 7px 15px;
    .weui-cell {
      padding: 3px 0;
    }
  }
  .small {
    font-size: 80%;
  }

  .btn-detail {
    font-size: 12px;
    line-height: 1.8;
    padding: 0 0.8em;
    border-radius: 0;
    vertical-align: middle;
    background-color: #fff;
    color: #ff2c4c;
    &:after {
       border-color: #ff2c4c;
       border-radius: 0;
    }
  }
}

</style>
