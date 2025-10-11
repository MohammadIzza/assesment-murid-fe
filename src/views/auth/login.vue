<template>
  <div :class="['relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-500 auth-font overflow-hidden', { 'bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100': !isDarkMode, 'bg-dark-background': isDarkMode }]">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-slate-100/40 to-blue-50/40 rounded-full blur-3xl animate-float-delayed"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div class="absolute top-20 right-20 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div class="absolute bottom-32 left-32 w-1.5 h-1.5 bg-indigo-400/20 rounded-full animate-pulse-slow"></div>
        <div class="absolute top-40 left-1/4 w-1 h-1 bg-slate-400/20 rounded-full animate-pulse"></div>
      </div>
    </div>

    <transition name="scale-fade" mode="out-in" appear>
      <div :key="$route.name" class="relative w-full max-w-5xl z-10">
        <!-- Main card -->
        <div :class="[
              'grid lg:grid-cols-2 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border',
              !isDarkMode ? 'bg-white/80 backdrop-blur-2xl border-slate-200/60' : 'bg-dark-surface/90 backdrop-blur-2xl border-gray-700/50'
            ]">
          
          <!-- Left: Branding Section -->
          <div class="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
            <!-- Decorative elements -->
            <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div class="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl"></div>
            
            <div class="relative z-10">
              <!-- Logo and title -->
              <div class="space-y-6">
                <div class="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-110 transition-transform duration-300">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">ARASIT</h2>
                  <p class="text-sm text-gray-300 font-medium">Assessment Rapor SKL Islam Terpadu</p>
                </div>
              </div>

              <!-- Features list -->
              <div class="mt-12 space-y-4">
                <div class="flex items-start gap-3 group">
                  <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white">Sistem Terintegrasi</h3>
                    <p class="text-xs text-gray-400 mt-0.5">Kelola assessment dengan mudah</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 group">
                  <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white">Aman & Terpercaya</h3>
                    <p class="text-xs text-gray-400 mt-0.5">Data terlindungi dengan enkripsi</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Partner logos -->
            <div class="relative z-10 pt-8 border-t border-white/10">
              <p class="text-xs text-gray-400 mb-3">Powered by</p>
              <div class="flex items-center gap-4">
                <div class="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-shadow">
                  <img src="/KlikEdupart.png" alt="KlikEdupart" class="h-8 w-auto object-contain" />
                </div>
                <span class="text-gray-400 text-sm">×</span>
                <div class="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-shadow">
                  <img src="/Appapun.png" alt="Appapun" class="h-8 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Form Section -->
          <div class="p-8 sm:p-12 flex items-center">
            <div class="w-full max-w-md mx-auto">
              <!-- Header -->
              <div class="mb-8">
                <h3 class="text-3xl font-bold mb-2" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                  Selamat Datang
                </h3>
                <p class="text-sm" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                  Belum memiliki akun?
                  <router-link to="/register" class="font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-1">
                    Daftar sekarang
                  </router-link>
                </p>
              </div>

              <form class="space-y-5" @submit.prevent="handleLogin">
                <!-- Email Input -->
                <div class="group">
                  <label for="email" class="block text-sm font-semibold mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                    Email
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300">
                      <svg class="h-5 w-5 transition-colors" :class="{ 'text-gray-400 group-focus-within:text-blue-500': !isDarkMode, 'text-gray-500 group-focus-within:text-blue-400': isDarkMode }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      v-model="form.email"
                      autocomplete="username"
                      autocapitalize="none"
                      spellcheck="false"
                      class="block w-full pl-12 pr-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border"
                      :class="!isDarkMode ? 'bg-slate-50 border-slate-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-300' : 'bg-dark-surface/80 border-dark-border text-gray-100 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400/20'"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <!-- Password Input -->
                <div class="group">
                  <label for="password" class="block text-sm font-semibold mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                    Password
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300">
                      <svg class="h-5 w-5 transition-colors" :class="{ 'text-gray-400 group-focus-within:text-blue-500': !isDarkMode, 'text-gray-500 group-focus-within:text-blue-400': isDarkMode }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="current-password"
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      v-model="form.password"
                      autocomplete="current-password"
                      class="block w-full pl-12 pr-24 py-3 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border"
                      :class="!isDarkMode ? 'bg-slate-50 border-slate-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-300' : 'bg-dark-surface/80 border-dark-border text-gray-100 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400/20'"
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold transition-colors"
                      :class="{ 'text-gray-500 hover:text-gray-700': !isDarkMode, 'text-gray-400 hover:text-gray-200': isDarkMode }"
                      @click="showPassword = !showPassword"
                    >
                      {{ showPassword ? 'Sembunyikan' : 'Tampilkan' }}
                    </button>
                  </div>
                </div>

                <!-- Remember & Forgot -->
                <div class="flex items-center justify-between text-sm">
                  <label class="flex items-center cursor-pointer group">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      v-model="form.rememberMe"
                      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer"
                    />
                    <span class="ml-2 font-medium" :class="{ 'text-gray-700 group-hover:text-gray-900': !isDarkMode, 'text-gray-300 group-hover:text-gray-100': isDarkMode }">
                      Ingat saya
                    </span>
                  </label>
                  <a href="#" class="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Lupa password?
                  </a>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 animate-shake">
                  <div class="flex items-start">
                    <svg class="h-5 w-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="ml-3 text-sm text-red-800 font-medium">{{ error }}</p>
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span v-if="!loading" class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Masuk ke Akun
                  </span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>

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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import Toast from '@/components/common/Toast.vue'
import { parseJWT } from '@/utils/jwt'

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const themeStore = useThemeStore()
    
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
    
  const isDarkMode = computed(() => themeStore.isDarkMode)
    
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

    // Show toast if redirected due to expired session
    onMounted(() => {
      const reason = route.query.reason
      if (reason === 'expired') {
        const hasReturn = !!route.query.redirect
        const msg = hasReturn
          ? 'Sesi berakhir, silakan login kembali untuk melanjutkan.'
          : 'Sesi berakhir, silakan login kembali.'
        showNotification('warning', 'Sesi Berakhir', msg, 4000)
      }
    })
    
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

        // Parse token to check is_verified_nip flag
        const token = authStore.token || ''
        const decoded = parseJWT(token) || {}

        success.value = 'Login berhasil! Mengalihkan...'

        // Show success notification with redirect countdown
        closeToast()
        setTimeout(() => {
          showNotification('success', 'Login Berhasil!', 'Selamat datang! Anda akan diarahkan ke halaman berikutnya', 1500)
        }, 100)

        // Decide redirect: if NIP not verified -> verifikasi page, else normal redirect
        const redirectTo = route.query.redirect || '/dashboard'
        const goTo = (decoded.is_verified_nip === 1) ? redirectTo : '/verifikasiNIP'

        setTimeout(() => {
          router.push(goTo)
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
      isDarkMode,
      handleLogin,
      closeToast
    }
  }
}
</script>

<style scoped>
.auth-font { 
  font-family: Inter, 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Transitions */
.scale-fade-enter-active,
.scale-fade-leave-active { 
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.scale-fade-enter-from { 
  opacity: 0; 
  transform: scale(0.95) translateY(20px);
}
.scale-fade-leave-to { 
  opacity: 0; 
  transform: scale(0.98) translateY(-10px);
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(3deg); }
  66% { transform: translate(-20px, 20px) rotate(-3deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-30px, 30px) rotate(-3deg); }
  66% { transform: translate(20px, -20px) rotate(3deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 25s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Grid pattern */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Dark mode */
.bg-dark-background {
  background: linear-gradient(to bottom right, #1a202c, #2d3748, #1a202c);
}

.bg-dark-surface {
  background-color: #2d3748;
}

.border-dark-border {
  border-color: #4a5568;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>