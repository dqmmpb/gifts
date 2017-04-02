/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './addressMutationTypes'

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
  [types.ADDRESS_QUERY_ADDRESSLIST_BEGIN] (state) {
  },
  [types.ADDRESS_QUERY_ADDRESSLIST_SUC] (state, data) {
    state.addresses = data.addressList
  },
  [types.ADDRESS_SELECT_SUC] (state, {addressId}) {
    let address = state.addresses.find(address => {
      return address.addressId === addressId
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
    let address = state.addresses.find(address => {
      return address.addressId === addressId
    })
    let indexOf = state.addresses.indexOf(address)
    if (indexOf !== -1) {
      state.addresses.splice(indexOf, 1)
    }
    console.log(address)
  }
}

export default mutations
