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

export { getCategoryList, getBannerList, getFloorList, getSearchInfoList }
