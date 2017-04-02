/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../common/httpUtil'
import * as types from './giftGiveDetailMutationTypes'

const actions = {

  queryGiftGiveDetail ({ commit }, { giftId } = {}) {
    commit(types.GIFT_QUERY_GIFT_BEGIN)

    return http.get(`gift/give/detail?giftId=${giftId}`)
      .then(data => {
        commit(types.GIFT_QUERY_GIFT_SUC, data.data)
      })
  }

}

export default actions
