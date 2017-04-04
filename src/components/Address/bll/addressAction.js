/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../common/httpUtil'
import * as types from './addressMutationTypes'

const actions = {

  queryAddress ({ commit }, { addressId } = {}) {
    commit(types.ADDRESS_QUERY_ADDRESS_BEGIN)

    return http.post(`user/address/get/byid?addressId=${addressId}`)
      .then(data => {
        commit(types.ADDRESS_QUERY_ADDRESS_SUC, data.data)
      })
  },

  queryAddressList ({ commit }) {
    commit(types.ADDRESS_QUERY_ADDRESSLIST_BEGIN)

    return http.post(`user/addresslist/get`)
      .then(data => {
        commit(types.ADDRESS_QUERY_ADDRESSLIST_SUC, data.data)
      })
  },

  selectAddress ({ commit }, {addressId}) {
    commit(types.ADDRESS_SELECT_SUC, { addressId })
  },

  saveAddress ({ commit }, address) {
    return http.post('user/address/add', address).then(data => {
      commit(types.ADDRESS_ADD_SUC, data.data)
    })
  },

  updateAddress ({ commit }, address) {
    return http.post('user/address/update', address).then(data => {
      commit(types.ADDRESS_UPDATE_SUC, data.data)
    })
  },

  deleteAddress ({ commit }, { addressId } = {}) {
    commit(types.ADDRESS_DELETE_BEGIN)

    return http.post(`user/address/del?addressId=${addressId}`).then(() => {
      commit(types.ADDRESS_DELETE_SUC, {addressId})
    })
  }
}

export default actions
