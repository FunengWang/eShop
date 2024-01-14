import { reqAddressInfo, reqOrderInfo, reqSubmitOrder } from '@/api'

const state = {
  addressList: [],
  orderInfo: {},
  orderId: '',
}
const actions = {
  async getUserAddress(context) {
    let result = await reqAddressInfo()
    if (result.code == 200) {
      context.commit('USERADDRESS', result.data)
    }
  },
  async getOrderInfo(context) {
    let result = await reqOrderInfo()
    if (result.code == 200) {
      context.commit('ORDERINFO', result.data)
    }
  },
  async submitOrder(context, { tradeNo, data }) {
    let result = await reqSubmitOrder(tradeNo, data)
    if (result.code == 200) {
      context.commit('SUBMITORDER', result.data)
      return 'ok'
    } else {
      Promise.reject(new Error(result.data))
    }
  },
}
const mutations = {
  USERADDRESS(state, data) {
    state.addressList = data
  },
  ORDERINFO(state, data) {
    state.orderInfo = data
  },
  SUBMITORDER(state, data) {
    state.orderId = data
  },
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters,
}
