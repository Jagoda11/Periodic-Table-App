import { createRouter, createWebHistory } from 'vue-router'
import PeriodicTable from '../components/PeriodicTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/periodic-table' // Redirect root path to /periodic-table
    },
    {
      path: '/periodic-table',
      name: 'PeriodicTable',
      component: PeriodicTable
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
    // other routes...
  ]
})

export default router
