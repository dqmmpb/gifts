/**
 * Created by alphabeta on 16-12-29.
 */

import http from '../../../common/httpUtil'
import * as types from './giftGiveMutationTypes'

const actions = {

  queryGiftGives ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    console.log(pageIndex)
    commit(types.GIFT_QUERY_GIFTS_BEGIN, {pageIndex})

    return http.get(`gift/give/query?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(data => {
        commit(types.GIFT_QUERY_GIFTS_SUC, data.data)
      })
  }

}

export default actions
