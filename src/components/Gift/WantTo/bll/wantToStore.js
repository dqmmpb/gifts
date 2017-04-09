/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './wantToAction'
import mutations from './wantToMutation'

const state = {
  budget: {},
  goodsList: []
}

const getters = {
  getWantToBudget: state => state.budget,
  getWantToGoodsList: state => state.goodsList
}

export default {
  state,
  getters,
  actions,
  mutations
}
