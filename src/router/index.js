import {createRouter, createWebHistory} from 'vue-router'

import Layout from '../layout'


const routes = [
    {
        path: '/login',
        component: () => import('../views/Login'),
    },
    {
        path: '/404',
        component: () => import('../views/404'),
        hidden: true
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
                path: 'add',
                component: () => import('../views/BlogEdit'),
                meta: {
                    requireAuth: true
                },
            },
            {
                path: ':id',
                component: () => import('../views/Blog')
            },
            {
                path: 'edit/:blogId',
                component: () => import('../views/BlogEdit'),
                meta: {
                    requireAuth: true
                },
            }
        ]
    },
    {
        path: '/form',
        component: Layout,
        meta: {
            requireAuth: true
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
            requireAuth: true
        },
        children: [
            {
                path: '',
                component: () => import('../views/Lab')
            }
        ]
    },
    // 404 page must be placed at the end !!!
    {path: '/:pathMatch(.*)*', redirect: '/404', hidden: true}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export function resetRouter() {
    const newRouter = createRouter({
        history: createWebHistory(),
        routes
    })
    router.matcher = newRouter.matcher // reset router
}

export default router
