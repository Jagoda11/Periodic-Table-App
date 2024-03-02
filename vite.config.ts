//import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': 'src'
    }
  },
  build: {
    rollupOptions: {
      input: '/src/main.ts'
    }
  },
  optimizeDeps: {
    include: ['playwright']
  }
})
