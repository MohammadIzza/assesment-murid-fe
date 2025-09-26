/**
 * File: router/index.js
 * Deskripsi: Konfigurasi routing untuk aplikasi guru dengan authentication
 * Fungsi: Mengatur navigasi dan akses ke halaman-halaman guru
 */

// Import layout components
import Admin from '@/layouts/Admin.vue'      // Layout untuk halaman admin

// Import komponen-komponen halaman guru
import GuruList from '@/views/guru/GuruList.vue'
import GuruDetail from '@/views/guru/GuruDetail.vue'
import GuruEdit from '@/views/guru/GuruEdit.vue'
import GuruIndex from '@/views/guru/index.vue'

// Import komponen dashboard
import Dashboard from '@/views/dasbord/index.vue'

// Import komponen auth
import Login from '@/views/auth/login.vue'
import Register from '@/views/auth/regist.vue'

// Import komponen profile
import SettingsView from '@/views/profile/SettingsView.vue'

// Import komponen siswa
import SiswaList from '@/views/siswa/SiswaList.vue'
import SiswaEdit from '@/views/siswa/SiswaEdit.vue'
import SiswaDetail from '@/views/siswa/SiswaDetail.vue'

// Import komponen kelas
import KelasList from '@/views/kelas/KelasList.vue'
import KelasDetail from '@/views/kelas/KelasDetail.vue'
import KelasEdit from '@/views/kelas/KelasEdit.vue'
import KelasIndex from '@/views/kelas/index.vue'

// Import komponen capaian kelas
import CapaianKelasList from '@/views/capaian_kelas/CapaianKelasList.vue'
import CapaianKelasDetail from '@/views/capaian_kelas/CapaianKelasDetail.vue'
import CapaianKelasEdit from '@/views/capaian_kelas/CapaianKelasEdit.vue'
import CapaianKelasIndex from '@/views/capaian_kelas/index.vue'

// Import komponen assessment
import AssignmentDetail from '@/views/assesment/AssignmentDetail.vue'

// Import fungsi router dari vue-router
import { createRouter, createWebHistory } from 'vue-router'

