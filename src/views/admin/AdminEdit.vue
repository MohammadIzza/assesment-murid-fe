<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style="padding-top: 5rem;">
    <!-- Header with Back Button -->
    <div class="mb-6">
      <div class="flex items-center">
        <button
          @click="goBack"
          class="mr-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ isAddMode ? 'Tambah Admin' : 'Edit Admin' }}</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ isAddMode ? 'Tambahkan admin baru ke sistem' : 'Edit data admin yang sudah ada' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="adminStore.isLoading && !isSubmitting" class="flex justify-center my-8">
      <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Error State -->
    <div v-else-if="adminStore.getError && !formSubmitted" class="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <div class="flex">
        <svg class="h-5 w-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Terjadi kesalahan</h3>
          <p class="text-sm text-red-700 mt-1">{{ adminStore.getError }}</p>
          <div class="mt-2">
            <button
              @click="loadAdminData"
              class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Form -->
    <form @submit.prevent="submitForm" class="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 space-y-6">
      <!-- Form Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Nama Admin -->
        <div>
          <label for="nama" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nama Admin <span class="text-red-500">*</span>
          </label>
          <input
            id="nama"
            v-model="form.nama"
            type="text"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-dark-form dark:border-dark-border dark:text-white"
            placeholder="Masukkan nama admin"
          />
          <p v-if="validationErrors.nama" class="mt-1 text-xs text-red-600">{{ validationErrors.nama }}</p>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-dark-form dark:border-dark-border dark:text-white"
            placeholder="contoh@email.com"
          />
          <p v-if="validationErrors.email" class="mt-1 text-xs text-red-600">{{ validationErrors.email }}</p>
        </div>

        <!-- NIP (optional) -->
        <div>
          <label for="nip" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            NIP (Opsional)
          </label>
          <input
            id="nip"
            v-model="form.nip"
            type="text"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-dark-form dark:border-dark-border dark:text-white"
            placeholder="Masukkan NIP jika ada"
          />
          <p v-if="validationErrors.nip" class="mt-1 text-xs text-red-600">{{ validationErrors.nip }}</p>
        </div>

        <!-- Password (required for add mode) -->
        <div v-if="isAddMode">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password <span class="text-red-500">*</span>
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            :required="isAddMode"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-dark-form dark:border-dark-border dark:text-white"
            placeholder="Masukkan password"
          />
          <p v-if="validationErrors.password" class="mt-1 text-xs text-red-600">{{ validationErrors.password }}</p>
        </div>

        <!-- Password (optional for edit mode) -->
        <div v-else>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password Baru (Kosongkan jika tidak diubah)
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-dark-form dark:border-dark-border dark:text-white"
            placeholder="Kosongkan jika tidak diubah"
          />
          <p v-if="validationErrors.password" class="mt-1 text-xs text-red-600">{{ validationErrors.password }}</p>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <div class="flex items-center space-x-4 mt-1">
            <label class="inline-flex items-center">
              <input
                v-model="form.status"
                type="radio"
                :value="1"
                class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Aktif</span>
            </label>
            <label class="inline-flex items-center">
              <input
                v-model="form.status"
                type="radio"
                :value="0"
                class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Nonaktif</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Form Buttons -->
      <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-border">
        <button
          type="button"
          @click="goBack"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-dark-form dark:border-dark-border dark:text-white dark:hover:bg-gray-700"
        >
          Batal
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isAddMode ? 'Menyimpan...' : 'Mengupdate...' }}
          </span>
          <span v-else>{{ isAddMode ? 'Simpan' : 'Update' }}</span>
        </button>
      </div>
    </form>

    <!-- Toast Notification -->
    <Toast
      :show="showToast"
      :type="toastType"
      :title="toastTitle"
      :message="toastMessage"
      :duration="5000"
      @close="closeToast"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth'
import Toast from '@/components/common/Toast.vue'

// Initialize stores and router
const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const authStore = useAuthStore()
const adminId = computed(() => route.params.id)
const isAddMode = computed(() => !adminId.value)

// Check if user has admin permissions
onMounted(() => {
  // If not admin role, redirect to dashboard
  if (!authStore.isAdmin) {
    router.push('/dashboard')
    return
  }
  
  // If edit mode, load admin data
  if (!isAddMode.value) {
    loadAdminData()
  }
})

// Form state
const form = ref({
  nama: '',
  email: '',
  nip: '',
  password: '',
  status: 1,
  id_role: 1 // Role admin = 1
})

const isSubmitting = ref(false)
const formSubmitted = ref(false)
const validationErrors = ref({})

// Toast notification state
const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('')
const toastMessage = ref('')

const showNotification = (type, title, message) => {
  toastType.value = type
  toastTitle.value = title
  toastMessage.value = message
  showToast.value = true
}

const closeToast = () => {
  showToast.value = false
}

// Load admin data for edit mode
const loadAdminData = async () => {
  if (!adminId.value) return
  
  try {
    await adminStore.fetchAdminDetail(adminId.value)
    
    const admin = adminStore.getCurrentAdmin
    if (admin) {
      form.value = {
        nama: admin.nama || '',
        email: admin.email || '',
        nip: admin.nip || '',
        password: '',
        status: typeof admin.status === 'number' ? admin.status : 1,
        id_role: admin.id_role || 1
      }
    }
  } catch (error) {
    console.error('Failed to load admin data:', error)
    showNotification('error', 'Gagal!', 'Tidak dapat memuat data admin')
  }
}

// Validate form data
const validateForm = () => {
  const errors = {}
  
  if (!form.value.nama) {
    errors.nama = 'Nama admin harus diisi'
  }
  
  if (!form.value.email) {
    errors.email = 'Email harus diisi'
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.email = 'Format email tidak valid'
  }
  
  if (isAddMode.value && !form.value.password) {
    errors.password = 'Password harus diisi'
  } else if (form.value.password && form.value.password.length < 6) {
    errors.password = 'Password minimal 6 karakter'
  }
  
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  formSubmitted.value = true
  
  try {
    const adminData = {
      ...form.value,
      // Add any additional fields needed by the API
    }
    
    let result
    
    if (isAddMode.value) {
      result = await adminStore.addAdmin(adminData)
    } else {
      // If password is empty in edit mode, remove it from the payload
      if (!adminData.password) {
        delete adminData.password
      }
      
      result = await adminStore.updateAdmin(adminId.value, adminData)
    }
    
    if (result.success) {
      showNotification(
        'success',
        'Berhasil!',
        isAddMode.value
          ? 'Admin berhasil ditambahkan'
          : 'Data admin berhasil diperbarui'
      )
      
      // Navigate back to admin list after successful submission
      setTimeout(() => {
        router.push('/admin/list')
      }, 1500)
    }
  } catch (error) {
    console.error('Form submission failed:', error)
    showNotification(
      'error',
      'Gagal!',
      isAddMode.value
        ? 'Gagal menambahkan admin'
        : 'Gagal memperbarui data admin'
    )
  } finally {
    isSubmitting.value = false
  }
}

// Navigate back
const goBack = () => {
  router.back()
}
</script>