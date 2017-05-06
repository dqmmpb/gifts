/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './wantToAction'
import mutations from './wantToMutation'

const state = {
  active: null,
  goods: null,
  order: null,
  preForm: null,
  goodsList: []
}

const getters = {
  getOrder: state => state.order,
  getGoods: state => state.goods,
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
