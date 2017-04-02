/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './giftLogisticsAction'
import mutations from './giftLogisticsMutation'

const state = {
  gift: {}
}

const getters = {
  getLogisticss: state => state.gift
}

export default {
  state,
  getters,
  actions,
  mutations
}
