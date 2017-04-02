/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './giftGiveDetailMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_QUERY_GIFT_BEGIN] (state) {
    state.currentGiftGive = null
  },
  [types.GIFT_QUERY_GIFT_SUC] (state, data) {
    state.currentGiftGive = data.data
  }
}

export default mutations
