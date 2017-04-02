/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './giftGiveAction'
import mutations from './giftGiveMutation'

const state = {
  currentPage: 1,
  totalCount: 0,
  isLoading: false,
  gifts: []
}

const getters = {
  isLoading: state => state.isLoading,
  getGiftGives: state => state.gifts,
  getGiftGivesCurrentPage: state => state.currentPage,
  getGiftGivesTotalCount: state => state.totalCount
}

export default {
  state,
  getters,
  actions,
  mutations
}
