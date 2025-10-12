<template>
  <div :class="['min-h-screen py-8', isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-green-50 via-white to-indigo-50']" style="padding-top: 5rem;">
    <!-- Toast Notification -->
    <Toast
      :show="showToast"
      :type="toastType"
      :title="toastTitle"
      :message="toastMessage"
      :duration="toastDuration"
      :show-progress="toastType === 'success'"
      @close="closeToast"
    />
    
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <button @click="goBack" :class="['inline-flex items-center font-medium mb-6 px-4 py-2 rounded-lg transition-all duration-200', isDarkMode ? 'text-green-400 hover:text-green-300 hover:bg-gray-800' : 'text-green-600 hover:text-green-700 hover:bg-green-50']">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {{ isAddMode ? 'Kembali ke Daftar Siswa' : 'Kembali ke Detail Siswa' }}
        </button>
        
        <!-- Enhanced Header Card -->
        <div :class="['rounded-2xl shadow-lg border p-6 mb-8', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" v-if="isAddMode"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" v-else></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h1 :class="['text-2xl font-bold mb-1', isDarkMode ? 'text-white' : 'text-gray-900']">
                {{ isAddMode ? 'Tambah Siswa Baru' : 'Edit Data Siswa' }}
              </h1>
              <p :class="['', isDarkMode ? 'text-gray-400' : 'text-gray-600']">
                {{ isAddMode ? 'Lengkapi formulir untuk menambahkan siswa baru ke sistem' : 'Perbarui informasi siswa yang sudah ada' }}
              </p>
            </div>
            <div class="hidden md:flex items-center space-x-2">
              <div :class="['px-3 py-1 rounded-full text-sm font-medium', isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700']">
                {{ isAddMode ? 'Mode Tambah' : 'Mode Edit' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="siswaStore.isLoading && !form.nama && !isAddMode" :class="['rounded-2xl shadow-lg border p-12', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
        <div class="text-center">
          <div :class="['w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-6', isDarkMode ? 'border-green-800 border-t-green-400' : 'border-green-200 border-t-green-600']"></div>
          <h3 :class="['text-lg font-semibold mb-2', isDarkMode ? 'text-white' : 'text-gray-900']">Memuat Data Siswa</h3>
          <p :class="['', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Form -->
      <div v-else :class="['rounded-2xl shadow-lg border overflow-hidden', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200']">
        <!-- Form Header -->
        <div :class="['px-8 py-6 border-b', isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' : 'bg-gradient-to-r from-gray-50 to-green-50 border-gray-200']">
          <div class="flex items-center justify-between">
            <div>
              <h2 :class="['text-lg font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']">Formulir Data Siswa</h2>
              <p :class="['text-sm mt-1', isDarkMode ? 'text-gray-400' : 'text-gray-600']">Lengkapi semua field - semua field wajib diisi</p>
            </div>
            <div :class="['flex items-center space-x-2 text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-500']">
              <span class="text-red-500">*</span>
              <span>Field wajib diisi</span>
            </div>
          </div>
        </div>
        
        <form @submit.prevent="submitForm" class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Personal Information -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 :class="['text-base font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']">Informasi Personal</h3>
                  <p :class="['text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-500']">Data pribadi siswa</p>
                </div>
              </div>
              
              <!-- Nama -->
              <div class="group">
                <label for="nama" :class="['block text-sm font-medium mb-2', isDarkMode ? 'text-gray-300' : 'text-gray-700']">Nama Lengkap <span class="text-red-500 ml-1">*</span></label>
                <input v-model="form.nama" type="text" id="nama" required :class="['block w-full px-4 py-3 border rounded-xl', isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-green-400' : 'border-gray-300 placeholder-gray-500 focus:border-green-500']" placeholder="Masukkan nama lengkap siswa" />
              </div>

              <!-- NISN -->
              <div class="group">
                <label for="nisn" :class="['block text-sm font-medium mb-2', isDarkMode ? 'text-gray-300' : 'text-gray-700']">NISN <span class="text-red-500 ml-1">*</span></label>
                <input v-model="form.nisn" type="text" id="nisn" required :class="['block w-full px-4 py-3 border rounded-xl', isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-green-400' : 'border-gray-300 placeholder-gray-500 focus:border-green-500']" placeholder="Masukkan NISN siswa" />
              </div>

              <!-- Tanggal Lahir -->
              <div class="group">
                <label for="tanggal_lahir" :class="['block text-sm font-medium mb-2', isDarkMode ? 'text-gray-300' : 'text-gray-700']">Tanggal Lahir <span class="text-red-500 ml-1">*</span></label>
                <input v-model="form.tanggal_lahir" type="date" id="tanggal_lahir" required :class="['block w-full px-4 py-3 border rounded-xl', isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:border-green-400' : 'border-gray-300 focus:border-green-500']" placeholder="Pilih tanggal lahir" />
              </div>

              <!-- Jenis Kelamin -->
              <div class="group">
                <label for="jenis_kelamin" :class="['block text-sm font-medium mb-2', isDarkMode ? 'text-gray-300' : 'text-gray-700']">Jenis Kelamin <span class="text-red-500 ml-1">*</span></label>
                <select v-model="form.jenis_kelamin" id="jenis_kelamin" required :class="['block w-full px-4 py-3 border rounded-xl', isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:border-green-400' : 'border-gray-300 focus:border-green-500']">
                  <option value="" disabled>Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>

            <!-- Institution Information -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 :class="['text-base font-semibold', isDarkMode ? 'text-white' : 'text-gray-900']">Informasi Institusi</h3>
                  <p :class="['text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-500']">Data sekolah dan kelas</p>
                </div>
              </div>

              <!-- ⭐ Sekolah (Read-only / Display Only) -->
              <div class="group">
                <label for="id_sekolah" :class="['block text-sm font-medium mb-2', isDarkMode ? 'text-gray-300' : 'text-gray-700']">
                  Sekolah <span class="text-red-500 ml-1">*</span>
                </label>
                <div 
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl transition-all duration-200',
                    isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'
                  ]"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-medium">{{ getSchoolName(form.id_sekolah) }}</span>
                    <span 
                      :class="[
                        'text-xs px-2 py-1 rounded-full',
                        isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                      ]"
                    >
                      Otomatis
                    </span>
                  </div>
                </div>
                <p :class="['mt-2 text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-500']">
                  <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                  </svg>
                  Sekolah otomatis disesuaikan dengan akun admin yang login
                </p>
              </div>

              <!-- Kelas -->
              <div class="group">
                <label for="id_kelas" :class="['block text-sm font-medium mb-2', isDarkMode ? 'text-gray-300' : 'text-gray-700']">
                  Kelas <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="form.id_kelas" 
                    id="id_kelas" 
                    required 
                    :disabled="kelasLoading"
                    :class="[
                      'block w-full px-4 py-3 border rounded-xl transition-all duration-200',
                      isDarkMode ? 'border-gray-600 bg-gray-700 text-white focus:border-green-400' : 'border-gray-300 focus:border-green-500',
                      kelasLoading ? 'opacity-50 cursor-not-allowed' : ''
                    ]"
                  >
                    <option value="" disabled>
                      {{ kelasLoading ? 'Memuat kelas...' : 'Pilih Kelas' }}
                    </option>
                    <option 
                      v-for="kelas in filteredKelasList" 
                      :key="kelas.id_kelas" 
                      :value="kelas.id_kelas"
                    >
                      {{ kelas.nama_kelas || kelas.kelas || `Kelas ${kelas.id_kelas}` }}
                    </option>
                  </select>
                  <div v-if="kelasLoading" class="absolute inset-y-0 right-0 pr-10 flex items-center pointer-events-none">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                  </div>
                </div>
                <p v-if="filteredKelasList.length === 0 && !kelasLoading" :class="['mt-2 text-xs text-yellow-600', isDarkMode ? 'text-yellow-400' : '']">
                  <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  Tidak ada kelas tersedia untuk sekolah ini
                </p>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div :class="['flex items-center justify-end space-x-4 pt-8 border-t', isDarkMode ? 'border-gray-600' : 'border-gray-200']">
            <button
              type="button"
              @click="goBack"
              :class="['inline-flex items-center px-6 py-3 border font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200', isDarkMode ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50']"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Batal
            </button>
            
            <button
              type="submit"
              :disabled="siswaStore.isLoading || !isFormValid"
              class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
            >
              <svg v-if="siswaStore.isLoading" class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {{ siswaStore.isLoading ? 'Menyimpan...' : (isAddMode ? 'Tambah Siswa' : 'Update Siswa') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
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

// ⭐ Toast notification state
const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('')
const toastMessage = ref('')
const toastDuration = ref(4000)

const showNotification = (type, title, message, duration = 1500) => {
  toastType.value = type
  toastTitle.value = title
  toastMessage.value = message
  toastDuration.value = duration
  showToast.value = true
}

const closeToast = () => {
  showToast.value = false
}

// Reactive data
const form = ref({
  nama: '',
  nisn: '',
  tanggal_lahir: '',
  jenis_kelamin: '',
  id_sekolah: '',
  id_kelas: ''
})

const hasChanges = ref(false)
const kelasList = ref([])
const kelasLoading = ref(false)

// Computed properties
const isAddMode = computed(() => {
  return route.name === 'SiswaAdd'
})

// ⭐ Filter kelas berdasarkan sekolah user yang login
const filteredKelasList = computed(() => {
  const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
  if (!userSekolahId) return kelasList.value
  
  return kelasList.value.filter(kelas => kelas.id_sekolah == userSekolahId)
})

const isFormValid = computed(() => {
  return form.value.nama && 
         form.value.nisn && 
         form.value.tanggal_lahir && 
         form.value.jenis_kelamin && 
         form.value.id_sekolah && 
         form.value.id_kelas
})

// Methods
const fetchSiswaData = async () => {
  if (isAddMode.value) return
  
  try {
    await siswaStore.fetchSiswaDetail(route.params.id)
    const currentSiswa = siswaStore.getCurrentSiswa
    
    if (currentSiswa) {
      // ⭐ Validasi: pastikan siswa yang diedit adalah dari sekolah yang sama
      const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
      if (userSekolahId && currentSiswa.id_sekolah != userSekolahId) {
        showNotification('error', 'Akses Ditolak', 'Anda tidak memiliki akses untuk mengedit siswa dari sekolah lain', 2000)
        setTimeout(() => {
          router.push({ name: 'SiswaList' })
        }, 2000)
        return
      }

      form.value = {
        nama: currentSiswa.nama || '',
        nisn: currentSiswa.nisn || '',
        tanggal_lahir: currentSiswa.tanggal_lahir || '',
        jenis_kelamin: currentSiswa.jenis_kelamin || '',
        id_sekolah: currentSiswa.id_sekolah || '',
        id_kelas: currentSiswa.id_kelas || ''
      }
    }
  } catch (error) {
    console.error('Error fetching siswa data:', error)
    showNotification('error', 'Gagal Memuat Data', 'Terjadi kesalahan saat memuat data siswa')
  }
}

const submitForm = async () => {
  if (!isFormValid.value) return
  
  // ⭐ Validasi: pastikan id_sekolah sesuai dengan admin yang login
  const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
  if (userSekolahId && form.value.id_sekolah != userSekolahId) {
    showNotification('error', 'Validasi Gagal', 'Anda tidak memiliki akses untuk mengubah sekolah siswa')
    return
  }

  closeToast()
  
  // Show loading notification
  showNotification('info', 'Menyimpan Data', 'Sedang memproses data siswa...', 0)

  try {
    if (isAddMode.value) {
      console.log('Data dikirim (add):', form.value)
      await siswaStore.addSiswa(form.value)
      
      closeToast()
      setTimeout(() => {
        showNotification('success', 'Siswa Berhasil Ditambahkan!', 'Data siswa baru telah disimpan. Anda akan diarahkan ke daftar siswa', 1500)
      }, 100)
      
      setTimeout(() => {
        router.push({ name: 'SiswaList' })
      }, 1500)
    } else {
      console.log('Data dikirim (update):', form.value)
      await siswaStore.updateSiswa(route.params.id, form.value)
      
      closeToast()
      setTimeout(() => {
        showNotification('success', 'Data Berhasil Diperbarui!', 'Perubahan data siswa telah disimpan. Anda akan diarahkan ke detail siswa', 1500)
      }, 100)
      
      setTimeout(() => {
        router.push({ name: 'SiswaDetail', params: { id: route.params.id } })
      }, 1500)
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    closeToast()
    setTimeout(() => {
      const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan saat menyimpan data'
      showNotification('error', 'Gagal Menyimpan Data', errorMessage, 3000)
    }, 100)
  }
}

const goBack = () => {
  router.push({ name: 'SiswaList' })
}

const watchFormChanges = () => {
  hasChanges.value = true
}

// ⭐ Helper function untuk menampilkan nama sekolah
const getSchoolName = (id_sekolah) => {
  const schools = {
    1: 'SMA Negeri 1 Semarang',
    2: 'SMA Negeri 2 Semarang'
  }
  return schools[id_sekolah] || 'Sekolah tidak diketahui'
}

// ⭐ Fetch kelas dari API
const fetchKelasList = async () => {
  kelasLoading.value = true
  try {
    const response = await axios.get('/list/kelas')
    kelasList.value = response.data.data || []
    console.log('Kelas list fetched:', kelasList.value.length)
  } catch (error) {
    console.error('Error fetching kelas list:', error)
    // Fallback ke hardcoded jika API gagal
    kelasList.value = [
      { id_kelas: 1, nama_kelas: 'Kelas X', id_sekolah: 1 },
      { id_kelas: 2, nama_kelas: 'Kelas XI', id_sekolah: 1 },
      { id_kelas: 3, nama_kelas: 'Kelas XII', id_sekolah: 1 }
    ]
  } finally {
    kelasLoading.value = false
  }
}

// Watchers
watch(form, () => {
  watchFormChanges()
}, { deep: true })

// Lifecycle
onMounted(async () => {
  // ⭐ Auto set id_sekolah untuk siswa baru berdasarkan admin yang login
  if (isAddMode.value) {
    const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
    if (userSekolahId) {
      form.value.id_sekolah = userSekolahId
      console.log('Auto set id_sekolah untuk siswa baru:', userSekolahId)
    }
  }
  
  // ⭐ Fetch kelas list dari API
  await fetchKelasList()
  
  fetchSiswaData()
})
</script>

<style scoped>
.siswa-edit {
  max-width: 400px;
  margin: 0 auto;
}
form > div {
  margin-bottom: 12px;
}
label {
  display: block;
  margin-bottom: 4px;
}
input {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}
.btn {
  margin-right: 8px;
}
</style> 