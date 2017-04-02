/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './gainMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_QUERY_GAINDETAIL_BEGIN] (state) {
    state.gift = null
  },
  [types.GIFT_QUERY_GAINDETAIL_SUC] (state, { giftId }) {
    let gift = state.gifts.find(gift => {
      return gift.id === giftId
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
