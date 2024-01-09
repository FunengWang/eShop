import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onComplete, onReject) {
    if (onComplete && onReject) {
        originPush.call(this, location, onComplete, onReject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, onComplete, onReject) {
    if (onComplete && onReject) {
        originReplace.call(this, location, onComplete, onReject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


export default new VueRouter({
    routes: [{
        path: '/home',
        component: Home,
        meta: {
            footerShow: true
        }
    },
    {
        name: 'Search',
        path: '/search/:keyword',
        component: Search,
        meta: {
            footerShow: true
        }
    }, {
        path: '/login',
        component: Login,
        meta: {
            footerShow: false
        }
    }, {
        path: '/register',
        component: Register,
        meta: {
            footerShow: false
        }
    }, {
        //重定向，在项目运行起来后，访问/，立马定向到首页
        path: '*',
        redirect: '/home'
    }]
})