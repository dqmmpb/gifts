/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './gainMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_TAKE_BEGIN] (state) {
    state.taking = true
  },
  [types.GIFT_TAKE_SUC] (state, data) {
    state.taking = false
  },
  [types.GIFT_UPDATE_BASEINFO_SUC] (state, data) {
    console.log(data)
    state.baseInfo.giftStatus = data.giftStatus
  },
  [types.GIFT_QUERY_BASEINFO_BEGIN] (state) {
    state.baseInfo = null
  },
  [types.GIFT_QUERY_BASEINFO_SUC] (state, data) {
    state.baseInfo = data
  },
  [types.GIFT_QUERY_GAININFO_BEGIN] (state) {
    state.gift = null
  },
  [types.GIFT_QUERY_GAININFO_SUC] (state, data) {
    state.gift = data
  },
  [types.GIFT_QUERY_ASKFORGIVEDETAIL_BEGIN] (state) {
    state.gift = null
  },
  [types.GIFT_QUERY_ASKFORGIVEDETAIL_SUC] (state, data) {
    state.gift = data
  },
  [types.GIFT_QUERY_GAINLIST_BEGIN] (state) {
  },
  [types.GIFT_QUERY_GAINLIST_SUC] (state, data) {
    state.gifts = data.gainList
  },
  [types.GIFT_ADDRESS_ADD_SUC] (state, data) {
  },
  [types.GIFT_DELIVERY_SUC] (state, data) {
  }
}

export default mutations
