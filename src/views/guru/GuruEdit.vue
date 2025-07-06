<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <button @click="goBack" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Kembali ke Detail Guru
        </button>
        <h1 class="text-3xl font-bold text-gray-900">Edit Guru</h1>
      </div>

      <!-- Loading State -->
      <div v-if="guruStore.isLoading && !form.nama" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Memuat Data Guru</h3>
          <p class="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Form -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Personal Information -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Personal</h3>
              
              <!-- Nama -->
              <div>
                <label for="nama" class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.nama"
                  type="text"
                  id="nama"
                  required
                  class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masukkan nama lengkap guru"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                  class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="guru@example.com"
                />
              </div>

              <!-- NIP -->
              <div>
                <label for="nip" class="block text-sm font-medium text-gray-700 mb-2">
                  NIP
                </label>
                <input
                  v-model="form.nip"
                  type="text"
                  id="nip"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Nomor Induk Pegawai"
                />
              </div>
            </div>

            <!-- Institution Information -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Institusi</h3>

              <!-- Sekolah -->
              <div>
                <label for="id_sekolah" class="block text-sm font-medium text-gray-700 mb-2">
                  Sekolah <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.id_sekolah"
                  id="id_sekolah"
                  required
                  class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Pilih Sekolah</option>
                  <option value="1">SMA Negeri 1 Semarang</option>
                  <option value="2">SMA Negeri 2 Semarang</option>
                </select>
              </div>

              <!-- Role -->
              <div>
                <label for="id_role" class="block text-sm font-medium text-gray-700 mb-2">
                  Role/Jabatan <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.id_role"
                  id="id_role"
                  required
                  class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Pilih Role</option>
                  <option value="2">Guru</option>
                  <option value="3">Kepala Sekolah</option>
                </select>
              </div>

              <!-- Password -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  Password Baru (Opsional)
                </label>
                <input
                  v-model="form.password_hash"
                  type="password"
                  id="password"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                />
                <p class="mt-1 text-sm text-gray-500">Kosongkan jika tidak ingin mengubah password</p>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                @click="goBack"
                class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                <svg v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="message" class="fixed top-4 right-4 z-50 max-w-sm">
        <div :class="messageClass" class="px-6 py-3 rounded-lg shadow-lg">
          <div class="flex items-center">
            <svg v-if="messageType === 'success'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGuruStore } from '@/stores/guru'

export default {
  name: 'GuruEdit',
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

    // Computed
    const messageClass = computed(() => {
      return messageType.value === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    })

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
      if (!form.nama || !form.email || !form.id_sekolah || !form.id_role) {
        showMessage('Mohon lengkapi semua field yang wajib diisi', 'error')
        return
      }

      isSubmitting.value = true

      try {
        const updateData = {
          nama: form.nama,
          email: form.email,
          nip: form.nip || null,
          id_sekolah: form.id_sekolah,
          id_role: form.id_role
        }

        // Only include password if it's not empty
        if (form.password_hash.trim()) {
          updateData.password_hash = form.password_hash
        }

        await guruStore.updateGuru(route.params.id, updateData)
        
        showMessage('Data guru berhasil diperbarui!', 'success')
        
        setTimeout(() => {
          router.push({ name: 'guru-detail', params: { id: route.params.id } })
        }, 1500)

      } catch (error) {
        console.error('Failed to update guru:', error)
        showMessage('Gagal menyimpan data guru', 'error')
      } finally {
        isSubmitting.value = false
      }
    }

    const goBack = () => {
      router.push({ name: 'guru-detail', params: { id: route.params.id } })
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
      loadGuruDetail()
    })

    return {
      form,
      isSubmitting,
      message,
      messageClass,
      guruStore,
      submitForm,
      goBack
    }
  }
}
</script>
