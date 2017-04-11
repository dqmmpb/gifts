/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../../common/httpUtil'
import * as types from './askForMutationTypes'

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

  storeAskForAmount ({ commit }, amount) {
    commit(types.ASKFOR_STORE_AMOUNT_SUC, amount)
  },

  saveAskForAmount ({ commit }, { amount }) {
    commit(types.ASKFOR_AMOUNT_BEGIN)

    return http.post(`user/askforgive/new?amount=${amount}`)
      .then(data => {
        commit(types.ASKFOR_AMOUNT_SUC, data.data)
      })
  },

  share ({ commit }, { url }) {
    return http.post(`general/wechatconfig/get?url=${url}`)
      .then(data => {
        commit(types.ASKFOR_SHARE_SUC, data.data)
        return data.data
      })
  }

}

export default actions
