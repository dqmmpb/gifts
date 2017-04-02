/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './giftAddressAction'
import mutations from './giftAddressMutation'

const state = {
  selectAddress: {},
  currentAddress: {},
  addresss: []
}

const getters = {
  getAddresss: state => state.addresss,
  getSelectAddress: state => state.selectAddress,
  getCurrentAddress: state => state.currentAddress
}

export default {
  state,
  getters,
  actions,
  mutations
}
