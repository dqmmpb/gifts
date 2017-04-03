/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './sendMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_QUERY_SENDDETAIL_BEGIN] (state) {
    state.gift = null
  },
  [types.GIFT_QUERY_SENDDETAIL_SUC] (state, { giftId }) {
    let gift = state.gifts.find(gift => {
      return gift.id === giftId
    })
    let indexOf = state.gifts.indexOf(gift)
    if (indexOf !== -1) {
      state.gift = gift
    }
  },
  [types.GIFT_QUERY_SENDLIST_BEGIN] (state) {
  },
  [types.GIFT_QUERY_SENDLIST_SUC] (state, data) {
    state.gifts = data.sendList
  }
}

export default mutations
