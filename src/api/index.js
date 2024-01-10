//当前这个模块，API进行统一管理
import requests from './request'
import mockRequest from './mockAjax'

const getCategoryList = () => requests.get('/product/getCategory1')

const getCategoryList2 = (id) => {
  return requests({
    url: '/product/getCategory2/' + id,
    method: 'get',
  })
}

const getCategoryList3 = (id) => {
  return requests({
    url: '/product/getCategory3/' + id,
    method: 'get',
  })
}

//获取首页轮播图的接口
const getBannerList = () => mockRequest.get('/banner')

export { getCategoryList, getCategoryList2, getCategoryList3, getBannerList }
