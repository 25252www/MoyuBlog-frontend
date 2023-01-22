import router from "./router";
import {getToken} from "./utils/auth";
import {store} from "./store";


router.beforeEach(async (to, from, next) => {
    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/'})
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    const {roles} = await store.dispatch('user/getInfo')

                    // generate accessible routes map based on roles
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    // dynamically add accessible routes
                    accessRoutes.forEach(route => {
                        router.addRoute(route)  // addRoute, not addRoutes
                    })

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to, replace: true})
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
        // has no token
        if (to.path === '/login') {
            if(to.query.redirect){
                next()
            }else{
                next({
                    path: '/login',
                    query: {redirect: from.fullPath}
                })
            }
        }else{
            next()
        }
    }
})
