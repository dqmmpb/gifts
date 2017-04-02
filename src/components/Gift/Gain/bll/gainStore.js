/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './gainAction'
import mutations from './gainMutation'

const state = {
  gift: null,
  gifts: null
}

const getters = {
  getGainList: state => state.gifts,
  getGainDetail: state => state.gift
}

export default {
  state,
  getters,
  actions,
  mutations
}
