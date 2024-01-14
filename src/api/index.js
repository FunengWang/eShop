//当前这个模块，API进行统一管理
import requests from './request'
import mockRequest from './mockAjax'

//获取商品分类的接口
const getCategoryList = () => mockRequest.get('/category')

//获取首页轮播图的接口
const getBannerList = () => mockRequest.get('/banner')

//获取floor数据
const getFloorList = () => mockRequest.get('/floor')



const getSearchInfoList = (params) =>
  requests({
    url: '/list',
    method: 'post',
    data: params,
  })

//获取产品详情的接口
const getGoodsInfoList = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: 'get',
  })

//将产品添加到购物车中或者更新
// /api/cart/addToCart/{skuId}/{skuNum]} POST
const reqAddorUpdateCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  })

const getShopCartList = () =>
  requests({
    url: '/cart/cartList',
    method: 'get',
  })

/**
 * 注册
 * /api/user/passport/register
 */
const reqUserRegister = (data) =>
  requests({
    url: '/user/passport/register',
    data,
    method: 'post',
  })

  /**
 * 获取验证码 
 * /user/passport/sendCode/${phone}
 */
const reqGetPassCode = (phone) =>
requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get',
})


 /**
 * 登录 
 * /user/passport/login
 */
 const reqUserLogin = (data) =>
 requests({
   url: '/user/passport/login',
   data,
   method: 'post',
 })

 /**
  * 获取用户信息,带着服务器的token向服务器索要用户信息
  * /api/user/passport/auth/getUserInfo method:get
  */
 const reqGetUserInfo= () =>
 requests({
   url: '/user/passport/auth/getUserInfo',
   method: 'get',
 })

 /**
  * 退出登录
  * /api/user/passport/logout  get
  */
 const reqLogOut= () =>
 requests({
   url: '/user/passport/logout',
   method: 'get',
 })
 
export {
  getCategoryList,
  getBannerList,
  getFloorList,
  getSearchInfoList,
  getGoodsInfoList,
  reqAddorUpdateCart,
  getShopCartList,
  reqGetPassCode,
  reqUserRegister,
  reqUserLogin,
  reqGetUserInfo,
  reqLogOut
}
