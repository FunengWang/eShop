import { getCategoryList, getCategoryList2, getCategoryList3 } from '@/api'
import Vue from 'vue'

const state = {
    categoryList: []
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

}

const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
    },
    CATEGORYLIST2(state, data) {
        let id = data[0].category1Id
        let category = state.categoryList[id - 1]
        Vue.set(category, 'childCategories', data)
    }
  
}

const getters = {}

export default {
    actions, mutations, state, getters
}