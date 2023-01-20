import router from "./router";
import {getToken} from "./utils/auth";
import {store} from "./store";


// 路由判断登录 根据路由配置文件的参数
router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()
    // 如果该路由需要登录权限
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (hasToken) {
            if (to.path === '/login') {
                next({
                    path: '/login'
                })
            } else {
                const hasGetUserInfo = store.getters.username
                if (hasGetUserInfo) {
                    next()
                } else {
                    try {
                        // get user info
                        await store.dispatch('user/getInfo')
                        next()
                    } catch (error) {
                        // remove token and go to login page to re-login
                        await store.dispatch('user/resetToken')
                        next({
                            path: '/login',
                            query: {redirect: to.fullPath}
                        })
                    }
                }
            }
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    // 如果该路由不需要登录权限
    else {
        if (hasToken) {
            if (to.path === '/login') {
                next({
                    path: '/login'
                })
            } else {
                const hasGetUserInfo = store.getters.username
                if (hasGetUserInfo) {
                    next()
                } else {
                    try {
                        // get user info
                        await store.dispatch('user/getInfo')
                    } catch (error) {
                        // remove token and go to login page to re-login
                        await store.dispatch('user/resetToken')
                    } finally {
                        next()
                    }
                }
            }
        } else {
            next()
        }
    }
})
