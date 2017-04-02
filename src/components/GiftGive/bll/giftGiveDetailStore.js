/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './giftGiveDetailAction'
import mutations from './giftGiveDetailMutation'

const state = {
  currentGiftGive: {}
}

const getters = {
  getGiftGiveDetail: state => state.currentGiftGive
}

export default {
  state,
  getters,
  actions,
  mutations
}
