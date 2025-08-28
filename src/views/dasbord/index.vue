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
        <div v-else>
          <!-- Horizontal scrollable card container, bertingkat -->
          <div class="flex flex-row gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
            <div v-for="(ass, idx) in dashboardData.assessments" :key="ass.id_assessment"
              :class="['min-w-[340px] max-w-xs flex-shrink-0 rounded-2xl shadow-lg border border-gray-200 bg-white p-6 flex flex-col transition-all duration-200 hover:scale-105 hover:shadow-2xl', idx % 2 === 1 ? 'mt-6' : 'mt-0']">
              <!-- Label/tag dimensi -->
              <div :class="['inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3', getDimensiLabelClass(ass)]">
                {{ getRelasiAssessment(ass).dimensi }}
              </div>
              <div class="font-bold text-lg mb-2 text-gray-800">{{ ass.nama_assessment }}</div>
              <div class="flex flex-col gap-1 mb-2">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kelas</div>
                <div class="text-base font-bold text-blue-700">{{ getKelasAssessment(ass) }}</div>
              </div>
              <div class="flex flex-col gap-1 mb-2">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Elemen</div>
                <div class="text-sm">{{ getRelasiAssessment(ass).elemen }}</div>
              </div>
              <div class="flex flex-col gap-1 mb-2">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sub Elemen</div>
                <div class="text-sm">{{ getRelasiAssessment(ass).subElemen }}</div>
              </div>
              <div class="flex flex-col gap-1 mb-2">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Capaian</div>
                <div class="text-sm">{{ getRelasiAssessment(ass).capaian }}</div>
              </div>
              <div class="flex flex-row items-center justify-between mt-2 mb-1">
                <div class="text-xs font-semibold text-gray-500">Jumlah Siswa</div>
                <div class="text-base font-bold text-green-700">{{ getJumlahSiswaAssessment(ass) }}</div>
              </div>
              <router-link
                :to="{ name: 'assesment-detail', query: { id_assessment: ass.id_assessment } }"
                class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 text-center shadow"
              >
                Lihat Detail
              </router-link>
              <router-link
                :to="{ name: 'assessment-edit', params: { id: ass.id_assessment }}"
                class="mt-4 inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors duration-200 text-center shadow"
              >
                Edit Nilai
              </router-link>
              <!-- Add Delete Button -->
              <button
                @click.stop="confirmDelete(ass)"
                class="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 shadow"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <Teleport to="body">
    <div v-if="showDeleteModal" class="fixed inset-0 z-[100]">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="cancelDelete"></div>
      
      <!-- Modal -->
      <div class="relative z-[101] min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-lg w-full p-6">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Hapus Assessment</h3>
              <p class="text-sm text-gray-500">
                Apakah Anda yakin ingin menghapus assessment "{{ selectedAssessment?.nama_assessment }}"? Semua nilai terkait akan ikut terhapus.
              </p>
              <div v-if="deleteError" class="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                {{ deleteError }}
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="cancelDelete"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium"
            >
              Batal
            </button>
            <button
              @click="deleteAssessment"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from '@/plugins/axios'
import { Teleport } from 'vue'
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

// Delete functionality refs and methods
const showDeleteModal = ref(false)
const selectedAssessment = ref(null)
const deleteError = ref(null)

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

// Data referensi
const kelasList = ref([])
const dimensiList = ref([])
const elemenList = ref([])
const subElemenList = ref([])
const capaianList = ref([])
const siswaList = ref([])
const nilaiList = ref([])
const pengampuList = ref([])

// Helper untuk nama
const getNamaKelas = id => kelasList.value.find(k => k.id_kelas == id)?.nama_kelas || '-';
const getNamaDimensi = id => dimensiList.value.find(d => d.id_dimensi == id)?.nama_dimensi || '-';
const getNamaElemen = id => elemenList.value.find(e => e.id_elemen == id)?.nama_elemen || '-';
const getNamaSubElemen = id => subElemenList.value.find(se => se.id_sub_elemen == id)?.nama_sub_elemen || '-';
const getNamaCapaian = id => capaianList.value.find(c => c.id_capaian == id)?.deskripsi || '-';
const getJumlahSiswa = id_kelas => siswaList.value.filter(s => s.id_kelas == id_kelas).length;

// Helper relasi assessment (dimensi, elemen, sub elemen, capaian)
const getRelasiAssessment = (ass) => {
  // 1. Dapatkan capaian
  const capaian = capaianList.value.find(c => c.id_capaian == ass.id_capaian);
  // 2. Dapatkan sub elemen
  const subElemen = capaian ? subElemenList.value.find(se => se.id_sub_elemen == capaian.id_sub_elemen) : null;
  // 3. Dapatkan elemen
  const elemen = subElemen ? elemenList.value.find(e => e.id_elemen == subElemen.id_elemen) : null;
  // 4. Dapatkan dimensi
  const dimensi = elemen ? dimensiList.value.find(d => d.id_dimensi == elemen.id_dimensi) : null;
  return {
    dimensi: dimensi ? dimensi.nama_dimensi : '-',
    elemen: elemen ? elemen.nama_elemen : '-',
    subElemen: subElemen ? subElemen.nama_sub_elemen : '-',
    capaian: capaian ? capaian.deskripsi : '-'
  }
}

