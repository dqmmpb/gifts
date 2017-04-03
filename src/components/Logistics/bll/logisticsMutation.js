/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './logisticsMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_QUERY_LOGISTICS_BEGIN] (state) {
    state.logistics = []
  },
  [types.GIFT_QUERY_LOGISTICS_SUC] (state, data) {
    state.orderTime = data.orderTime
    state.orderNo = data.orderNo
    state.deliveryComp = data.deliveryComp
    state.logistics = data.dataList
  }
}

export default mutations
