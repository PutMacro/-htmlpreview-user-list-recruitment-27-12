import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user list',
      component: () => import('../components/UserList.vue')
    },
    {
      path: '/edit',
      name: 'edit user',
      component: () => import('../components/EditUser.vue')
    },
    {
      path: '/add',
      name: 'add user',
      component: () => import('../components/AddUser.vue')
    }
  ]
})

export default router
