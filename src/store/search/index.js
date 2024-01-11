import { getSearchInfoList } from '@/api'

const state = {
  searchInfo: {},
}
const actions = {
  async searchInfoList(context, params = {}) {
    let result = await getSearchInfoList(params)
    if (result.code == 200) {
      context.commit('SEARCHINFOLIST', result.data)
    }
  },
}
const mutations = {
  SEARCHINFOLIST(state, data) {
    state.searchInfo = data
  },
}

const getters = {
  goodList(state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  },
  attrsList(state) {
    return state.searchInfo.attrsList || []
  }
}

export default {
  actions,
  mutations,
  state,
  getters,
}
