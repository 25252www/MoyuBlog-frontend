import axios from 'axios'
import {ElNotification} from 'element-plus'
import router from './router'
import {store} from './store'

// create an axios instance
const service = axios.create({
    baseURL: '/api',
    timeout: 60000
})

// 前置拦截
service.interceptors.request.use(config => {
    // 从localStorage中获取token
    const token = localStorage.getItem('token')
    // 如果token存在，就在请求头中添加token
    if (token) {
        config.headers.Authorization = token
    }
    return config
})

// 后置拦截
service.interceptors.response.use(response => {
    // 只有HTTP状态码和返回的data.code都为200时才认为是成功
    if (response.data.code === 200) {
        return response
    } else {
        ElNotification({
            title: 'Error',
            message: response.data.msg,
            type: 'error'
        })
        return Promise.reject(response.data.msg)
    }
}, error => {
    if (error.response.data) {
        error.message = error.response.data.msg
    }
    // 401: 未登录
    if (error.response.status === 401) {
        store.commit('REMOVE_INFO')
        router.push('/login')
    }
    // 403: 无权限
    if (error.response.status === 403) {
        error.message = '无权限'
    }
    ElNotification({
        title: 'Error',
        message: error.message,
        type: 'error'
    })
    return Promise.reject(error)
})

export default service
