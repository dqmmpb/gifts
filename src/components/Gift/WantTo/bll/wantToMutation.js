/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './wantToMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.WANTTO_QUERY_GOODS_BEGIN] (state) {
    state.goods = null
  },
  [types.WANTTO_QUERY_GOODS_SUC] (state, data) {
    state.goods = data
  },
  [types.WANTTO_QUERY_ORDER_BEGIN] (state) {
    state.order = null
  },
  [types.WANTTO_QUERY_ORDER_SUC] (state, data) {
    state.order = data
  },
  [types.WANTTO_QUERY_ACTIVITY_BEGIN] (state) {
    state.active = null
  },
  [types.WANTTO_QUERY_ACTIVITY_SUC] (state, data) {
    state.active = data
  },
  [types.WANTTO_QUERY_GOODSLIST_BEGIN] (state) {
    state.goodsList = null
  },
  [types.WANTTO_QUERY_GOODSLIST_SUC] (state, data) {
    state.sumPrice = data.sumPrice
    state.totalCount = data.totalCount
    state.goodsList = data.goodsList
  },
  [types.WANTTO_SWITCH_BEGIN] (state) {
  },
  [types.WANTTO_SWITCH_SUC] (state, data) {
    let goodsId = data.goodsId
    let newGoodsRes = data.newGoods

    if (newGoodsRes) {
      let goods = state.goodsList.find(goods => {
        return goods.goodsId === goodsId
      })
      if (goods) {
        let newGoods = {
          amount: goods.amount,
          goodsId: newGoodsRes.goodsId,
          name: newGoodsRes.goodsName,
          goodsPic: newGoodsRes.goodsPic,
          price: newGoodsRes.goodsPrice
        }
        let indexOf = state.goodsList.indexOf(goods)
        if (indexOf !== -1) {
          state.goodsList.splice(indexOf, 1, newGoods)
        }
      }
    }
  },
  [types.WANTTO_PREPAY_BEGIN] (state) {
  },
  [types.WANTTO_PREPAY_SUC] (state, data) {
  },
  [types.WANTTO_SHARE_SUC] (state, data) {
  },
  [types.WANTTO_PREFORM_SUC] (state, data) {
    state.preForm = data
  }
}

export default mutations
