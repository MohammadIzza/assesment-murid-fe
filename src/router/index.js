/**
 * File: router/index.js
 * Deskripsi: Konfigurasi routing untuk aplikasi guru
 * Fungsi: Mengatur navigasi dan akses ke halaman-halaman guru
 */

// Import layout components
import Admin from '@/layouts/Admin.vue'      // Layout untuk halaman admin

// Import komponen-komponen halaman guru
import GuruList from '@/views/guru/GuruList.vue'
import GuruDetail from '@/views/guru/GuruDetail.vue'
import GuruIndex from '@/views/guru/index.vue'

// Import fungsi router dari vue-router
import { createRouter, createWebHistory } from 'vue-router'

// Membuat instance router
const router = createRouter({
  // Menggunakan mode history untuk URL yang bersih (tanpa #)
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // Konfigurasi routes
  routes: [
    // Route untuk guru management
    {
      path: '/',
      component: Admin,
      children: [
        {
          path: '',
          name: 'guru-index',
          component: GuruIndex,
          meta: {
            requiresAuth: false,  // Tidak memerlukan autentikasi untuk demo
            title: 'Guru Management',
          },
        },
        {
          path: 'guru',
          name: 'guru-index',
          component: GuruIndex,
          meta: {
            requiresAuth: false,
            title: 'Guru Management',
          },
        },
        {
          path: 'guru/list',
          name: 'guru-list',
          component: GuruList,
          meta: {
            requiresAuth: false,
            title: 'Daftar Guru',
          },
        },
        {
          path: 'guru/:id',
          name: 'guru-detail',
          component: GuruDetail,
          meta: {
            requiresAuth: false,
            title: 'Detail Guru',
          },
        },
      ],
    },
  ],
})

// Middleware untuk mengecek autentikasi (disabled untuk demo)
router.beforeEach(async (to, from, next) => {
  // Untuk demo, skip autentikasi
  next()
})

export default router
