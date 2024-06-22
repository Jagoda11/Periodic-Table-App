// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createApp } from 'vue'
import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'

// Setup Pinia
config.global.plugins.push(createPinia())

// Mocking Vue Router to avoid test errors
jest.mock('vue-router', () => ({
  createRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn()
    // Add other router methods as needed for your tests
  })),
  createWebHistory: jest.fn(),
  // If component uses useRoute or useRouter, mock them here
  useRouter: () => ({
    push: jest.fn()
    // add other methods as necessary
  }),
  useRoute: () => ({
    params: {},
    query: {}
    // add other route properties as necessary
  })
}))
