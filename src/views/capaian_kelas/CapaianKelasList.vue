<template>
  <div :class="[
    'min-h-screen py-8 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gray-50'
  ]">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div :class="[
        'rounded-xl shadow-lg border p-8 mb-8 text-white',
        isDarkMode ? 'bg-gradient-to-r from-purple-800 to-purple-900 border-purple-700' : 'bg-gradient-to-r from-purple-600 to-purple-700 border-purple-600'
      ]">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <div :class="[
                'flex items-center justify-center w-16 h-16 backdrop-blur-sm rounded-xl shadow-lg',
                isDarkMode ? 'bg-white/10' : 'bg-white/20'
              ]">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white mb-2">Daftar Capaian Kelas</h1>
              <p :class="[
                'text-base',
                isDarkMode ? 'text-purple-200' : 'text-purple-100'
              ]">Kelola dan pantau data capaian kelas dalam sistem assessment</p>
            </div>
          </div>
          <div class="mt-6 lg:mt-0">
            <div :class="[
              'backdrop-blur-sm rounded-xl p-6 text-center border',
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'
            ]">
              <div class="text-2xl font-bold text-white mb-1">{{ filteredCapaianKelasList.length }}</div>
              <div :class="[
                'text-sm font-medium mb-2',
                isDarkMode ? 'text-purple-200' : 'text-purple-100'
              ]">Total Capaian Kelas</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Section -->
      <div :class="[
        'rounded-xl shadow-lg border mb-6 p-6',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>
              <h3 :class="[
                'text-base font-semibold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">Kelola Data Capaian Kelas</h3>
              <p :class="[
                'text-sm',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">Tambah capaian kelas baru atau kelola data yang sudah ada</p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button 
              @click="goToAddCapaianKelas"
              :class="[
                'inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
                isDarkMode ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'
              ]"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Tambah Capaian Kelas Baru
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="capaianKelasStore.isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-600 font-medium">Memuat data capaian kelas...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="capaianKelasStore.getError" class="bg-white rounded-xl shadow-sm border border-red-200 p-12">
        <div class="text-center">
          <div class="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Terjadi Kesalahan</h3>
          <p class="text-gray-600 mb-4">{{ capaianKelasStore.getError }}</p>
          <button @click="loadCapaianKelasData" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div v-else :class="[
        'rounded-xl border overflow-hidden',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead :class="[
              isDarkMode ? 'bg-dark-surface' : 'bg-gray-50'
            ]">
              <tr>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">ID</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Kode CK</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Nama CK</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">ID Sekolah</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">ID Capaian</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Aksi</th>
              </tr>
            </thead>
            <tbody :class="[
              isDarkMode ? 'bg-dark-surface divide-dark-border' : 'bg-white divide-gray-200'
            ]">
              <tr v-for="capaianKelas in paginatedCapaianKelasList" :key="capaianKelas.id" :class="[
                'transition-colors',
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              ]">
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ capaianKelas.id }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ capaianKelas.kode_ck }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ capaianKelas.nama_ck }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ capaianKelas.id_sekolah }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ capaianKelas.id_capaian }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button @click="editCapaianKelas(capaianKelas.id)" :class="[
                      'text-blue-600 hover:text-blue-900 px-2 py-1 rounded transition-colors',
                      isDarkMode ? 'bg-blue-900/30 hover:bg-blue-900/50' : 'bg-blue-50 hover:bg-blue-100'
                    ]">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button @click="copyCapaianKelas(capaianKelas.id)" :class="[
                      'text-green-600 hover:text-green-900 px-2 py-1 rounded transition-colors',
                      isDarkMode ? 'bg-green-900/30 hover:bg-green-900/50' : 'bg-green-50 hover:bg-green-100'
                    ]">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </button>
                    <button @click="deleteCapaianKelas(capaianKelas.id)" :class="[
                      'text-red-600 hover:text-red-900 px-2 py-1 rounded transition-colors',
                      isDarkMode ? 'bg-red-900/30 hover:bg-red-900/50' : 'bg-red-50 hover:bg-red-100'
                    ]">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedCapaianKelasList.length === 0">
                <td colspan="6" :class="[
                  'px-6 py-12 text-center',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">
                  <div>Tidak ada data capaian kelas</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCapaianKelasStore } from '@/stores/capaianKelas'
import { useThemeStore } from '@/stores/theme'

export default {
  name: 'CapaianKelasList',
  setup() {
    const router = useRouter()
    const capaianKelasStore = useCapaianKelasStore()
    const themeStore = useThemeStore()
    const isDarkMode = computed(() => themeStore.isDarkMode)
    
    // Reactive data
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    // Computed properties
    const filteredCapaianKelasList = computed(() => {
      return [...capaianKelasStore.getCapaianKelasList]
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredCapaianKelasList.value.length / itemsPerPage.value)
    })

    const paginatedCapaianKelasList = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredCapaianKelasList.value.slice(start, end)
    })

    // Methods
    const loadCapaianKelasData = async () => {
      try {
        await capaianKelasStore.fetchCapaianKelasList()
      } catch (error) {
        console.error('Failed to load capaian kelas data:', error)
      }
    }

    const goToAddCapaianKelas = () => {
      router.push({ name: 'capaian-kelas-add' })
    }

    const editCapaianKelas = (id) => {
      router.push({ name: 'capaian-kelas-edit', params: { id } })
    }

    const copyCapaianKelas = async (id) => {
      if (confirm('Apakah Anda yakin ingin menyalin data capaian kelas ini?')) {
        try {
          await capaianKelasStore.copyCapaianKelas(id)
          alert('Data capaian kelas berhasil disalin!')
        } catch (error) {
          console.error('Failed to copy capaian kelas:', error)
          alert('Gagal menyalin data capaian kelas')
        }
      }
    }

    const deleteCapaianKelas = async (id) => {
      if (confirm('Apakah Anda yakin ingin menghapus data capaian kelas ini?')) {
        try {
          await capaianKelasStore.deleteCapaianKelas(id)
          alert('Data capaian kelas berhasil dihapus!')
        } catch (error) {
          console.error('Failed to delete capaian kelas:', error)
          alert('Gagal menghapus data capaian kelas')
        }
      }
    }

    // Lifecycle
    onMounted(() => {
      loadCapaianKelasData()
    })

    return {
      capaianKelasStore,
      themeStore,
      isDarkMode,
      currentPage,
      itemsPerPage,
      filteredCapaianKelasList,
      totalPages,
      paginatedCapaianKelasList,
      loadCapaianKelasData,
      goToAddCapaianKelas,
      editCapaianKelas,
      copyCapaianKelas,
      deleteCapaianKelas
    }
  }
}
</script>
