import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/PeriodicTable.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Global error handler for unhandled errors
window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
