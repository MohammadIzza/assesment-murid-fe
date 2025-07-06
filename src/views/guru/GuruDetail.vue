<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <button @click="goBack" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Guru
            </button>
            <div class="flex items-center space-x-3">
              <h1 class="text-3xl font-bold text-gray-900">Detail Guru</h1>
              <div class="flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-sm font-medium">Live Data</span>
              </div>
            </div>
            <p class="text-gray-600 mt-1">Informasi lengkap dan riwayat aktivitas guru</p>
          </div>
          
          <!-- Quick Actions -->
          <div class="hidden md:flex items-center space-x-3">
            <button @click="loadGuruDetail" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
            <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="guruStore.isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Memuat Detail Guru</h3>
          <p class="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="guruStore.getError" class="bg-white rounded-xl shadow-sm border border-red-200 p-12">
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Terjadi Kesalahan</h3>
          <p class="text-gray-600 mb-6">{{ guruStore.getError }}</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="loadGuruDetail" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Coba Lagi
            </button>
            <button @click="goBack" class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <!-- Guru Detail Content -->
      <div v-else-if="guruStore.getCurrentGuru" class="space-y-8">
        <!-- Profile Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-8 py-10">
            <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div class="flex-shrink-0">
                <div class="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
                  <span class="text-3xl font-bold text-white">
                    {{ getInitials(guruStore.getCurrentGuru.nama) }}
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-white mb-2">{{ guruStore.getCurrentGuru.nama || 'Nama Tidak Tersedia' }}</h2>
                <p class="text-blue-100 text-lg mb-3">{{ guruStore.getCurrentGuru.email || 'Email Tidak Tersedia' }}</p>
                <div class="flex flex-wrap gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="getStatusClass(guruStore.getCurrentGuru)">
                    <div class="w-2 h-2 rounded-full mr-2" :class="guruStore.getCurrentGuru.password_hash ? 'bg-green-400' : 'bg-red-400'"></div>
                    {{ getStatusText(guruStore.getCurrentGuru) }}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="getRoleClass(guruStore.getCurrentGuru.id_role)">
                    {{ getRoleName(guruStore.getCurrentGuru.id_role) }}
                  </span>
                </div>
              </div>
              <!-- Action Buttons - Move to header for better UX -->
              <div class="flex flex-col space-y-2 md:space-y-0 md:space-x-3 md:flex-row">
                <button @click="editGuru" class="inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </button>
                <button @click="deleteGuru" class="inline-flex items-center justify-center px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600/80 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Hapus
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
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Personal</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">ID Guru</span>
                      <span class="text-sm text-gray-900 font-semibold">{{ guruStore.getCurrentGuru.id_guru }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">NIP</span>
                      <span class="text-sm text-gray-900">{{ guruStore.getCurrentGuru.nip || 'Tidak Tersedia' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">Email</span>
                      <a :href="`mailto:${guruStore.getCurrentGuru.email}`" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        {{ guruStore.getCurrentGuru.email || 'Tidak Tersedia' }}
                      </a>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span class="text-sm font-medium text-gray-600">Tanggal Bergabung</span>
                      <span class="text-sm text-gray-900">{{ formatDate(guruStore.getCurrentGuru.created_at) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Institution Information -->
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Institusi</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">Sekolah</span>
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="getSchoolClass(guruStore.getCurrentGuru.id_sekolah)">
                        {{ getSchoolName(guruStore.getCurrentGuru.id_sekolah) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">Role</span>
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="getRoleClass(guruStore.getCurrentGuru.id_role)">
                        {{ getRoleName(guruStore.getCurrentGuru.id_role) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span class="text-sm font-medium text-gray-600">Status Akun</span>
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="getStatusClass(guruStore.getCurrentGuru)">
                        <div class="w-2 h-2 rounded-full mr-1.5" :class="guruStore.getCurrentGuru.password_hash ? 'bg-green-500' : 'bg-red-500'"></div>
                        {{ getStatusText(guruStore.getCurrentGuru) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span class="text-sm font-medium text-gray-600">Terakhir Update</span>
                      <span class="text-sm text-gray-900">{{ formatDate(guruStore.getCurrentGuru.updated_at) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats Card -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Assessment(masi dummy data)</p>
                <p class="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
              </div>
              <!-- masih dummiy bray -->
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Siswa Dinilai(masi dummy data)</p>
                <p class="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <!-- masih dummiy bray -->
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Assessment Selesai(masi dummy data bray)</p>
                <p class="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="text-center">
          <div class="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Guru Tidak Ditemukan</h3>
          <p class="text-gray-600 mb-6">Guru dengan ID <span class="font-medium">{{ $route.params.id }}</span> tidak ditemukan dalam sistem.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="goBack" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Guru
            </button>
            <button @click="loadGuruDetail" class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGuruStore } from '@/stores/guru'

export default {
  name: 'GuruDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const guruStore = useGuruStore()

    // Methods
    const loadGuruDetail = async () => {
      try {
        await guruStore.fetchGuruDetail(route.params.id)
      } catch (error) {
        console.error('Failed to load guru detail:', error)
      }
    }

    const goBack = () => {
      router.push({ name: 'guru-list' })
    }

    const editGuru = () => {
      router.push({ name: 'guru-edit', params: { id: route.params.id } })
    }

    const deleteGuru = () => {
      if (confirm('Apakah Anda yakin ingin menghapus guru ini?')) {
        // Implementasi delete guru
        console.log('Delete guru:', route.params.id)
      }
    }

    const getInitials = (name) => {
      if (!name) return '?'
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Tidak Tersedia'
      try {
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (error) {
        return 'Format Tanggal Tidak Valid'
      }
    }

    const getSchoolName = (schoolId) => {
      if (!schoolId) return 'Tidak Diketahui'
      const schools = {
        1: 'SMA Negeri 1 Semarang',
        2: 'SMA Negeri 2 Semarang'
      }
      return schools[schoolId] || 'Sekolah Lain'
    }

    const getSchoolClass = (schoolId) => {
      if (!schoolId) return 'bg-gray-100 text-gray-800'
      const classes = {
        1: 'bg-green-100 text-green-800',
        2: 'bg-blue-100 text-blue-800'
      }
      return classes[schoolId] || 'bg-gray-100 text-gray-800'
    }

    const getRoleName = (roleId) => {
      if (!roleId) return 'Tidak Diketahui'
      const roles = {
        2: 'Guru',
        3: 'Kepala Sekolah'
      }
      return roles[roleId] || 'Role Lain'
    }

    const getRoleClass = (roleId) => {
      if (!roleId) return 'bg-gray-100 text-gray-800'
      const classes = {
        2: 'bg-blue-100 text-blue-800',
        3: 'bg-purple-100 text-purple-800'
      }
      return classes[roleId] || 'bg-gray-100 text-gray-800'
    }

    const getStatusText = (guru) => {
      if (!guru.password_hash) return 'Belum Aktif'
      return 'Aktif'
    }

    const getStatusClass = (guru) => {
      if (!guru.password_hash) return 'bg-red-100 text-red-800'
      return 'bg-green-100 text-green-800'
    }

    // Lifecycle
    onMounted(() => {
      loadGuruDetail()
    })

    onUnmounted(() => {
      guruStore.clearCurrentGuru()
    })

    return {
      guruStore,
      loadGuruDetail,
      goBack,
      editGuru,
      deleteGuru,
      getInitials,
      formatDate,
      getSchoolName,
      getSchoolClass,
      getRoleName,
      getRoleClass,
      getStatusText,
      getStatusClass
    }
  }
}
</script> 