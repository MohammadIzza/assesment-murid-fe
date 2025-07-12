<template>
  <div class="min-h-screen bg-gray-50 py-6">
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
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showDeleteModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-red-100 sm:mx-0 sm:h-12 sm:w-12">
                <svg class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-semibold text-gray-900" id="modal-title">
                  Konfirmasi Hapus Siswa
                </h3>
                <div class="mt-3">
                  <p class="text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus siswa <span class="font-semibold text-gray-900">"{{ siswaStore.getCurrentSiswa?.nama || 'ini' }}"</span>?
                  </p>
                  <p class="text-sm text-red-600 mt-2 font-medium">
                    Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
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
              class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <button @click="goBack" class="inline-flex items-center text-green-600 hover:text-green-800 font-medium mb-4 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Siswa
            </button>
            <div class="flex items-center space-x-3">
              <h1 class="text-2xl font-bold text-gray-900">Detail Siswa</h1>
              <div class="flex items-center px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-sm font-medium">Live Data</span>
              </div>
            </div>
            <p class="text-gray-600 mt-1">Informasi lengkap dan riwayat aktivitas siswa</p>
          </div>
          <!-- Quick Actions -->
          <div class="hidden md:flex items-center space-x-3">
            <button @click="loadSiswaDetail" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
            <button @click="editSiswa" class="inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm text-green-700 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105">
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
      <div v-if="siswaStore.isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Memuat Detail Siswa</h3>
          <p class="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="siswaStore.getError" class="bg-white rounded-xl shadow-sm border border-red-200 p-12">
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Terjadi Kesalahan</h3>
          <p class="text-gray-600 mb-6">{{ siswaStore.getError }}</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="loadSiswaDetail" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Coba Lagi
            </button>
            <button @click="goBack" class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
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
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Kelas: {{ siswaStore.getCurrentSiswa.id_kelas || '-' }}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Sekolah: {{ siswaStore.getCurrentSiswa.id_sekolah || '-' }}
                  </span>
                </div>
              </div>
              <!-- Action Buttons -->
              <div class="flex flex-col space-y-2 md:space-y-0 md:space-x-3 md:flex-row">
                <button @click="editSiswa" class="inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm text-green-700 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105">
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
          <!-- Details Section -->
          <div class="px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Personal Information -->
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-base font-semibold text-gray-900 mb-4">Informasi Personal</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">ID Siswa</span>
                      <span class="text-sm text-gray-900 font-semibold">{{ siswaStore.getCurrentSiswa.id_siswa || '-' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">Nama</span>
                      <span class="text-sm text-gray-900 font-semibold">{{ siswaStore.getCurrentSiswa.nama || '-' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">NISN</span>
                      <span class="text-sm text-gray-900 font-semibold">{{ siswaStore.getCurrentSiswa.nisn || '-' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">Tanggal Lahir</span>
                      <span class="text-sm text-gray-900 font-semibold">{{ siswaStore.getCurrentSiswa.tanggal_lahir || '-' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">Jenis Kelamin</span>
                      <span class="text-sm text-gray-900 font-semibold">{{ siswaStore.getCurrentSiswa.jenis_kelamin || '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Institution Information -->
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-base font-semibold text-gray-900 mb-4">Informasi Institusi</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">ID Sekolah</span>
                      <span class="text-sm text-gray-900 font-semibold">{{ siswaStore.getCurrentSiswa.id_sekolah || '-' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">ID Kelas</span>
                      <span class="text-sm text-gray-900 font-semibold">{{ siswaStore.getCurrentSiswa.id_kelas || '-' }}</span>
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSiswaStore } from '@/stores/siswa'
import Toast from '@/components/common/Toast.vue'

const router = useRouter()
const route = useRoute()
const siswaStore = useSiswaStore()

const showToast = ref(false)
const toastType = ref('success')
const toastTitle = ref('')
const toastMessage = ref('')
const showDeleteModal = ref(false)
const isDeleting = ref(false)

const loadSiswaDetail = async () => {
  await siswaStore.fetchSiswaDetail(route.params.id)
}

const goBack = () => {
  router.push({ name: 'SiswaList' })
}

const editSiswa = () => {
  router.push({ name: 'SiswaEdit', params: { id: route.params.id } })
}

const confirmDeleteSiswa = async () => {
  isDeleting.value = true
  try {
    await siswaStore.deleteSiswa(route.params.id)
    toastType.value = 'success'
    toastTitle.value = 'Berhasil'
    toastMessage.value = 'Siswa berhasil dihapus.'
    showToast.value = true
    showDeleteModal.value = false
    setTimeout(() => goBack(), 1200)
  } catch (error) {
    toastType.value = 'error'
    toastTitle.value = 'Gagal'
    toastMessage.value = 'Gagal menghapus siswa.'
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

onMounted(() => {
  loadSiswaDetail()
})
</script> 