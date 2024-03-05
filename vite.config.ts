//import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

const port = parseInt(process.env.PORT || '3000') // Convert port value to number, fallback to default port 3000
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port,
    open: true,
    hmr: {
      overlay: true
    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': 'src'
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        format: 'esm',
        dir: 'dist'
      },
      external: ['playwright', 'vue', 'vue-router']
      // return this to /src/main.ts if stuff fail
    }
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['playwright']
  }
})
