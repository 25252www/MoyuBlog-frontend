import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home')
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
