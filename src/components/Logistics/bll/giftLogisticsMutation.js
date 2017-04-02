/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './giftLogisticsMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_QUERY_LOGISTICS_BEGIN] (state) {
  },
  [types.GIFT_QUERY_LOGISTICS_SUC] (state, data) {
    state.gift = data.data
  }
}

export default mutations
