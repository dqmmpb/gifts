/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './sendAction'
import mutations from './sendMutation'

const state = {
  gift: null,
  gifts: null
}

const getters = {
  getSendList: state => state.gifts,
  getSendDetail: state => state.gift
}

export default {
  state,
  getters,
  actions,
  mutations
}
