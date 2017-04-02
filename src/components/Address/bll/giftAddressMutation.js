/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './giftAddressMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.ADDRESS_QUERY_ADDRESS_BEGIN] (state) {
    state.currentAddress = null
  },
  [types.ADDRESS_QUERY_ADDRESS_SUC] (state, data) {
    state.currentAddress = data.data
  },
  [types.ADDRESS_QUERY_ADDRESSS_BEGIN] (state) {
  },
  [types.ADDRESS_QUERY_ADDRESSS_SUC] (state, data) {
    state.addresss = data.data
  },
  [types.ADDRESS_SELECT_SUC] (state, {addressId}) {
    let address = state.addresss.find(address => {
      return address.id === addressId
    })
    if (address) {
      state.selectAddress = address
    }
  },
  [types.ADDRESS_ADD_SUC] (state) {

  },
  [types.ADDRESS_UPDATE_SUC] (state) {

  },
  [types.ADDRESS_DELETE_BEGIN] (state) {
  },
  [types.ADDRESS_DELETE_SUC] (state, {addressId}) {
    let address = state.addresss.find(address => {
      return address.id === addressId
    })
    let indexOf = state.addresss.indexOf(address)
    if (indexOf !== -1) {
      state.addresss.splice(indexOf, 1)
    }
    console.log(address)
  }
}

export default mutations
