import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import PeriodicTable from '../../src/components/PeriodicTable.vue'

const routes: RouteRecordRaw[] = [
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
