/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../common/httpUtil'
import * as types from './logisticsMutationTypes'

const actions = {

  queryLogisticsList ({ commit }, { deliveryId } = {}) {
    commit(types.GIFT_QUERY_LOGISTICS_BEGIN)

    return http.get(`user/gift/logisticslist/get?deliveryId=${deliveryId}`)
      .then(data => {
        commit(types.GIFT_QUERY_LOGISTICS_SUC, data.data)
      })
  }

}

export default actions
