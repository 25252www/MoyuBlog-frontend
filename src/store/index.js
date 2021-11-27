import {createStore} from 'vuex'

export const store = createStore({
    state() {
        return {
            //属性
            token: '',
            userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
        }
    },
    mutations: {
        // set方法
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            //浏览器关闭即删除，sessionStorage只能存String
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        REMOVE_INFO: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem("token", '')
            sessionStorage.setItem("userInfo", JSON.stringify(''))
        }

    },
    getters: {
        // get方法
        getUser: state => {
            return state.userInfo
        }

    },
    actions: {},
    modules: {}
})
