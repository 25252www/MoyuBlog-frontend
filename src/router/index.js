import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/Login')
  },
  {
    path: '/blogs/:id',
    component:() => import('../views/Blog')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
