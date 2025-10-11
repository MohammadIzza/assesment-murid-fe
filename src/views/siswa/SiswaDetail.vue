<template>
  <div :class="['min-h-screen py-6', isDarkMode ? 'bg-gray-900' : 'bg-gray-50']">
    <!-- Toast Component -->
    <Toast 
      :show="showToast" 
      :type="toastType" 
      :title="toastTitle" 
      :message="toastMessage" 
      @close="showToast = false" 
    />

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div :class="['fixed inset-0 bg-opacity-75 transition-opacity z-40', isDarkMode ? 'bg-gray-900' : 'bg-gray-500']" aria-hidden="true" @click="showDeleteModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div :class="['relative inline-block align-bottom rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-50', isDarkMode ? 'bg-gray-800' : 'bg-white']">
          <div :class="['px-6 pt-6 pb-4 sm:p-6 sm:pb-4', isDarkMode ? 'bg-gray-800' : 'bg-white']">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-red-100 sm:mx-0 sm:h-12 sm:w-12">
                <svg class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 :class="['text-lg leading-6 font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']" id="modal-title">
                  Konfirmasi Hapus Siswa
                </h3>
                <div class="mt-3">
                  <p :class="['text-sm', isDarkMode ? 'text-gray-300' : 'text-gray-600']">
                    Apakah Anda yakin ingin menghapus siswa <span :class="['font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']">"{{ siswaStore.getCurrentSiswa?.nama || 'ini' }}"</span>?
                  </p>
                  <p class="text-sm text-red-600 mt-2 font-medium">
                    Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div :class="['px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse', isDarkMode ? 'bg-gray-700' : 'bg-gray-50']">
            <button
              @click="confirmDeleteSiswa"
              :disabled="isDeleting"
              class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2.5 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isDeleting" class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Ya, Hapus
              </span>
              <span v-else class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Menghapus...
              </span>
            </button>
            <button
              @click="showDeleteModal = false"
              :disabled="isDeleting"
              :class="['mt-3 w-full inline-flex justify-center rounded-lg border shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed', isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600' : 'border-gray-300']"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <button @click="goBack" :class="['inline-flex items-center font-medium mb-4 transition-colors', isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800']">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Siswa
            </button>
            <div class="flex items-center space-x-3">
              <h1 :class="['text-2xl font-bold', isDarkMode ? 'text-white' : 'text-gray-900']">Detail Siswa</h1>
              <div :class="['flex items-center px-2.5 py-1 rounded-full', isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800']">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-sm font-medium">Live Data</span>
              </div>
            </div>
            <p :class="['mt-1', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Informasi lengkap dan riwayat aktivitas siswa</p>
          </div>
          <!-- Quick Actions -->
          <div class="hidden md:flex items-center space-x-3">
            <button @click="loadSiswaDetail" :class="['inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all', isDarkMode ? 'text-gray-300 bg-gray-800 border border-gray-600 hover:bg-gray-700' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50']">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
            <button @click="editSiswa" :class="['inline-flex items-center justify-center px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105', isDarkMode ? 'bg-gray-700 text-green-400 hover:bg-gray-600' : 'bg-white/20 backdrop-blur-sm text-green-700 hover:bg-green-100']">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit Siswa
            </button>
            <button @click="showDeleteModal = true" class="inline-flex items-center justify-center px-4 py-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-red-600/90 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Hapus Siswa
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="siswaStore.isLoading" :class="['rounded-xl shadow-sm border p-12', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
        <div class="text-center">
          <div :class="['w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-6', isDarkMode ? 'border-green-800 border-t-green-400' : 'border-green-200 border-t-green-600']"></div>
          <h3 :class="['text-lg font-semibold mb-2', isDarkMode ? 'text-white' : 'text-gray-900']">Memuat Detail Siswa</h3>
          <p :class="['', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="siswaStore.getError" :class="['rounded-xl shadow-sm border p-12', isDarkMode ? 'bg-gray-800 border-red-700' : 'bg-white border-red-200']">
        <div class="text-center">
          <div :class="['flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6', isDarkMode ? 'bg-red-900' : 'bg-red-100']">
            <svg :class="['w-8 h-8', isDarkMode ? 'text-red-400' : 'text-red-600']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 :class="['text-lg font-semibold mb-3', isDarkMode ? 'text-white' : 'text-gray-900']">Terjadi Kesalahan</h3>
          <p :class="['mb-6', isDarkMode ? 'text-gray-400' : 'text-gray-600']">{{ siswaStore.getError }}</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="loadSiswaDetail" :class="['inline-flex items-center px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all', isDarkMode ? 'bg-red-800 text-white' : 'bg-red-600 text-white']">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Coba Lagi
            </button>
            <button @click="goBack" :class="['inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all', isDarkMode ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white']">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <!-- Siswa Detail Content -->
      <div v-else-if="siswaStore.getCurrentSiswa" class="space-y-8">
        <!-- Profile Card -->
        <div :class="['rounded-xl shadow-sm border overflow-hidden', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
          <div class="bg-gradient-to-r from-green-500 via-green-600 to-green-700 px-8 py-10">
            <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div class="flex-shrink-0">
                <div class="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
                  <span class="text-3xl font-bold text-white">
                    {{ getInitials(siswaStore.getCurrentSiswa.nama) }}
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-2">{{ siswaStore.getCurrentSiswa.nama || 'Nama Tidak Tersedia' }}</h2>
                <div class="flex flex-wrap gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-purple-800">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    {{ getKelasName(siswaStore.getCurrentSiswa.id_kelas) }}
                  </span>
                </div>
              </div>
              <!-- ⭐ Action Buttons dihapus - sudah ada di header -->
            </div>
          </div>
          <!-- Details Section -->
          <div :class="['px-8 py-8', isDarkMode ? 'bg-gray-800' : '']">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Personal Information -->
              <div class="space-y-6">
                <div :class="['rounded-lg p-4', isDarkMode ? 'bg-gray-700' : 'bg-gray-50']">
                  <h3 :class="['text-base font-semibold mb-4', isDarkMode ? 'text-white' : 'text-gray-900']">Informasi Personal</h3>
                  <div class="space-y-4">
                    <!-- ⭐ ID Siswa dihide -->
                    <div :class="['flex justify-between items-center py-2 border-b last:border-b-0', isDarkMode ? 'border-gray-600' : 'border-gray-200']">
                      <span :class="['text-sm font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Nama</span>
                      <span :class="['text-sm font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']">{{ siswaStore.getCurrentSiswa.nama || '-' }}</span>
                    </div>
                    <div :class="['flex justify-between items-center py-2 border-b last:border-b-0', isDarkMode ? 'border-gray-600' : 'border-gray-200']">
                      <span :class="['text-sm font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600']">NISN</span>
                      <span :class="['text-sm font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']">{{ siswaStore.getCurrentSiswa.nisn || '-' }}</span>
                    </div>
                    <div :class="['flex justify-between items-center py-2 border-b last:border-b-0', isDarkMode ? 'border-gray-600' : 'border-gray-200']">
                      <span :class="['text-sm font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Tanggal Lahir</span>
                      <span :class="['text-sm font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']">{{ formatDate(siswaStore.getCurrentSiswa.tanggal_lahir) }}</span>
                    </div>
                    <div :class="['flex justify-between items-center py-2 border-b last:border-b-0', isDarkMode ? 'border-gray-600' : 'border-gray-200']">
                      <span :class="['text-sm font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Jenis Kelamin</span>
                      <span :class="['text-sm font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']">{{ getJenisKelamin(siswaStore.getCurrentSiswa.jenis_kelamin) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Institution Information -->
              <div class="space-y-6">
                <div :class="['rounded-lg p-4', isDarkMode ? 'bg-gray-700' : 'bg-gray-50']">
                  <h3 :class="['text-base font-semibold mb-4', isDarkMode ? 'text-white' : 'text-gray-900']">Informasi Institusi</h3>
                  <div class="space-y-4">
                    <!-- ⭐ ID Sekolah dihide -->
                    <div :class="['flex justify-between items-center py-2 border-b last:border-b-0', isDarkMode ? 'border-gray-600' : 'border-gray-200']">
                      <span :class="['text-sm font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Kelas</span>
                      <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800']">
                        {{ getKelasName(siswaStore.getCurrentSiswa.id_kelas) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSiswaStore } from '@/stores/siswa'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useSekolahScopeStore } from '@/stores/sekolahScope'
import Toast from '@/components/common/Toast.vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const siswaStore = useSiswaStore()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const sekolahScope = useSekolahScopeStore()

const isDarkMode = computed(() => themeStore.isDarkMode)

// ⭐ Kelas list untuk mapping ID ke nama
const kelasList = ref([])
const kelasLoading = ref(false)

const showToast = ref(false)
const toastType = ref('success')
const toastTitle = ref('')
const toastMessage = ref('')
const showDeleteModal = ref(false)
const isDeleting = ref(false)

const loadSiswaDetail = async () => {
  try {
    await siswaStore.fetchSiswaDetail(route.params.id)
    const siswa = siswaStore.getCurrentSiswa
    
    // ⭐ Validasi: pastikan siswa yang dilihat adalah dari sekolah yang sama
    const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
    if (siswa && userSekolahId && siswa.id_sekolah != userSekolahId) {
      toastType.value = 'error'
      toastTitle.value = 'Akses Ditolak'
      toastMessage.value = 'Anda tidak memiliki akses untuk melihat detail siswa dari sekolah lain'
      showToast.value = true
      setTimeout(() => {
        router.push({ name: 'SiswaList' })
      }, 2000)
    }
  } catch (error) {
    console.error('Failed to load siswa detail:', error)
    toastType.value = 'error'
    toastTitle.value = 'Gagal Memuat Data'
    toastMessage.value = 'Terjadi kesalahan saat memuat detail siswa'
    showToast.value = true
  }
}

const goBack = () => {
  router.push({ name: 'SiswaList' })
}

const editSiswa = () => {
  router.push({ name: 'SiswaEdit', params: { id: route.params.id } })
}

const confirmDeleteSiswa = async () => {
  // ⭐ Validasi: pastikan siswa yang dihapus adalah dari sekolah yang sama
  const siswa = siswaStore.getCurrentSiswa
  const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
  if (userSekolahId && siswa?.id_sekolah != userSekolahId) {
    showDeleteModal.value = false
    toastType.value = 'error'
    toastTitle.value = 'Akses Ditolak'
    toastMessage.value = 'Anda tidak memiliki akses untuk menghapus siswa dari sekolah lain'
    showToast.value = true
    return
  }

  isDeleting.value = true
  try {
    await siswaStore.deleteSiswa(route.params.id)
    showDeleteModal.value = false
    toastType.value = 'success'
    toastTitle.value = 'Siswa Berhasil Dihapus!'
    toastMessage.value = 'Data siswa telah dihapus dari sistem. Anda akan diarahkan ke daftar siswa'
    showToast.value = true
    setTimeout(() => goBack(), 1500)
  } catch (error) {
    showDeleteModal.value = false
    toastType.value = 'error'
    toastTitle.value = 'Gagal Menghapus Siswa'
    toastMessage.value = error.response?.data?.message || 'Terjadi kesalahan saat menghapus siswa'
    showToast.value = true
  } finally {
    isDeleting.value = false
  }
}

const getInitials = (name) => {
  if (!name) return ''
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getStatusClass = (status) => {
  switch (status) {
    case 'aktif':
      return 'bg-green-100 text-green-800'
    case 'tidak_aktif':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'aktif':
      return 'Aktif'
    case 'tidak_aktif':
      return 'Tidak Aktif'
    default:
      return 'Unknown'
  }
}

// ⭐ Helper function untuk format tanggal (hanya tahun-bulan-hari)
const formatDate = (dateString) => {
  if (!dateString) return '-'
  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString
    }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (error) {
    return dateString
  }
}

// ⭐ Helper function untuk jenis kelamin lengkap
const getJenisKelamin = (jk) => {
  if (!jk) return '-'
  return jk === 'L' ? 'Laki-laki' : jk === 'P' ? 'Perempuan' : jk
}

// ⭐ Helper function untuk mendapatkan nama kelas dari id_kelas
const getKelasName = (id_kelas) => {
  if (!id_kelas) return '-'
  const kelas = kelasList.value.find(k => k.id_kelas == id_kelas)
  return kelas ? (kelas.nama_kelas || kelas.kelas || `Kelas ${id_kelas}`) : id_kelas
}

// ⭐ Fetch kelas dari API
const fetchKelasList = async () => {
  kelasLoading.value = true
  try {
    const response = await axios.get('/list/kelas')
    kelasList.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching kelas list:', error)
    kelasList.value = []
  } finally {
    kelasLoading.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    fetchKelasList(),
    loadSiswaDetail()
  ])
})
</script> 