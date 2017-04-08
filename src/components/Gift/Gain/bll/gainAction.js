/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../../common/httpUtil'
import * as types from './gainMutationTypes'

const actions = {

  queryAskForGiveDetail ({ commit }, { shareCode } = {}) {
    commit(types.GIFT_QUERY_ASKFORGIVEDETAIL_BEGIN)

    return http.post(`user/askforgive/detail/get?shareCode=${shareCode}`)
      .then(data => {
        commit(types.GIFT_QUERY_ASKFORGIVEDETAIL_SUC, data.data)
      })
  },

  queryBaseInfo ({ commit }, { shareCode } = {}) {
    commit(types.GIFT_QUERY_BASEINFO_BEGIN)

    return http.post(`general/gift/baseinfo/get?shareCode=${shareCode}`)
      .then(data => {
        commit(types.GIFT_QUERY_BASEINFO_SUC, data.data)
      })
  },

  giftTake ({ commit }, { shareCode } = {}) {
    commit(types.GIFT_TAKE_BEGIN)

    return http.post(`user/gift/take?shareCode=${shareCode}`)
      .then(data => {
        commit(types.GIFT_TAKE_SUC, data.data)
        return data.data
      })
  },

  queryGainInfo ({ commit }, { shareCode } = {}) {
    commit(types.GIFT_QUERY_GAININFO_BEGIN)

    return http.post(`general/gift/gaininfo/get?shareCode=${shareCode}`)
      .then(data => {
        commit(types.GIFT_QUERY_GAININFO_SUC, data.data)
      })
  },

  queryGainList ({ commit }) {
    commit(types.GIFT_QUERY_GAINLIST_BEGIN)

    return http.post(`user/gift/gainlist/get`)
      .then(data => {
        commit(types.GIFT_QUERY_GAINLIST_SUC, data.data)
      })
  },

  giftDelivery ({ commit }, { shareCode } = {}) {
    return http.post(`user/confirm/delivery?shareCode=${shareCode}`).then(data => {
      commit(types.GIFT_DELIVERY_SUC, data.data)
    })
  },

  giftAddressAdd ({ commit }, giftAddress) {
    return http.post('user/gift/address/add', giftAddress).then(data => {
      commit(types.GIFT_ADDRESS_ADD_SUC, data.data)
      return data.data
    })
  }

}

export default actions
