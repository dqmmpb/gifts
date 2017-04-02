/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './giftReceiveDetailAction'
import mutations from './giftReceiveDetailMutation'

const state = {
  currentGiftReceive: {}
}

const getters = {
  getGiftReceiveDetail: state => state.currentGiftReceive
}

export default {
  state,
  getters,
  actions,
  mutations
}
