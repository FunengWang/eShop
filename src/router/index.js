import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onComplete, onReject) {
  if (onComplete && onReject) {
    originPush.call(this, location, onComplete, onReject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, onComplete, onReject) {
  if (onComplete && onReject) {
    originReplace.call(this, location, onComplete, onReject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

export default new VueRouter({
  routes,
  //控制路由跳转时，滚动条在最上方
  scrollBehavior(to, from, savedPosition) {
    return {  y: 0 }
  },
})
