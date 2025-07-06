<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
    <div class="relative z-10 max-w-sm w-full">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-4">
        <div class="mx-auto h-10 w-10 bg-blue-600 rounded-lg shadow-md flex items-center justify-center mb-2">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-1">
          Assessment Murid
        </h2>
        <p class="text-gray-600 text-xs">
          Sistem Manajemen Guru
        </p>
      </div>

      <!-- Registration Card -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
        <div class="text-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-1">
            Daftar Akun Baru
          </h3>
          <p class="text-gray-600 text-xs">
            Atau
            <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-700 underline decoration-blue-600 hover:decoration-blue-700 transition-colors">
              masuk ke akun yang sudah ada
            </router-link>
          </p>
        </div>
        <form class="space-y-4" @submit.prevent="handleRegister">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-xs font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                v-model="form.name"
                class="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                v-model="form.email"
                class="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan email Anda"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                v-model="form.password"
                class="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan password (min. 6 karakter)"
              />
            </div>
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label for="confirmPassword" class="block text-xs font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.2 2a8.963 8.963 0 01-2.474 6.222 8.957 8.957 0 01-5.903 2.661.007.007 0 01-.018 0 8.957 8.957 0 01-5.903-2.661A8.963 8.963 0 01.148 12a8.963 8.963 0 012.474-6.222 8.957 8.957 0 015.903-2.661.007.007 0 01.018 0 8.957 8.957 0 015.903 2.661A8.963 8.963 0 0117.852 12z"></path>
                </svg>
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                v-model="form.confirmPassword"
                class="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ulangi password Anda"
              />
            </div>
          </div>

          <!-- Error & Success Messages -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <div class="flex">
              <svg class="h-4 w-4 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="ml-2 text-xs text-red-700">{{ error }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <span v-if="!loading" class="flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                Daftar
              </span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notifications -->
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
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const form = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    
    const loading = ref(false)
    const error = ref('')
    const success = ref('')
    
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
    
    const handleRegister = async () => {
      error.value = ''
      success.value = ''
      closeToast()
      
      // Validasi form
      if (!form.value.name || !form.value.email || !form.value.password || !form.value.confirmPassword) {
        error.value = 'Semua field harus diisi'
        showNotification('error', 'Validasi Gagal', 'Mohon lengkapi semua field yang diperlukan')
        return
      }
      
      // Validasi password
      if (form.value.password !== form.value.confirmPassword) {
        error.value = 'Password dan konfirmasi password tidak sama'
        showNotification('error', 'Password Tidak Cocok', 'Password dan konfirmasi password harus sama')
        return
      }
      
      if (form.value.password.length < 6) {
        error.value = 'Password minimal 6 karakter'
        showNotification('error', 'Password Terlalu Pendek', 'Password harus minimal 6 karakter')
        return
      }
      
      loading.value = true
      
      // Show loading notification
      showNotification('info', 'Memproses Pendaftaran', 'Sedang membuat akun baru Anda...', 0)
      
      try {
        await authStore.register({
          name: form.value.name,
          email: form.value.email,
          password: form.value.password
        })
        
        success.value = 'Pendaftaran berhasil! Silakan login.'
        
        // Show success notification with redirect countdown
        closeToast()
        setTimeout(() => {
          showNotification('success', 'Pendaftaran Berhasil!', 'Akun Anda telah dibuat. Anda akan diarahkan ke halaman login', 1500)
        }, 100)
        
        // Redirect ke login setelah 1.5 detik
        setTimeout(() => {
          router.push('/login')
        }, 1500)
        
      } catch (err) {
        error.value = err.message || 'Terjadi kesalahan saat mendaftar'
        closeToast()
        setTimeout(() => {
          showNotification('error', 'Pendaftaran Gagal', err.message || 'Terjadi kesalahan saat membuat akun. Silakan coba lagi.')
        }, 100)
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      loading,
      error,
      success,
      showToast,
      toastType,
      toastTitle,
      toastMessage,
      toastDuration,
      handleRegister,
      closeToast
    }
  }
}
</script>

