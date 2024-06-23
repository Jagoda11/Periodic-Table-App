import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { resolve } from 'path'

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
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'src/main.ts')
    }
  },
  optimizeDeps: {
    include: ['playwright']
  }
})
