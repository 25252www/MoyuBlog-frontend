import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {
        path: '/',
        component: () => import('../layout/Layout'),
        redirect: '/dashboard',
        meta: {
            description: "这里是摸鱼战士的小站🚀，记录技术，分享生活🌟，欢迎来玩！"
        },
        children: [
            {
                path: 'dashboard',
                component: () => import('../views/dashboard/index')
            }
        ]
    },
    {
        path: '/home',
        redirect: '/'
    },
    {
        path: '/login',
        redirect: '/login/index',
        component: () => import('../layout/Layout'),
        children: [
            {
                path: 'index',
                component: () => import('../views/Login')
            }
        ]
    },
    {
        path: '/blogs',
        component: () => import('../layout/Layout'),
        children: [
            {
                path: '/blogs/add',
                name: 'BlogAdd',
                component: () => import('../views/BlogEdit'),
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/blogs/:id',
                component: () => import('../views/Blog')
            },
            {
                path: '/blogs/edit/:blogId',
                name: 'BlogEdit',
                component: () => import('../views/BlogEdit'),
                meta: {
                    requireAuth: true
                },
            }
        ]
    },
    {
        path: '/form',
        component: () => import('../layout/Layout'),
        redirect: '/form/index',
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/Form')
            }
        ]
    },
    {
        path: '/lab',
        component: () => import('../layout/Layout'),
        redirect: '/lab/index',
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/Lab')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
