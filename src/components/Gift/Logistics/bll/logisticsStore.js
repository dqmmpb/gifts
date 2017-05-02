/**
 * Created by alphabeta on 16-12-29.
 */

import actions from './logisticsAction'
import mutations from './logisticsMutation'

const state = {
  orderTime: null,
  orderNo: null,
  deliveryComp: null,
  logistics: []
}

const getters = {
  getLogisticsList: state => state.logistics,
  getLogisticsOrderTime: state => state.orderTime,
  getLogisticsOrderNo: state => state.orderNo,
  getLogisticsDeliveryComp: state => state.deliveryComp
}

export default {
  state,
  getters,
  actions,
  mutations
}
