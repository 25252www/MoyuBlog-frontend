import axios from 'axios'
import { ElNotification } from 'element-plus'
import router from './router'
import {store} from './store'

axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = '/api/'

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
        let res = response.data;

        console.log("=================")
        console.log(res)
        console.log("=================")

        if (res.code === 200) {
            return response
        }
        else {
            new ElNotification({
                title: 'Error',
                message: '用户名或密码错误',
                type: 'error',
            })
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        console.log(error)
        if(error.response.data) {
            error.message = error.response.data.msg
        }
        //权限不足
        if(error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        new ElNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
        })
        return Promise.reject(error)
    }
)