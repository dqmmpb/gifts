/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './giftReceiveDetailMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_QUERY_GIFT_BEGIN] (state) {
    state.currentGiftReceive = null
  },
  [types.GIFT_QUERY_GIFT_SUC] (state, data) {
    state.currentGiftReceive = data.data
  }
}

export default mutations
