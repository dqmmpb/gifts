/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './gainMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_QUERY_GAININFO_BEGIN] (state) {
    state.gift = null
  },
  [types.GIFT_QUERY_GAININFO_SUC] (state, data) {
    state.gift = data
  },
  [types.GIFT_QUERY_GAINDETAIL_BEGIN] (state) {
    state.gift = null
  },
  [types.GIFT_QUERY_GAINDETAIL_SUC] (state, data) {
    let gift = state.gifts.find(gift => {
      return gift.id === data.id
    })
    let indexOf = state.gifts.indexOf(gift)
    if (indexOf !== -1) {
      state.gift = gift
    }
  },
  [types.GIFT_QUERY_GAINLIST_BEGIN] (state) {
  },
  [types.GIFT_QUERY_GAINLIST_SUC] (state, data) {
    state.gifts = data.gainList
  }
}

export default mutations