// Membuat instance router
const router = createRouter({
  // Menggunakan mode history untuk URL yang bersih (tanpa #)
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // Konfigurasi routes
  routes: [
    // Auth routes (tidak memerlukan layout)
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
        title: 'Login',
        guestOnly: true, // Hanya untuk user yang belum login
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false,
        title: 'Register',
        guestOnly: true, // Hanya untuk user yang belum login
      },
    },
    
    // Protected routes dengan layout
    {
      path: '/',
      component: Admin,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
          meta: {
            requiresAuth: true,
            title: 'Dashboard',
          },
        },
        {
          path: 'dashboard',
          name: 'dashboard-main',
          component: Dashboard,
          meta: {
            requiresAuth: true,
            title: 'Dashboard',
          },
        },
        {
          path: 'guru',
          name: 'guru-index',
          component: GuruIndex,
          meta: {
            requiresAuth: true,
            title: 'Guru Management',
          },
        },
        {
          path: 'guru/list',
          name: 'guru-list',
          component: GuruList,
          meta: {
            requiresAuth: true,
            title: 'Daftar Guru',
          },
        },
        {
          path: 'guru/add',
          name: 'guru-add',
          component: GuruEdit,
          meta: {
            requiresAuth: true,
            title: 'Tambah Guru',
          },
        },
        {
          path: 'guru/:id',
          name: 'guru-detail',
          component: GuruDetail,
          meta: {
            requiresAuth: true,
            title: 'Detail Guru',
          },
        },
        {
          path: 'guru/:id/edit',
          name: 'guru-edit',
          component: GuruEdit,
          meta: {
            requiresAuth: true,
            title: 'Edit Guru',
          },
        },
        // Profile routes
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/profile/ProfileView.vue'),
          meta: {
            requiresAuth: true,
            title: 'Profil Saya',
          },
        },
        {
          path: 'verifikasiNIP',
          name: 'verifikasi-nip',
          component: () => import('@/views/auth/verifikasiNIP.vue'),
          meta: {
            requiresAuth: true,
            title: 'Verifikasi NIP',
          },
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView,
          meta: {
            requiresAuth: true,
            title: 'Pengaturan',
          },
        },
        // Siswa routes
        {
          path: 'siswa',
          name: 'SiswaList',
          component: SiswaList,
          meta: {
            requiresAuth: true,
            title: 'Daftar Siswa',
          },
        },
        {
          path: 'siswa/add',
          name: 'SiswaAdd',
          component: SiswaEdit,
          meta: {
            requiresAuth: true,
            title: 'Tambah Siswa',
          },
        },
        {
          path: 'siswa/:id/edit',
          name: 'SiswaEdit',
          component: SiswaEdit,
          meta: {
            requiresAuth: true,
            title: 'Edit Siswa',
          },
        },
        {
          path: 'siswa/:id',
          name: 'SiswaDetail',
          component: SiswaDetail,
          meta: {
            requiresAuth: true,
            title: 'Detail Siswa',
          },
        },
        {
          path: '/assesment',
          name: 'assesment-index',
          component: () => import('@/views/assesment/index.vue'),
          meta: {
            requiresAuth: true,
            title: 'Assessment Siswa'
          }
        },
        {
          path: 'assesment/:id/penilaian',
          name: 'assesment-penilaian',
          component: () => import('@/views/assesment/AssessmentPenilaian.vue'),
          meta: {
            requiresAuth: true,
            title: 'Penilaian Siswa'
          }
        },
        {
          path: '/assesment/detail',
          name: 'assesment-detail',
          component: AssignmentDetail
        },
        {
          path: '/assesment/:id/edit',
          name: 'assessment-edit',
          component: () => import('@/views/assesment/AssessmentEdit.vue'),
          meta: {
            requiresAuth: true,
            title: 'Edit Assessment'
          }
        },
        {
          path: '/laporan',
          name: 'laporan-nilai',
          component: () => import('@/views/laporan/LaporanNilai.vue'),
          meta: {
            requiresAuth: true,
            title: 'Laporan Nilai'
          }
        },
        // Kelas routes
        {
          path: 'kelas',
          name: 'kelas-index',
          component: KelasIndex,
          meta: {
            requiresAuth: true,
            title: 'Kelas Management',
          },
        },
        {
          path: 'kelas/list',
          name: 'kelas-list',
          component: KelasList,
          meta: {
            requiresAuth: true,
            title: 'Daftar Kelas',
          },
        },
        {
          path: 'kelas/add',
          name: 'kelas-add',
          component: KelasEdit,
          meta: {
            requiresAuth: true,
            title: 'Tambah Kelas',
          },
        },
        {
          path: 'kelas/:id',
          name: 'kelas-detail',
          component: KelasDetail,
          meta: {
            requiresAuth: true,
            title: 'Detail Kelas',
          },
        },
        {
          path: 'kelas/:id/edit',
          name: 'kelas-edit',
          component: KelasEdit,
          meta: {
            requiresAuth: true,
            title: 'Edit Kelas',
          },
        },
        // Capaian Kelas routes
        {
          path: 'capaian-kelas',
          name: 'capaian-kelas-index',
          component: CapaianKelasIndex,
          meta: {
            requiresAuth: true,
            title: 'Capaian Kelas Management',
          },
        },
        {
          path: 'capaian-kelas/list',
          name: 'capaian-kelas-list',
          component: CapaianKelasList,
          meta: {
            requiresAuth: true,
            title: 'Daftar Capaian Kelas',
          },
        },
        {
          path: 'capaian-kelas/add',
          name: 'capaian-kelas-add',
          component: CapaianKelasEdit,
          meta: {
            requiresAuth: true,
            title: 'Tambah Capaian Kelas',
          },
        },
        {
          path: 'capaian-kelas/:id',
          name: 'capaian-kelas-detail',
          component: CapaianKelasDetail,
          meta: {
            requiresAuth: true,
            title: 'Detail Capaian Kelas',
          },
        },
        {
          path: 'capaian-kelas/:id/edit',
          name: 'capaian-kelas-edit',
          component: CapaianKelasEdit,
          meta: {
            requiresAuth: true,
            title: 'Edit Capaian Kelas',
          },
        },
        
        // Admin routes - Removed admin management functionality as it's no longer needed
        // Admin user will only have access to manage other data, not admin users
      ],
    },
  ],
})

// Route guard untuk mengecek autentikasi dan otorisasi
router.beforeEach(async (to, from, next) => {
  // Import auth store disini untuk menghindari circular dependency
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()
  
  // Jika belum diinisialisasi, coba init
  if (!authStore.isAuthenticated) {
    await authStore.initAuth()
  }
  
  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const guestOnly = to.matched.some(record => record.meta.guestOnly)
  
  console.log('Route guard:', { 
    path: to.path,
    isAuthenticated, 
    requiresAuth,
    requiresAdmin, 
    isAdmin: authStore.isAdmin,
    userRole: authStore.userRole,
    user: authStore.user
  })
  
  // Jika halaman memerlukan auth tapi user belum login
  if (requiresAuth && !isAuthenticated) {
    console.log('Redirecting to login: auth required but user not authenticated')
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // Jika halaman memerlukan hak admin tapi user bukan admin
  if (requiresAdmin && !authStore.isAdmin) {
    console.log('Redirecting to dashboard: admin required but user not admin')
    next({ name: 'dashboard' })
    return
  }
  
  // Jika halaman hanya untuk guest tapi user sudah login
  if (guestOnly && isAuthenticated) {
    console.log('Redirecting to dashboard: page is guest-only but user is authenticated')
    next({ name: 'dashboard' })
    return
  }
  
  // Set title halaman
  if (to.meta.title) {
    document.title = `${to.meta.title} - Guru Management`
  }
  
  next()
})

export default router
