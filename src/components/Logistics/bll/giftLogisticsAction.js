/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../common/httpUtil'
import * as types from './giftLogisticsMutationTypes'

const actions = {

  queryLogisticss ({ commit }, {giftId} = {}) {
    commit(types.GIFT_QUERY_LOGISTICS_BEGIN)

    return http.get(`logistics/query?giftId=${giftId}`)
      .then(data => {
        commit(types.GIFT_QUERY_LOGISTICS_SUC, data.data)
      })
  }

}

export default actions
