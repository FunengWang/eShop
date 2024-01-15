import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from '@/store'
import Mock from './mock/mockServe'
import 'swiper/css/swiper.css'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/loading.gif'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.config.productionTip = false
//register a global component
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.use(VueLazyload, { loading })
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`,
  },
  attributes: {
    phone: '手机号',
    passcode: '验证码',
    password: '密码',
    passwordConfirm: '确认密码',
    isCheck: '协议',
  },
})

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
