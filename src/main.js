import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store'
import Mock from './mock/mockServe'
import 'swiper/css/swiper.css'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

Vue.config.productionTip = false
//register a global component
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
