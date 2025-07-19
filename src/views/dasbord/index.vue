<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg border border-blue-600 p-8 mb-8 text-white">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="flex items-center space-x-6">
            <div class="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white mb-2">Selamat Datang, {{ userData.nama || dashboardData.userName || '!' }}</h1>
              <p class="text-blue-100 text-base">{{ getRoleName(userData.id_role) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistik Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg border border-blue-200 p-3 flex flex-col items-center">
          <div class="p-3 bg-blue-100 rounded-lg mb-2">
            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
            </svg>
          </div>
          <div class="text-xs font-medium text-gray-500">Total Kelas</div>
          <div class="text-xl font-bold text-gray-900">{{ dashboardData.totalKelas || '0' }}</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg border border-indigo-200 p-3 flex flex-col items-center">
          <div class="p-3 bg-indigo-100 rounded-lg mb-2">
            <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="text-xs font-medium text-gray-500">Assessment</div>
          <div class="text-xl font-bold text-gray-900">{{ dashboardData.totalAssessment || '0' }}</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg border border-red-200 p-3 flex flex-col items-center">
          <div class="p-3 bg-red-100 rounded-lg mb-2">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="text-xs font-medium text-gray-500">Belum Dinilai</div>
          <div class="text-xl font-bold text-gray-900">{{ dashboardData.belumDinilai || '0' }}</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg border border-purple-200 p-3 flex flex-col items-center">
          <div class="p-3 bg-purple-100 rounded-lg mb-2">
            <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div class="text-xs font-medium text-gray-500">Siswa</div>
          <div class="text-xl font-bold text-gray-900">{{ dashboardData.totalSiswa || '0' }}</div>
        </div>
      </div>

      <!-- Daftar Assessment -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Daftar Assessment</h3>
          <button 
            @click="refreshData" 
            class="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <div v-else-if="error" class="flex items-center justify-center py-8 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm">{{ error }}</p>
        </div>
        <div v-else-if="dashboardData.assessments.length === 0" class="flex flex-col items-center py-8 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="text-sm">Belum ada assessment yang tersedia</span>
        </div>
        <!-- Jika ada data assessment, bisa tambahkan tabel/list di sini -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from '@/plugins/axios'
import Cookies from 'js-cookie'
import { parseJWT } from '@/utils/jwt'
import { getGuruById } from '@/services/api'
import { useThemeStore } from '@/stores/theme'

// Add theme store
const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.isDarkMode);

interface DashboardData {
  userName: string
  totalKelas: number
  totalAssessment: number
  belumDinilai: number
  totalSiswa: number
  assessments: any[]
}

const dashboardData = ref<DashboardData>({
  userName: '',
  totalKelas: 0,
  totalAssessment: 0,
  belumDinilai: 0,
  totalSiswa: 0,
  assessments: []
})

const userData = ref({
  id: null,
  nama: '',
  email: '',
  nip: '',
  id_sekolah: null,
  id_role: null
})

const loading = ref(true)
const error = ref<string | null>(null)

// Fungsi untuk mendapatkan ID guru dari JWT token
const getGuruIdFromToken = () => {
  try {
    // Coba berbagai kemungkinan nama cookie untuk token
    const token = Cookies.get('auth_token') || 
                 Cookies.get('token') || 
                 localStorage.getItem('token')
    
    if (!token) {
      console.error('Token tidak ditemukan')
      return null
    }
    
    // Parse token untuk mendapatkan payload
    const decoded = parseJWT(token)
    
    // Cek berbagai kemungkinan field untuk ID user/guru
    const guruId = decoded?.id || decoded?.id_guru || decoded?.user_id
    
    if (!guruId) {
      console.error('ID guru tidak ditemukan dalam token')
      return null
    }
    
    return guruId
  } catch (err) {
    console.error('Error getting guru ID from token:', err)
    return null
  }
}

// Fungsi untuk mengambil data guru dari API
const fetchUserData = async () => {
  try {
    // Dapatkan ID guru dari token
    const guruId = getGuruIdFromToken()
    
    if (!guruId) {
      // Jika tidak ada ID guru, gunakan data dari localStorage sebagai fallback
      const user = localStorage.getItem('user')
      if (user) {
        userData.value = { ...userData.value, ...JSON.parse(user) }
      }
      return
    }
    
    // Panggil API untuk mendapatkan data guru
    const response = await getGuruById(guruId)
    
    if (response.success) {
      userData.value = response.data
      
      // Update userName di dashboardData untuk konsistensi
      dashboardData.value.userName = response.data.nama
    }
  } catch (err) {
    console.error('Error fetching user data:', err)
  }
}

const fetchDashboardData = async () => {
  try {
    loading.value = true
    error.value = null

    // Ambil data kelas
    const kelasRes = await axios.get('/list/kelas')
    dashboardData.value.totalKelas = Array.isArray(kelasRes.data.data) ? kelasRes.data.data.length : 0

    // Ambil data assessment
    const assessmentRes = await axios.get('/list/assessment')
    dashboardData.value.totalAssessment = Array.isArray(assessmentRes.data.data) ? assessmentRes.data.data.length : 0
    dashboardData.value.assessments = assessmentRes.data.data || []

    // Ambil data siswa
    const siswaRes = await axios.get('/list/siswa')
    dashboardData.value.totalSiswa = Array.isArray(siswaRes.data.data) ? siswaRes.data.data.length : 0

    // Ambil data nilai
    const nilaiRes = await axios.get('/list/nilai')
    const nilaiList = nilaiRes.data.data || []
    // Hitung assessment yang belum dinilai
    const dinilaiSet = new Set(nilaiList.map((n: any) => n.id_assessment))
    dashboardData.value.belumDinilai = Math.max(0, dashboardData.value.totalAssessment - dinilaiSet.size)

    // Ambil nama user dari localStorage sebagai fallback jika API belum berhasil
    if (!userData.value.nama) {
      const user = localStorage.getItem('user')
      dashboardData.value.userName = user ? JSON.parse(user).nama || '' : ''
    }
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Tidak dapat mengambil data dashboard dari server'
  } finally {
    loading.value = false
  }
}

// Helper function untuk role name
const getRoleName = (roleId) => {
  const roles = {
    1: 'Super Admin',
    2: 'Guru',
    3: 'Kepala Sekolah'
  }
  return roles[roleId] || 'Guru'
}

// Helper function untuk school name
const getSchoolName = (schoolId) => {
  const schools = {
    1: 'SMA Negeri 1 Semarang',
    2: 'SMA Negeri 2 Semarang'
  }
  return schools[schoolId] || 'Tidak Diketahui'
}

const refreshData = () => {
  fetchUserData()
  fetchDashboardData()
}

onMounted(() => {
  // Pertama ambil data user
  fetchUserData()
  // Kemudian ambil data dashboard
  fetchDashboardData()
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>