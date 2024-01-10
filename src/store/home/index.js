import { getCategoryList, getCategoryList2, getCategoryList3 } from '@/api'

const state = {
    categoryList: [],
    categoryList2: [],
    categoryList3: [],
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

    async categoryList3(context, id) {
        let result = await getCategoryList3(id)
        if (result.code == 200) {
            context.commit('CATEGORYLIST3', result.data)
        }
    }
}

const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
    },
    CATEGORYLIST2(state, data) {
        state.categoryList2 = data
    },
    CATEGORYLIST3(state, data) {
        state.categoryList3 = data
    }
}

const getters = {}

export default {
    actions, mutations, state, getters
}