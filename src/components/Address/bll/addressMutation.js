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
    state.address = null
  },
  [types.ADDRESS_QUERY_ADDRESS_SUC] (state, data) {
    state.address = data.address
    let address = state.addresses.find(address => {
      return address.id === state.address.addressId
    })
    if (address) {

    } else {
      state.addresses.push(state.address)
    }
  },
  [types.ADDRESS_QUERY_ADDRESSLIST_BEGIN] (state) {
  },
  [types.ADDRESS_QUERY_ADDRESSLIST_SUC] (state, data) {
    state.addresses = data.list
  },
  [types.ADDRESS_SELECT_SUC] (state, {addressId}) {
    let address = state.addresses.find(address => {
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
