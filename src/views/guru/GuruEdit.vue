<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <button @click="goBack" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {{ isAddMode ? 'Kembali ke Daftar Guru' : 'Kembali ke Detail Guru' }}
        </button>
        
        <!-- Enhanced Header Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" v-if="isAddMode"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" v-else></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-gray-900 mb-1">
                {{ isAddMode ? 'Tambah Guru Baru' : 'Edit Data Guru' }}
              </h1>
              <p class="text-gray-600">
                {{ isAddMode ? 'Lengkapi formulir untuk menambahkan guru baru ke sistem' : 'Perbarui informasi guru yang sudah ada' }}
              </p>
            </div>
            <div class="hidden md:flex items-center space-x-2">
              <div class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {{ isAddMode ? 'Mode Tambah' : 'Mode Edit' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="guruStore.isLoading && !form.nama && !isAddMode" class="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Memuat Data Guru</h3>
          <p class="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Form -->
      <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <!-- Form Header -->
        <div class="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Formulir Data Guru</h2>
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
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-gray-900">Informasi Personal</h3>
                  <p class="text-sm text-gray-500">Data pribadi guru</p>
                </div>
              </div>
              
              <!-- Nama -->
              <div class="group">
                <label for="nama" class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Nama Lengkap <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <input
                  v-model="form.nama"
                  type="text"
                  id="nama"
                  required
                  @input="watchFormChanges"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  placeholder="Masukkan nama lengkap guru"
                />
              </div>

              <!-- Email -->
              <div class="group">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                    Email <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                  @input="watchFormChanges"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  placeholder="guru@example.com"
                />
              </div>

              <!-- NIP -->
              <div class="group">
                <label for="nip" class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    NIP <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <input
                  v-model="form.nip"
                  type="text"
                  id="nip"
                  required
                  @input="watchFormChanges"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  placeholder="Masukkan Nomor Induk Pegawai"
                />
              </div>
            </div>

            <!-- Institution Information -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold text-gray-900">Informasi Institusi</h3>
                  <p class="text-sm text-gray-500">Data sekolah dan jabatan</p>
                </div>
              </div>

              <!-- Sekolah -->
              <div class="group">
                <label for="id_sekolah" class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Sekolah <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <select
                  v-model="form.id_sekolah"
                  id="id_sekolah"
                  required
                  @change="watchFormChanges"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400 bg-white"
                >
                  <option value="" disabled>Pilih Sekolah</option>
                  <option value="1">SMA Negeri 1 Semarang</option>
                  <option value="2">SMA Negeri 2 Semarang</option>
                </select>
              </div>

              <!-- Role -->
              <div class="group">
                <label for="id_role" class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                    Role/Jabatan <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <select
                  v-model="form.id_role"
                  id="id_role"
                  required
                  @change="watchFormChanges"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400 bg-white"
                >
                  <option value="" disabled>Pilih Role</option>
                  <option value="2">Guru</option>
                  <option value="3">Kepala Sekolah</option>
                </select>
              </div>

              <!-- Password -->
              <div class="group">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Password {{ isAddMode ? '' : 'Baru' }} 
                    <span v-if="isAddMode" class="text-red-500 ml-1">*</span>
                    <span v-else class="text-gray-400 text-xs ml-1">(Opsional)</span>
                  </span>
                </label>
                <input
                  v-model="form.password_hash"
                  type="password"
                  id="password"
                  :required="isAddMode"
                  @input="watchFormChanges"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  :placeholder="isAddMode ? 'Masukkan password untuk guru baru' : 'Kosongkan jika tidak ingin mengubah password'"
                />
                <div class="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p class="text-sm text-blue-700 flex items-center">
                    <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ isAddMode ? 'Password akan digunakan untuk login guru' : 'Kosongkan jika tidak ingin mengubah password' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="mt-10 pt-8 border-t border-gray-200 bg-gray-50 -mx-8 px-8 py-6">
            <div class="flex flex-col sm:flex-row gap-4 justify-between">
              <!-- Progress/Status Indicator -->
              <div class="flex items-center space-x-2 text-sm">
                <svg v-if="formValid" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-else class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span :class="formValid ? 'text-green-600' : 'text-yellow-600'">
                  {{ formValid ? 'Form siap untuk disimpan' : 'Mohon lengkapi semua field wajib' }}
                </span>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  @click="goBack"
                  class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting || !formValid"
                  class="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  <svg v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ isSubmitting ? 'Menyimpan...' : (isAddMode ? 'Tambah Guru' : 'Simpan Perubahan') }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Success/Error Messages -->
      <Toast
        :show="showToast"
        :type="toastType"
        :title="toastTitle"
        :message="toastMessage"
        :duration="toastDuration"
        :show-progress="toastType === 'success'"
        @close="closeToast"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGuruStore } from '@/stores/guru'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'GuruEdit',
  components: {
    Toast
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const guruStore = useGuruStore()

    // State
    const form = reactive({
      nama: '',
      email: '',
      nip: '',
      id_sekolah: '',
      id_role: '',
      password_hash: ''
    })

    const isSubmitting = ref(false)
    const message = ref('')
    const messageType = ref('')
    const formValid = ref(false)
    
    // Toast notification state
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

    // Computed
    const messageClass = computed(() => {
      return messageType.value === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    })

    const isAddMode = computed(() => !route.params.id)

    // Watch form changes for validation
    const checkFormValidity = () => {
      formValid.value = !!(
        form.nama.trim() && 
        form.email.trim() && 
        form.nip.trim() &&
        form.id_sekolah && 
        form.id_role &&
        (isAddMode.value ? form.password_hash.trim() : true)
      )
    }

    // Methods
    const loadGuruDetail = async () => {
      try {
        await guruStore.fetchGuruDetail(route.params.id)
        if (guruStore.getCurrentGuru) {
          const guru = guruStore.getCurrentGuru
          form.nama = guru.nama || ''
          form.email = guru.email || ''
          form.nip = guru.nip || ''
          form.id_sekolah = guru.id_sekolah || ''
          form.id_role = guru.id_role || ''
          form.password_hash = '' // Always empty for security
        }
      } catch (error) {
        console.error('Failed to load guru detail:', error)
        showMessage('Gagal memuat data guru', 'error')
      }
    }

    const submitForm = async () => {
      if (!form.nama || !form.email || !form.nip || !form.id_sekolah || !form.id_role) {
        showMessage('Mohon lengkapi semua field yang wajib diisi', 'error')
        showNotification('error', 'Validasi Gagal', 'Mohon lengkapi semua field yang wajib diisi')
        return
      }

      // For add mode, password is required
      if (isAddMode.value && !form.password_hash.trim()) {
        showMessage('Password wajib diisi untuk guru baru', 'error')
        showNotification('error', 'Password Diperlukan', 'Password wajib diisi untuk guru baru')
        return
      }

      isSubmitting.value = true
      closeToast()
      
      // Show loading notification
      showNotification('info', 'Menyimpan Data', 'Sedang memproses data guru...', 0)

      try {
        const formData = {
          nama: form.nama,
          email: form.email,
          nip: form.nip,
          id_sekolah: form.id_sekolah,
          id_role: form.id_role
        }

        // Only include password if it's not empty (for edit) or always include for add
        if (isAddMode.value || form.password_hash.trim()) {
          formData.password_hash = form.password_hash
        }

        if (isAddMode.value) {
          // Add new guru
          await guruStore.addGuru(formData)
          showMessage('Guru baru berhasil ditambahkan!', 'success')
          
          closeToast()
          setTimeout(() => {
            showNotification('success', 'Guru Berhasil Ditambahkan!', 'Data guru baru telah disimpan. Anda akan diarahkan ke daftar guru', 1500)
          }, 100)
          
          setTimeout(() => {
            router.push({ name: 'guru-list' })
          }, 1500)
        } else {
          // Update existing guru
          await guruStore.updateGuru(route.params.id, formData)
          showMessage('Data guru berhasil diperbarui!', 'success')
          
          closeToast()
          setTimeout(() => {
            showNotification('success', 'Data Berhasil Diperbarui!', 'Perubahan data guru telah disimpan. Anda akan diarahkan ke detail guru', 1500)
          }, 100)
          
          setTimeout(() => {
            router.push({ name: 'guru-detail', params: { id: route.params.id } })
          }, 1500)
        }

      } catch (error) {
        console.error('Failed to save guru:', error)
        showMessage(isAddMode.value ? 'Gagal menambahkan guru baru' : 'Gagal menyimpan data guru', 'error')
        
        closeToast()
        setTimeout(() => {
          showNotification('error', 'Gagal Menyimpan', isAddMode.value ? 'Terjadi kesalahan saat menambahkan guru baru' : 'Terjadi kesalahan saat menyimpan data guru')
        }, 100)
      } finally {
        isSubmitting.value = false
      }
    }

    const goBack = () => {
      // Check if form has unsaved changes
      const hasChanges = form.nama || form.email || form.nip || form.id_sekolah || form.id_role || form.password_hash
      
      if (hasChanges && !confirm('Apakah Anda yakin ingin keluar? Data yang belum disimpan akan hilang.')) {
        return
      }
      
      if (isAddMode.value) {
        router.push({ name: 'guru-list' })
      } else {
        router.push({ name: 'guru-detail', params: { id: route.params.id } })
      }
    }

    const showMessage = (text, type) => {
      message.value = text
      messageType.value = type
      setTimeout(() => {
        message.value = ''
      }, 3000)
    }

    // Lifecycle
    onMounted(() => {
      if (!isAddMode.value) {
        loadGuruDetail()
      }
      checkFormValidity()
    })

    // Watch form changes
    const watchFormChanges = () => {
      checkFormValidity()
    }

    return {
      form,
      isSubmitting,
      message,
      messageClass,
      isAddMode,
      formValid,
      showToast,
      toastType,
      toastTitle,
      toastMessage,
      toastDuration,
      guruStore,
      submitForm,
      goBack,
      watchFormChanges,
      closeToast
    }
  }
}
</script>
