/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../../common/httpUtil'
import * as types from './sendMutationTypes'

const actions = {

  querySendDetail ({ commit }, { giftId } = {}) {
    commit(types.GIFT_QUERY_SENDDETAIL_BEGIN)

    return http.post(`user/gift/sendDetail?giftId=${giftId}`)
      .then(data => {
        commit(types.GIFT_QUERY_SENDDETAIL_SUC, { giftId })
      })
  },
  querySendList ({ commit }) {
    commit(types.GIFT_QUERY_SENDLIST_BEGIN)

    return http.post(`user/gift/sendlist/get`)
      .then(data => {
        commit(types.GIFT_QUERY_SENDLIST_SUC, data.data)
      })
  }

}

export default actions
