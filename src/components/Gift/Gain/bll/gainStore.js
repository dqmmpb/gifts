/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './gainAction'
import mutations from './gainMutation'

const state = {
  gift: null,
  baseInfo: null,
  taking: false,
  gifts: null
}

const getters = {
  getGainList: state => state.gifts,
  getGainDetail: state => state.gift,
  getBaseInfo: state => state.baseInfo,
  isTaking: state => state.taking
}

export default {
  state,
  getters,
  actions,
  mutations
}
