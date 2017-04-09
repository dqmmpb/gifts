/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../../common/httpUtil'
import * as types from './wantToMutationTypes'

const actions = {

  // queryAddress ({ commit }, { addressId } = {}) {
  //   commit(types.ADDRESS_QUERY_ADDRESS_BEGIN)
  //
  //   return http.post(`user/address/get/byid?addressId=${addressId}`)
  //     .then(data => {
  //       commit(types.ADDRESS_QUERY_ADDRESS_SUC, data.data)
  //     })
  // },
  //
  queryRecommendList ({ commit }, budget) {
    commit(types.WANTTO_QUERY_GOODSLIST_BEGIN)

    return http.post(`user/gift/recommendlist/get?budget=${budget.budget}&limitCount=${budget.limitCount}`)
      .then(data => {
        commit(types.WANTTO_QUERY_GOODSLIST_SUC, data.data)
      })
  },

  giftSwitch ({ commit }, { goodsId, existsGoodsIds }) {
    commit(types.WANTTO_SWITCH_BEGIN)

    return http.post(`user/gift/switch?goodsId=${goodsId}&existsGoodsIds=${existsGoodsIds}`)
      .then(data => {
        commit(types.WANTTO_SWITCH_SUC, { goodsId: goodsId, newGoods: data.data })
      })
  },

  saveWantToBudget ({ commit }, budget) {
    commit(types.WANTTO_BUDGET_SUC, budget)
  },

  share ({ commit }, { url }) {
    return http.post(`general/wechatconfig/get?url=${url}`)
      .then(data => {
        commit(types.WANTTO_SHARE_SUC, data.data)
        return data.data
      })
  }

  //
  // selectAddress ({ commit }, {addressId}) {
  //   commit(types.ADDRESS_SELECT_SUC, { addressId })
  // },
  //
  // saveAddress ({ commit }, address) {
  //   return http.post('user/address/add', address).then(data => {
  //     commit(types.ADDRESS_ADD_SUC, data.data)
  //   })
  // },
  //
  // updateAddress ({ commit }, address) {
  //   return http.post('user/address/update', address).then(data => {
  //     commit(types.ADDRESS_UPDATE_SUC, data.data)
  //   })
  // },
  //
  // deleteAddress ({ commit }, { addressId } = {}) {
  //   commit(types.ADDRESS_DELETE_BEGIN)
  //
  //   return http.post(`user/address/del?addressId=${addressId}`).then(() => {
  //     commit(types.ADDRESS_DELETE_SUC, {addressId})
  //   })
  // }
}

export default actions
