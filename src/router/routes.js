import Home from '@/pages/Home/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'

export default [
  {
    path: '/home',
    component: Home,
    meta: {
      footerShow: true,
    },
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: {
      footerShow: true,
    },
  },
  {
    name: 'Search',
    path: '/search/:keyword',
    component: Search,
    meta: {
      footerShow: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      footerShow: false,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      footerShow: false,
    },
  },

  {
    //重定向，在项目运行起来后，访问/，立马定向到首页
    path: '*',
    redirect: '/home',
  },
]
