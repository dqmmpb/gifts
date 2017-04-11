/**
 * Created by alphabeta on 16-12-29.
 */

import * as types from './askForMutationTypes'

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.ASKFOR_STORE_AMOUNT_SUC] (state, data) {
    state.budget = data
  },
  [types.ASKFOR_AMOUNT_BEGIN] (state) {
  },
  [types.ASKFOR_AMOUNT_SUC] (state, data) {
    state.amount = data
  },
  [types.ASKFOR_PREPAY_BEGIN] (state) {
  },
  [types.ASKFOR_PREPAY_SUC] (state, data) {
  },
  [types.ASKFOR_SHARE_SUC] (state, data) {
  }
}

export default mutations
