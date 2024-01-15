import { getShopCartList } from '@/api'

const state = {
  cartInfoList: [],
}
const actions = {
  async shopCartList(context) {
    let result = await getShopCartList()
    if (result.code == 200) {
      context.commit('SHOPCARTLIST', result.data)
    }
  },
}
const mutations = {
  SHOPCARTLIST(state, data) {
    if (data.length > 0) {
      state.cartInfoList = data[0].cartInfoList
    }
  
  },
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters,
}
