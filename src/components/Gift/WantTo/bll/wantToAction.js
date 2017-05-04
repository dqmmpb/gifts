/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../../common/httpUtil'
import * as types from './wantToMutationTypes'

const actions = {

  queryActive ({ commit }, { activeCode } = {}) {
    commit(types.WANTTO_QUERY_ACTIVITY_BEGIN)

    return http.post(`general/goods/get/${activeCode}`)
      .then(data => {
        commit(types.WANTTO_QUERY_ACTIVITY_SUC, data.data)
        return data.data
      })
  },

  queryRecommendList ({ commit }, budget) {
    commit(types.WANTTO_QUERY_GOODSLIST_BEGIN)

    return http.post(`user/gift/recommendlist/get?budget=${budget.budget}&amount=${budget.amount}`)
      .then(data => {
        commit(types.WANTTO_QUERY_GOODSLIST_SUC, data.data)
        return data.data
      })
  },

  giftSwitch ({ commit }, { goodsId, existsGoodsIds }) {
    commit(types.WANTTO_SWITCH_BEGIN)

    return http.post(`user/gift/switch?goodsId=${goodsId}&existsGoodsIds=${existsGoodsIds}`)
      .then(data => {
        commit(types.WANTTO_SWITCH_SUC, { goodsId: goodsId, newGoods: data.data })
      })
  },

  storePreForm ({ commit }, preForm) {
    commit(types.WANTTO_PREFORM_SUC, preForm)
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