// Helper untuk jumlah siswa per assessment berdasarkan nilai dan pengampu
const getJumlahSiswaAssessment = (ass) => {
  // Dapatkan semua nilai untuk assessment ini
  const nilaiAssessment = nilaiList.value.filter(n => n.id_assessment == ass.id_assessment)
  // Dapatkan semua id_pengampu yang terkait dengan assessment ini
  const pengampuIds = Array.from(new Set(nilaiAssessment.map(n => n.id_pengampu)))
  // Dapatkan semua id_kelas dari pengampu terkait
  const kelasIds = pengampuIds.map(pid => pengampuList.value.find(p => p.id_pengampu == pid)?.id_kelas)
  // Hitung jumlah siswa unik yang dinilai pada assessment ini
  const siswaIds = Array.from(new Set(nilaiAssessment.map(n => n.id_siswa)))
  return siswaIds.length
}

// Helper untuk kelas assessment berdasarkan nilai dan siswa
const getKelasAssessment = (ass) => {
  // Ambil semua nilai untuk assessment ini
  const nilaiAssessment = nilaiList.value.filter(n => n.id_assessment == ass.id_assessment)
  // Ambil semua id_siswa
  const siswaIds = Array.from(new Set(nilaiAssessment.map(n => n.id_siswa)))
  // Ambil semua id_kelas dari siswa
  const kelasIds = Array.from(new Set(
    siswaIds
      .map(sid => siswaList.value.find(s => s.id_siswa == sid)?.id_kelas)
      .filter(Boolean)
  ))
  // Ambil nama kelas (jika hanya satu kelas, tampilkan nama, jika lebih dari satu, gabungkan)
  const kelasNames = kelasIds.map(kid => kelasList.value.find(k => k.id_kelas == kid)?.nama_kelas).filter(Boolean)
  return kelasNames.length > 0 ? kelasNames.join(', ') : '-'
}

// Mapping warna label/tag per dimensi/domain
const dimensiLabelColorMap = {
  'Beriman, Bertaqwa kepada Tuhan YME dan Berakhlak Mulia': 'bg-blue-600 text-white',
  'Inklusif, Berbudaya dan Nasionalis': 'bg-yellow-500 text-white',
  'Berukhuwah dan Peduli': 'bg-green-600 text-white',
  'Kreatif dan Terampil': 'bg-purple-600 text-white',
  'Berkepribadian yang Matang': 'bg-pink-600 text-white',
  // Tambahkan domain lain jika ada
}
function getDimensiLabelClass(ass) {
  const dimensi = getRelasiAssessment(ass).dimensi
  return dimensiLabelColorMap[dimensi] || 'bg-gray-400 text-white'
}

const fetchReferenceData = async () => {
  const [kelasRes, dimensiRes, elemenRes, subElemenRes, capaianRes, siswaRes, nilaiRes, pengampuRes] = await Promise.all([
    axios.get('/list/kelas'),
    axios.get('/list/dimensi'),
    axios.get('/list/elemen'),
    axios.get('/list/sub_elemen'),
    axios.get('/list/capaian'),
    axios.get('/list/siswa'),
    axios.get('/list/nilai'),
    axios.get('/list/pengampu')
  ])
  kelasList.value = kelasRes.data.data || []
  dimensiList.value = dimensiRes.data.data || []
  elemenList.value = elemenRes.data.data || []
  subElemenList.value = subElemenRes.data.data || []
  capaianList.value = capaianRes.data.data || []
  siswaList.value = siswaRes.data.data || []
  nilaiList.value = nilaiRes.data.data || []
  pengampuList.value = pengampuRes.data.data || []
}

const refreshData = () => {
  fetchUserData()
  fetchDashboardData()
  fetchReferenceData()
}

onMounted(() => {
  fetchUserData()
  fetchDashboardData()
  fetchReferenceData()
})

const confirmDelete = (assessment) => {
  selectedAssessment.value = assessment
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  selectedAssessment.value = null
  deleteError.value = null
}

const deleteAssessment = async () => {
  try {
    if (!selectedAssessment.value?.id_assessment) return;

    // First delete all related nilai
    await axios.delete(`/delete/assessment/${selectedAssessment.value.id_assessment}/nilai`)
    
    // Then delete the assessment
    await axios.delete(`/delete/assessment/${selectedAssessment.value.id_assessment}`)
    
    // Close modal and reset state
    showDeleteModal.value = false
    selectedAssessment.value = null
    deleteError.value = null
    
    // Refresh dashboard data
    await refreshData()
  } catch (err) {
    deleteError.value = err?.response?.data?.message || 'Gagal menghapus assessment'
    console.error('Error deleting assessment:', err)
  }
}
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