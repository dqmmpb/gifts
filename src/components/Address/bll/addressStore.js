/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './addressAction'
import mutations from './addressMutation'

const state = {
  selectAddress: {},
  address: {},
  addresses: []
}

const getters = {
  getAddressList: state => state.addresses,
  getSelectAddress: state => state.selectAddress,
  getAddress: state => state.address
}

export default {
  state,
  getters,
  actions,
  mutations
}
