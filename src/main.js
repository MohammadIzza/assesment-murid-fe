/**
 * File: main.js
 * Deskripsi: File utama yang menginisialisasi aplikasi Vue.js
 * Fungsi: Mengatur dan menghubungkan semua komponen utama aplikasi
 */

// Import library Vue.js untuk membuat aplikasi
import { createApp } from 'vue'
// Import Pinia untuk state management (seperti Redux/Vuex)
import { createPinia } from 'pinia'
// Import komponen utama aplikasi
import App from './App.vue'
// Import konfigurasi router
import router from './router'
// Import file CSS utama
import './assets/main.css'
// Import dark mode CSS - pastikan file ini ada dan diimpor dengan benar
import './assets/dark-mode.css'
// Import auth store untuk inisialisasi
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'
import Cookies from 'js-cookie';

// Membuat instance aplikasi Vue
const app = createApp(App)
// Membuat instance Pinia untuk state management
const pinia = createPinia()

// Menggunakan Pinia di aplikasi
app.use(pinia)
// Menggunakan Router di aplikasi
app.use(router)

// Initialize auth store
const authStore = useAuthStore()
// Use async/await for proper initialization
async function initApp() {
  await authStore.initAuth()
  
  // Initialize theme store
  const themeStore = useThemeStore()
  themeStore.initTheme()
  
  // Mount the app after initialization
  app.mount('#app')
}

// Start initialization
initApp()
