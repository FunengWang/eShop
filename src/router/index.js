import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes'
import store from '@/store'

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

let router = new VueRouter({
  routes,
  //控制路由跳转时，滚动条在最上方
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  },
})

//全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    //用户已经登录
    if (to.path == '/login') {
      //禁止回到login,停留在首页
      next('/home')
    } else {
      //访问非login模块
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token 过期，跳转到login
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    //未登录 不得访问以下component
    if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
  }
})

export default router
