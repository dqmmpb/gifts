/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../common/httpUtil'
import * as types from './giftReceiveDetailMutationTypes'

const actions = {

  queryGiftReceiveDetail ({ commit }, { giftId, status } = {}) {
    commit(types.GIFT_QUERY_GIFT_BEGIN)

    return http.get(`gift/receive/detail?giftId=${giftId}&status=${status}`)
      .then(data => {
        commit(types.GIFT_QUERY_GIFT_SUC, data.data)
      })
  }

}

export default actions
