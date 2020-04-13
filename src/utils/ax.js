import Vue from 'vue'
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.interceptors.request.use(function (config) {
  var userinfo = window.sessionStorage.getItem('userinfo')
  if (userinfo) {
    var token = JSON.parse(userinfo).token
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    router.push({ name: 'login' })
  }
  return Promise.reject(error)
})
axios.defaults.transformResponse = [function (data) {
  if (data) {
    return JSONbig.parse(data)
  } else {
    return data
  }
}]
Vue.prototype.$http = axios
