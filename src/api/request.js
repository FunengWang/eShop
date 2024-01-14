//对于axios进行二次封装
import axios from 'axios'
//引入进度条 start:进度条开始 done:进度条结束
import nProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

//请求拦截器
requests.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('TOKEN')
  if (token) {
    config.headers.token = token
  }
  nProgress.start()
  return config
})

//响应拦截器
requests.interceptors.response.use(
  (response) => {
    nProgress.done()
    return response.data
  },
  (error) => {
    return Promise.reject(new Error('Failed'))
  }
)

export default requests
