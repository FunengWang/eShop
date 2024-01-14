import { reqPayInfo,reqPayStatus } from '@/api'

const state = {
  paymentInfo: {},
}

const actions = {
  async getPayInfo(context, orderId) {
    let result = await reqPayInfo(orderId)
    if (result.code == 200) {
      context.commit('PAYMENT', result.data)
    }
  },
  async getPayStatus(context, orderId) {
    let result = await reqPayStatus(orderId)
    if (result.code == 200) {
      return 'Payment Done'
    } else {
      return 'Payment Processing'
    }
  }
}

const mutations = {
  PAYMENT(state, data) {
    state.paymentInfo = data
  },
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters,
}
