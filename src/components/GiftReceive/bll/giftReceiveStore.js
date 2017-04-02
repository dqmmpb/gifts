/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './giftReceiveAction'
import mutations from './giftReceiveMutation'

const state = {
  currentPage: 1,
  totalCount: 0,
  isLoading: false,
  gifts: []
}

const getters = {
  isLoading: state => state.isLoading,
  getGiftReceives: state => state.gifts,
  getGiftReceivesCurrentPage: state => state.currentPage,
  getGiftReceivesTotalCount: state => state.totalCount
}

export default {
  state,
  getters,
  actions,
  mutations
}
