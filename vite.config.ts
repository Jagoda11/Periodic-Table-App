//import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

const port = parseInt(process.env.PORT || '3000') // Convert port value to number, fallback to default port 3000
// const previewPort = 3001 // Use a different port to avoid conflicts with the local dev server
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': 'src'
    }
  },
  build: {
    rollupOptions: {
      input: 'src/main.ts'
      // return this to /src/main.ts if stuff fail
    }
  },
  optimizeDeps: {
    include: ['playwright']
  }
})
