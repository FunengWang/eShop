import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: '/home',
        component: Home
    },
    {
        path: '/search',
        component: Search
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    },

    ]
})