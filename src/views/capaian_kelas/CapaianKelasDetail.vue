<template>
  <div :class="[
    'min-h-screen py-6 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gray-50'
  ]" style="padding-top: 5rem;">
    <!-- Toast Component -->
    <Toast 
      :show="showToast" 
      :type="toastType" 
      :title="toastTitle" 
      :message="toastMessage" 
      @close="showToast = false" 
    />
    
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <button @click="goBack" :class="[
              'inline-flex items-center text-purple-600 hover:text-purple-800 font-medium mb-4 transition-colors',
              isDarkMode ? 'hover:text-purple-400' : 'hover:text-purple-800'
            ]">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Capaian Kelas
            </button>
            <div class="flex items-center space-x-3">
              <h1 :class="[
                'text-2xl font-bold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">Detail Capaian Kelas</h1>
              <div class="flex items-center px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full">
                <div class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-sm font-medium">Live Data</span>
              </div>
            </div>
            <p :class="[
              'text-gray-600 mt-1',
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            ]">Informasi lengkap dan riwayat aktivitas capaian kelas</p>
          </div>
          
          <!-- Quick Actions -->
          <div class="hidden md:flex items-center space-x-3">
            <button @click="loadCapaianKelasDetail" :class="[
              'inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all',
              isDarkMode ? 'text-gray-300 bg-dark-surface border-dark-border hover:bg-gray-700' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="capaianKelasStore.isLoading" :class="[
        'rounded-xl shadow-sm border p-12',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 :class="[
            'text-lg font-semibold mb-2',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Memuat Detail Capaian Kelas</h3>
          <p :class="[
            'text-gray-600',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">Mohon tunggu sebentar...</p>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="capaianKelasStore.getError" :class="[
        'rounded-xl shadow-sm border p-12',
        isDarkMode ? 'bg-dark-surface border-red-700' : 'bg-white border-red-200'
      ]">
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 :class="[
            'text-lg font-semibold mb-3',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Terjadi Kesalahan</h3>
          <p :class="[
            'text-gray-600 mb-6',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">{{ capaianKelasStore.getError }}</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="loadCapaianKelasDetail" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Coba Lagi
            </button>
            <button @click="goBack" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'border-dark-border text-gray-300 bg-dark-surface hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <!-- Capaian Kelas Detail Content -->
      <div v-else-if="capaianKelasStore.getCurrentCapaianKelas" class="space-y-8">
        <!-- Profile Card -->
        <div :class="[
          'rounded-xl shadow-sm border overflow-hidden',
          isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div class="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-8 py-10">
            <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div class="flex-shrink-0">
                <div class="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
                  <span class="text-3xl font-bold text-white">
                    {{ getInitials(capaianKelasStore.getCurrentCapaianKelas.kode_ck) }}
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-2">{{ capaianKelasStore.getCurrentCapaianKelas.kode_ck || 'Kode Tidak Tersedia' }}</h2>
                <p class="text-purple-100 text-base mb-3">{{ capaianKelasStore.getCurrentCapaianKelas.nama_ck || 'Nama Tidak Tersedia' }}</p>
                <div class="flex flex-wrap gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                    <div class="w-2 h-2 rounded-full mr-2 bg-green-400"></div>
                    Aktif
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                    ID: {{ capaianKelasStore.getCurrentCapaianKelas.id }}
                  </span>
                </div>
              </div>
              <!-- Action Buttons -->
              <div class="flex flex-col space-y-2 md:space-y-0 md:space-x-3 md:flex-row">
                <button @click="editCapaianKelas" class="inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:scale-105">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit Capaian Kelas
                </button>
              </div>
            </div>
          </div>

          <!-- Details Section -->
          <div :class="[
            'px-8 py-8',
            isDarkMode ? 'bg-dark-surface' : 'bg-white'
          ]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Basic Information -->
              <div class="space-y-6">
                <div :class="[
                  'rounded-lg p-4',
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                ]">
                  <h3 :class="[
                    'text-base font-semibold mb-4',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Informasi Dasar</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">ID</span>
                      <span :class="[
                        'text-sm font-semibold',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ capaianKelasStore.getCurrentCapaianKelas.id }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Kode CK</span>
                      <span :class="[
                        'text-sm',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ capaianKelasStore.getCurrentCapaianKelas.kode_ck || 'Tidak Tersedia' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Nama CK</span>
                      <span :class="[
                        'text-sm',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ capaianKelasStore.getCurrentCapaianKelas.nama_ck || 'Tidak Tersedia' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Relation Information -->
              <div class="space-y-6">
                <div :class="[
                  'rounded-lg p-4',
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                ]">
                  <h3 :class="[
                    'text-base font-semibold mb-4',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Informasi Relasi</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Sekolah</span>
                      <span :class="[
                        'text-sm font-semibold',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ getSchoolName(capaianKelasStore.getCurrentCapaianKelas.id_sekolah) }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Sub Elemen</span>
                      <span :class="[
                        'text-sm font-semibold',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ getSubElemenName(capaianKelasStore.getCurrentCapaianKelas.id_sub_elemen || capaianKelasStore.getCurrentCapaianKelas.id_capaian) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else :class="[
        'rounded-xl shadow-sm border p-12',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="text-center">
          <div class="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 :class="[
            'text-lg font-semibold mb-3',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Capaian Kelas Tidak Ditemukan</h3>
          <p :class="[
            'text-gray-600 mb-6',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">Capaian kelas dengan ID <span class="font-medium">{{ $route.params.id }}</span> tidak ditemukan dalam sistem.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="goBack" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'bg-purple-700 hover:bg-purple-800 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Capaian Kelas
            </button>
            <button @click="loadCapaianKelasDetail" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'border-dark-border text-gray-300 bg-dark-surface hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            ]">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCapaianKelasStore } from '@/stores/capaianKelas'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useSekolahScopeStore } from '@/stores/sekolahScope'
import { useSubElemenStore } from '@/stores/subElemen'
import axios from '@/plugins/axios'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'CapaianKelasDetail',
  components: {
    Toast
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const capaianKelasStore = useCapaianKelasStore()
    const themeStore = useThemeStore()
    const isDarkMode = computed(() => themeStore.isDarkMode)
    const authStore = useAuthStore()
    const sekolahScope = useSekolahScopeStore()
    const subElemenStore = useSubElemenStore()

    // ✅ TOAST STATE
    const showToast = ref(false)
    const toastType = ref('info')
    const toastTitle = ref('')
    const toastMessage = ref('')

    // Methods
    const loadCapaianKelasDetail = async () => {
      try {
        await capaianKelasStore.fetchCapaianKelasDetail(route.params.id)
        
        // ⭐ Multi-tenancy: Validasi akses - hanya bisa lihat capaian dari sekolah sendiri
        if (capaianKelasStore.getCurrentCapaianKelas) {
          const capaianKelas = capaianKelasStore.getCurrentCapaianKelas
          const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
          
          if (userSekolahId && capaianKelas.id_sekolah != userSekolahId) {
            // ✅ GANTI ALERT NATIVE DENGAN TOAST CUSTOM
            showToast.value = true
            toastType.value = 'error'
            toastTitle.value = 'Akses Ditolak'
            toastMessage.value = 'Anda tidak memiliki akses untuk melihat capaian kelas dari sekolah lain'
            setTimeout(() => router.push({ name: 'capaian-kelas-list' }), 2000)
            return
          }
        }
      } catch (error) {
        console.error('Failed to load capaian kelas detail:', error)
      }
    }

    const goBack = () => {
      router.push({ name: 'capaian-kelas-list' })
    }

    const editCapaianKelas = () => {
      router.push({ name: 'capaian-kelas-edit', params: { id: route.params.id } })
    }

    const getInitials = (kode) => {
      if (!kode) return '?'
      return kode.charAt(0).toUpperCase()
    }

    // ✅ SEKOLAH LIST STATE
    const sekolahList = ref([])
    const sekolahLoading = ref(false)

    // ✅ FETCH SEKOLAH LIST DARI API
    const fetchSekolahList = async () => {
      sekolahLoading.value = true
      try {
        const response = await axios.get('/list/sekolah')
        if (response.data && response.data.success) {
          sekolahList.value = response.data.data || []
        } else {
          sekolahList.value = []
        }
      } catch (error) {
        sekolahList.value = []
      } finally {
        sekolahLoading.value = false
      }
    }

    const getSchoolName = (schoolId) => {
      if (!schoolId) return 'Tidak Diketahui'
      
      // ✅ AMBIL DARI API: Cari di sekolahList yang sudah di-fetch
      const sekolah = sekolahList.value.find(s => s.id_sekolah == schoolId)
      return sekolah?.nama_sekolah || sekolah?.nama || `Sekolah ${schoolId}`
    }

    const getSubElemenName = (subElemenId) => {
      if (!subElemenId) return 'Tidak Diketahui'
      const subElemenList = subElemenStore.getSubElemenList || []
      const subElemen = subElemenList.find(se => se.id_sub_elemen == subElemenId)
      return subElemen ? subElemen.nama_sub_elemen : `Sub Elemen ${subElemenId}`
    }

    const getSchoolClass = (schoolId) => {
      if (!schoolId) return 'bg-gray-100 text-gray-800'
      const classes = {
        1: 'bg-green-100 text-green-800',
        2: 'bg-blue-100 text-blue-800'
      }
      return classes[schoolId] || 'bg-gray-100 text-gray-800'
    }

    const getCapaianClass = (capaianId) => {
      if (!capaianId) return 'bg-gray-100 text-gray-800'
      return 'bg-purple-100 text-purple-800'
    }

    // Lifecycle
    onMounted(async () => {
      // Load sub elemen list dan sekolah list untuk mapping nama
      await Promise.all([
        fetchSekolahList(),
        subElemenStore.fetchSubElemenList(),
        loadCapaianKelasDetail()
      ])
    })

    onUnmounted(() => {
      capaianKelasStore.clearCurrentCapaianKelas()
    })

    return {
      capaianKelasStore,
      themeStore,
      isDarkMode,
      loadCapaianKelasDetail,
      goBack,
      editCapaianKelas,
      getInitials,
      getSchoolName,
      getSubElemenName,
      getSchoolClass,
      getCapaianClass,
      // ✅ TOAST STATE
      showToast,
      toastType,
      toastTitle,
      toastMessage
    }
  }
}
</script>
