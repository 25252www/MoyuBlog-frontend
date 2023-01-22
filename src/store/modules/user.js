import {getToken, removeToken, setToken} from "../../utils/auth";
import {getInfo, login, logout, register} from "../../api/user";
import {resetRouter} from "../../router";
import {ElNotification} from "element-plus";

const getDefaultState = () => {
    return {
        token: getToken(),
        username: '',
        roles: [],
        avatar: '',
        phone: '',
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_PHONE: (state, phone) => {
        state.phone = phone
    }
}

const actions = {
    login({commit}, loginForm) {
        return new Promise((resolve, reject) => {
            login(loginForm).then(res => {
                const jwt = res.headers['authorization']
                commit("SET_TOKEN", jwt)
                setToken(jwt)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    register({commit}, registerForm) {
        return new Promise((resolve, reject) => {
            register(registerForm).then(res => {
                const jwt = res.headers['authorization'];
                commit("SET_TOKEN", jwt)
                setToken(jwt)
                ElNotification({
                    title: 'Info',
                    message: '注册成功',
                    type: 'info'
                })
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(res => {
                const userInfo = res.data.data
                commit('SET_USERNAME', userInfo.username)
                commit('SET_ROLES', userInfo.roles)
                commit('SET_AVATAR', userInfo.avatar)
                commit('SET_PHONE', userInfo.phone)
                resolve(userInfo)
            }).catch(error => {
                reject(error)
            })
        })
    },

    logout({commit}) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                console.log("logout success")
                removeToken()
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken()
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
