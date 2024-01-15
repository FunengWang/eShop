import Home from '@/pages/Home/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import Order from '@/pages/Center/Order'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [
  {
    path: '/center',
    // name: 'PaySuccess',
    component: Center,
    meta: {
      footerShow: true,
    },
    children: [
      {
        path: 'order',
        component: Order,
      },
      {
        path: 'groupOrder',
        component: GroupOrder,
      },
      {
        path: '/center',
        redirect: '/center/order',
      },
    ],
  },
  {
    path: '/paySuccess',
    name: 'PaySuccess',
    component: PaySuccess,
    meta: {
      footerShow: true,
    },
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay,
    meta: {
      footerShow: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/trade',
    name: 'Trade',
    component: Trade,
    meta: {
      footerShow: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta: {
      footerShow: true,
    },
  },
  {
    path: '/addCartSuccess',
    name: 'AddCartSuccess',
    component: AddCartSuccess,
    meta: {
      footerShow: true,
    },
  },
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
