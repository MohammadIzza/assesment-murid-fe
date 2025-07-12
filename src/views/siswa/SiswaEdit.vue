<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 py-8">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <button @click="goBack" class="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6 px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {{ isAddMode ? 'Kembali ke Daftar Siswa' : 'Kembali ke Detail Siswa' }}
        </button>
        
        <!-- Enhanced Header Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
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
              <h1 class="text-2xl font-bold text-gray-900 mb-1">
                {{ isAddMode ? 'Tambah Siswa Baru' : 'Edit Data Siswa' }}
              </h1>
              <p class="text-gray-600">
                {{ isAddMode ? 'Lengkapi formulir untuk menambahkan siswa baru ke sistem' : 'Perbarui informasi siswa yang sudah ada' }}
              </p>
            </div>
            <div class="hidden md:flex items-center space-x-2">
              <div class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {{ isAddMode ? 'Mode Tambah' : 'Mode Edit' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="siswaStore.isLoading && !form.nama && !isAddMode" class="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Memuat Data Siswa</h3>
          <p class="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Form -->
      <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <!-- Form Header -->
        <div class="bg-gradient-to-r from-gray-50 to-green-50 px-8 py-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Formulir Data Siswa</h2>
              <p class="text-sm text-gray-600 mt-1">Lengkapi semua field - semua field wajib diisi</p>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-500">
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
                  <h3 class="text-base font-semibold text-gray-900">Informasi Personal</h3>
                  <p class="text-sm text-gray-500">Data pribadi siswa</p>
                </div>
              </div>
              
              <!-- Nama -->
              <div class="group">
                <label for="nama" class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap <span class="text-red-500 ml-1">*</span></label>
                <input v-model="form.nama" type="text" id="nama" required class="block w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Masukkan nama lengkap siswa" />
              </div>

              <!-- NISN -->
              <div class="group">
                <label for="nisn" class="block text-sm font-medium text-gray-700 mb-2">NISN <span class="text-red-500 ml-1">*</span></label>
                <input v-model="form.nisn" type="text" id="nisn" required class="block w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Masukkan NISN siswa" />
              </div>

              <!-- Tanggal Lahir -->
              <div class="group">
                <label for="tanggal_lahir" class="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir <span class="text-red-500 ml-1">*</span></label>
                <input v-model="form.tanggal_lahir" type="date" id="tanggal_lahir" required class="block w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Pilih tanggal lahir" />
              </div>

              <!-- Jenis Kelamin -->
              <div class="group">
                <label for="jenis_kelamin" class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin <span class="text-red-500 ml-1">*</span></label>
                <select v-model="form.jenis_kelamin" id="jenis_kelamin" required class="block w-full px-4 py-3 border border-gray-300 rounded-xl">
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
                  <h3 class="text-base font-semibold text-gray-900">Informasi Institusi</h3>
                  <p class="text-sm text-gray-500">Data sekolah dan kelas</p>
                </div>
              </div>

              <!-- Sekolah -->
              <div class="group">
                <label for="id_sekolah" class="block text-sm font-medium text-gray-700 mb-2">Sekolah <span class="text-red-500 ml-1">*</span></label>
                <select v-model="form.id_sekolah" id="id_sekolah" required class="block w-full px-4 py-3 border border-gray-300 rounded-xl">
                  <option value="" disabled>Pilih Sekolah</option>
                  <option value="1">SMA Negeri 1 Semarang</option>
                  <option value="2">SMA Negeri 2 Semarang</option>
                </select>
              </div>

              <!-- Kelas -->
              <div class="group">
                <label for="id_kelas" class="block text-sm font-medium text-gray-700 mb-2">Kelas <span class="text-red-500 ml-1">*</span></label>
                <select v-model="form.id_kelas" id="id_kelas" required class="block w-full px-4 py-3 border border-gray-300 rounded-xl">
                  <option value="" disabled>Pilih Kelas</option>
                  <option value="1">Kelas X</option>
                  <option value="2">Kelas XI</option>
                  <option value="3">Kelas XII</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-end space-x-4 pt-8 border-t border-gray-200">
            <button
              type="button"
              @click="goBack"
              class="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
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

const router = useRouter()
const route = useRoute()
const siswaStore = useSiswaStore()

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

// Computed properties
const isAddMode = computed(() => {
  return route.name === 'SiswaAdd'
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
  }
}

const submitForm = async () => {
  if (!isFormValid.value) return
  
  try {
    if (isAddMode.value) {
      console.log('Data dikirim (add):', form.value)
      await siswaStore.addSiswa(form.value)
      alert('Siswa berhasil ditambahkan!')
    } else {
      console.log('Data dikirim (update):', form.value)
      await siswaStore.updateSiswa(route.params.id, form.value)
      alert('Data siswa berhasil diupdate!')
    }
    goBack()
  } catch (error) {
    console.error('Error submitting form:', error)
    if (error.response && error.response.data && error.response.data.message) {
      alert('Gagal menyimpan data: ' + error.response.data.message)
    } else {
      alert('Terjadi kesalahan saat menyimpan data: ' + (error.message || error))
    }
  }
}

const goBack = () => {
  router.push({ name: 'SiswaList' })
}

const watchFormChanges = () => {
  hasChanges.value = true
}

// Watchers
watch(form, () => {
  watchFormChanges()
}, { deep: true })

// Lifecycle
onMounted(() => {
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