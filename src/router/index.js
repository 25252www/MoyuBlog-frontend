import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home'),
        meta: {
            description:"这里是摸鱼战士的小站🚀，记录技术，分享生活🌟，欢迎来玩！"
        }
    },
    {
        path: '/home',
        redirect: '/'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/blogs/add',
        name: 'BlogAdd',
        component: () => import('../views/BlogEdit'),
        meta: {
            requireAuth: true
        }
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
        }
    },
    {
        path:'/form',
        component: ()=>import('../views/Form'),
        meta: {
            requireAuth: true
        }
    },
    {
        path:'/lab',
        component:()=>import('../views/Lab')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
