/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './askForAction'
import mutations from './askForMutation'

const state = {
  amount: {}
}

const getters = {
  getAskForAmount: state => state.amount
}

export default {
  state,
  getters,
  actions,
  mutations
}
