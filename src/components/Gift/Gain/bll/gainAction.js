/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../../common/httpUtil'
import * as types from './gainMutationTypes'

const actions = {

  queryGainDetail ({ commit }, { giftId } = {}) {
    commit(types.GIFT_QUERY_GAINDETAIL_BEGIN)

    return http.post(`user/gift/gainDetail?giftId=${giftId}`)
      .then(data => {
        commit(types.GIFT_QUERY_GAINDETAIL_SUC, data.data)
      })
  },

  queryGainInfo ({ commit }, { shareCode } = {}) {
    commit(types.GIFT_QUERY_GAININFO_BEGIN)

    return http.post(`general/gift/gaininfo/get?shareCode=${shareCode}`)
      .then(data => {
        commit(types.GIFT_QUERY_GAININFO_SUC, data.data)
      })
  },

  queryGainList ({ commit }) {
    commit(types.GIFT_QUERY_GAINLIST_BEGIN)

    return http.post(`user/gift/gainlist/get`)
      .then(data => {
        commit(types.GIFT_QUERY_GAINLIST_SUC, data.data)
      })
  }

}

export default actions
