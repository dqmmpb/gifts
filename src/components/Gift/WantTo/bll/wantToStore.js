/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './wantToAction'
import mutations from './wantToMutation'

const state = {
  preForm: null,
  goodsList: []
}

const getters = {
  getPreForm: state => state.preForm,
  getWantToGoodsList: state => state.goodsList
}

export default {
  state,
  getters,
  actions,
  mutations
}
