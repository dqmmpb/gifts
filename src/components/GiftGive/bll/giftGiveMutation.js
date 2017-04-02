/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './giftGiveMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.GIFT_QUERY_GIFTS_BEGIN] (state, data) {
    state.isLoading = true
    if (data.pageIndex === 1) {
      state.gifts = []
    }
  },
  [types.GIFT_QUERY_GIFTS_SUC] (state, data) {
    for (var item in data.data) {
      state.gifts.push(data.data[item])
    }
    state.currentPage = data.currentPage
    state.totalCount = data.totalCount
    state.isLoading = false
  }
}

export default mutations
