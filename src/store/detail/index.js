import { getGoodsInfoList, reqAddorUpdateCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodInfo: {},
  //游客的临时身份
  uuid_token: getUUID(),
}

const actions = {
  async goodInfoList(context, skuId) {
    let result = await getGoodsInfoList(skuId)
    if (result.code == 200) {
      context.commit('GOODINFOLIST', result.data)
    }
  },

  async addOrUpdateCart(context, { skuId, skuNum }) {
    let result = await reqAddorUpdateCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      Promise.reject(new Error('Failed'))
    }
  },
}

const mutations = {
  GOODINFOLIST(state, data) {
    state.goodInfo = data
  },
}

const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  saleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  },
}

export default {
  actions,
  mutations,
  state,
  getters,
}
