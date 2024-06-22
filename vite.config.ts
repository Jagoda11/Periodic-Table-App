//import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

const port = parseInt(process.env.PORT || '3000') // Convert port value to number, fallback to default port 3000
// https://vitejs.dev/config/
export default defineConfig({
  base: '/Periodic-Table-App/',
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
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.ts'
      // return this to /src/main.ts if stuff fail
    }
  },
  optimizeDeps: {
    include: ['playwright']
  }
})
