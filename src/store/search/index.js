import { getSearchInfoList } from '@/api'

const state = {
  searchInfoList: [],
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
    state.searchInfoList = data
  },
}

const getters = {}
export default {
  actions,
  mutations,
  state,
  getters,
}
