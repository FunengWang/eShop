import { getCategoryList, getBannerList, getFloorList } from '@/api'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
}

const actions = {
  async categoryList(context) {
    let result = await getCategoryList()
    if (result.code == 200) {
      context.commit('CATEGORYLIST', result.data)
    }
  },
  async bannerList(context) {
    let result = await getBannerList()
    if (result.code == 200) {
      context.commit('BANNERLIST', result.data)
    }
  },
  async floorList(context) {
    let result = await getFloorList()
    if (result.code == 200) {
        context.commit('FLLORLIST', result.data)
      }
  },
}

const mutations = {
  CATEGORYLIST(state, data) {
    state.categoryList = data
  },
  BANNERLIST(state, data) {
    state.bannerList = data
  },
  FLLORLIST(state, data) {
    state.floorList = data
  },
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters,
}
