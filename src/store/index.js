import Vuex from 'vuex'
import Vue from 'vue'
import home from './home'
import search from './search'
import detail from './detail'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { home, search, detail },
})
