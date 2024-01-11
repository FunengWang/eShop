import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store'
import Mock from './mock/mockServe'
import 'swiper/css/swiper.css'
import Carousel from '@/components/Carousel'

Vue.config.productionTip = false
//register a global component
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
