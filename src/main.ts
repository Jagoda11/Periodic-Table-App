import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import './components/PeriodicTable.vue'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import type { RouteRecordRaw } from 'vue-router' // Import RouteRecordRaw as a type only
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import PeriodicTable from './components/PeriodicTable.vue'

// Define your routes
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
    component: () => import('./views/AboutView.vue')
  }
  // Add other routes as needed
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Create the Vue app
const app = createApp(App)

// Global error handler for unhandled errors
window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error)
})

// Use Pinia and the router in the app
app.use(createPinia())
app.use(router)

// Mount the app
app.mount('#app')
