import {createRouter, createWebHistory} from 'vue-router'

import Layout from '../layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('../views/Login'),
    },
    {
        path: '/404',
        component: () => import('../views/404'),
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('../views/dashboard/index')
            }
        ]
    },
    {
        path: '/blogs',
        component: Layout,
        children: [
            {
                path: ':id',
                component: () => import('../views/Blog')
            },
        ]
    },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    {
        path: '/blogs',
        component: Layout,
        children: [
            {
                path: 'add',
                component: () => import('../views/BlogEdit'),
                meta: {
                    roles: ['admin']
                },
            },
            {
                path: 'edit/:blogId',
                component: () => import('../views/BlogEdit'),
                meta: {
                    roles: ['admin']
                },
            }
        ]
    },
    {
        path: '/form',
        component: Layout,
        meta: {
            roles: ['admin']
        },
        children: [
            {
                path: '',
                component: () => import('../views/Form')
            }
        ]
    },
    {
        path: '/lab',
        component: Layout,
        meta: {
            roles: ['admin']
        },
        children: [
            {
                path: '',
                component: () => import('../views/Lab')
            }
        ]
    },
    // 404 page must be placed at the end !!!
    {path: '/:pathMatch(.*)*', redirect: '/404'}
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
})

export function resetRouter() {
    const newRouter = router
    router.matcher = newRouter.matcher // reset router
}

export default router
