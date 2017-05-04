/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './wantToAction'
import mutations from './wantToMutation'

const state = {
  active: null,
  preForm: null,
  goodsList: []
}

const getters = {
  getActive: state => state.active,
  getPreForm: state => state.preForm,
  getWantToGoodsList: state => state.goodsList
}

export default {
  state,
  getters,
  actions,
  mutations
}
