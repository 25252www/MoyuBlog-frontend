import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
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
