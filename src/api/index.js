//当前这个模块，API进行统一管理
import requests from "./request"

//三级联动接口
//http://39.98.123.211:8510/admin/product/getCategory1
//http:39.98.123.211:8510/admin/product/getCategory2/{{id}}
//http://39.98.123.211:8510/admin/product/getCategory3/2

const getCategoryList = () => {
    return requests({
        url: '/product/getCategory1',
        method: 'get'
    })
}

const getCategoryList2 = (id) => {
    return requests({
        url: '/product/getCategory2/' + id,
        method: 'get'
    })
}

const getCategoryList3 = (id) => {
    return requests({
        url: '/product/getCategory3/' + id,
        method: 'get'
    })
}

export { getCategoryList, getCategoryList2, getCategoryList3 }

