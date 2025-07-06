<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
    <div class="relative z-10 max-w-sm w-full">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-6">
        <div class="mx-auto h-12 w-12 bg-blue-600 rounded-lg shadow-md flex items-center justify-center mb-3">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">
          Assessment Murid
        </h2>
        <p class="text-gray-600 text-xs">
          Sistem Manajemen Guru
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div class="text-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-1">
            Masuk ke Akun Anda
          </h3>
          <p class="text-gray-600 text-xs">
            Atau
            <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-700 underline decoration-blue-600 hover:decoration-blue-700 transition-colors">
              daftar akun baru
            </router-link>
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                v-model="form.password"
                class="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan password Anda"
              />
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-1.5 block text-gray-700">
                Ingat saya
              </label>
            </div>

            <div>
              <a href="#" class="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Lupa password?
              </a>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Masuk
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
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    
    const form = ref({
      email: '',
      password: '',
      rememberMe: false
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
    
    const handleLogin = async () => {
      error.value = ''
      success.value = ''
      closeToast()
      
      if (!form.value.email || !form.value.password) {
        error.value = 'Email dan password harus diisi'
        showNotification('error', 'Validasi Gagal', 'Email dan password harus diisi')
        return
      }
      
      loading.value = true
      
      // Show loading notification
      showNotification('info', 'Memproses Login', 'Sedang memverifikasi kredensial Anda...', 0)
      
      try {
        await authStore.login({
          email: form.value.email,
          password: form.value.password
        })
        
        success.value = 'Login berhasil! Mengalihkan...'
        
        // Show success notification with redirect countdown
        closeToast()
        setTimeout(() => {
          showNotification('success', 'Login Berhasil!', 'Selamat datang! Anda akan diarahkan ke dashboard', 1500)
        }, 100)
        
        // Redirect ke halaman sebelumnya atau dashboard
        const redirectTo = route.query.redirect || '/dashboard'
        
        setTimeout(() => {
          router.push(redirectTo)
        }, 1500)
        
      } catch (err) {
        error.value = err.message || 'Terjadi kesalahan saat login'
        closeToast()
        setTimeout(() => {
          showNotification('error', 'Login Gagal', err.message || 'Email atau password tidak valid. Silakan coba lagi.')
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
      handleLogin,
      closeToast
    }
  }
}
</script>
