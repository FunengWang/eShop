import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store'


Vue.config.productionTip = false
//register a global component
Vue.component(TypeNav.name, TypeNav)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
