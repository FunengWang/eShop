import { getCategoryList, getCategoryList2, getCategoryList3, getBannerList } from '@/api'
import Vue from 'vue'

const state = {
    categoryList: [],
    bannerList: []
}

const actions = {
    async categoryList(context) {
        let result = await getCategoryList()
        if (result.code == 200) {
            context.commit('CATEGORYLIST', result.data)
        }
    },
    async categoryList2(context, id) {
        let result = await getCategoryList2(id)
        if (result.code == 200) {
            context.commit('CATEGORYLIST2', result.data)
        }
    },
    async bannerList(context) {
        let result = await getBannerList()
        if (result.code == 200) {
            context.commit('BANNERLIST', result.data)
        }
    },

}

const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
    },
    CATEGORYLIST2(state, data) {
        let id = data[0].category1Id
        let category = state.categoryList[id - 1]
        Vue.set(category, 'childCategories', data)
    },
    BANNERLIST(state, data) {
        state.bannerList = data
    }
  
}

const getters = {}

export default {
    actions, mutations, state, getters
}