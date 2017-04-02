/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../../common/httpUtil'
import * as types from './gainMutationTypes'

const actions = {

  queryGainDetail ({ commit }, { giftId } = {}) {
    commit(types.GIFT_QUERY_GAINDETAIL_BEGIN)

    return http.get(`user/gift/gainDetail?giftId=${giftId}`)
      .then(data => {
        commit(types.GIFT_QUERY_GAINDETAIL_SUC, { giftId })
      })
  },
  queryGainList ({ commit }) {
    commit(types.GIFT_QUERY_GAINLIST_BEGIN)

    return http.get(`user/gift/gainlist/get`)
      .then(data => {
        commit(types.GIFT_QUERY_GAINLIST_SUC, data.data)
      })
  }

}

export default actions
