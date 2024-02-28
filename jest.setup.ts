// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createApp } from 'vue'
import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// Setup Pinia
config.global.plugins.push(createPinia())

// Setup Vue Router if your components depend on routing
const router: Router = createRouter({
  history: createWebHistory(),
  routes: [] // Define your routes here if necessary
})
config.global.plugins.push(router)
