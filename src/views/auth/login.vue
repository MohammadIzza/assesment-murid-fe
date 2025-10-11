<template>
  <div :class="['relative min-h-screen flex items-center justify-center p-6 transition-colors duration-300 auth-font', { 'bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50': !isDarkMode, 'bg-dark-background': isDarkMode }]">
    <!-- Decorative background blobs -->
    <div class="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-primary/20 to-accent/30 blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-300/20 to-sky-300/30 blur-3xl"></div>

    <transition name="slide-fade" mode="out-in" appear>
      <div :key="$route.name" class="relative w-full max-w-6xl">
        <!-- Glass card container -->
        <div :class="[
              'grid md:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl ring-1',
              !isDarkMode ? 'bg-white/70 ring-black/5 backdrop-blur-xl' : 'bg-dark-surface/80 ring-black/20 backdrop-blur-xl'
            ]">
          <!-- Brand strip -->
          <div class="relative hidden md:flex md:col-span-2 p-10 bg-gradient-to-b from-primary to-accent text-white items-center justify-center">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/40 blur-2xl"></div>
              <div class="absolute bottom-10 left-10 h-28 w-28 rounded-full bg-black/10 blur-xl"></div>
            </div>
            <div class="relative z-10 max-w-sm mx-auto text-center space-y-6">
              <div class="mx-auto h-16 w-16 bg-white/15 rounded-2xl flex items-center justify-center shadow-inner">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 class="text-3xl font-extrabold tracking-tight">ARASIT</h2>
                <p class="text-sm text-white/90">Asessment Rapor SKL Islam Terpadu</p>
              </div>
              <div class="mt-2 flex items-center justify-center">
                <div class="flex items-center gap-3">
                  <div class="bg-white rounded-md shadow-sm h-12 w-28 flex items-center justify-center">
                    <img src="/KlikEdupart.png" alt="KlikEdupart" class="max-h-10 w-auto object-contain" />
                  </div>
                  <span class="flex items-center justify-center text-white/90 text-base font-semibold">×</span>
                  <div class="bg-white rounded-md shadow-sm h-12 w-28 flex items-center justify-center">
                    <img src="/Appapun.png" alt="Appapun" class="max-h-10 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form area -->
          <div class="md:col-span-3 p-6 sm:p-10">
            <div class="mx-auto max-w-md">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-semibold mb-1" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Selamat Datang Kembali</h3>
                <p class="text-xs" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                  Belum punya akun?
                  <router-link to="/register" class="font-medium underline transition-colors text-primary hover:text-accent">
                    daftar akun baru
                  </router-link>
                </p>
              </div>

              <form class="space-y-5" @submit.prevent="handleLogin">
                <!-- Email Input -->
                <div>
                  <label for="email" class="block text-xs font-medium mb-1" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-4 w-4" :class="{ 'text-gray-400': !isDarkMode, 'text-gray-500': isDarkMode }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      class="block w-full pl-9 pr-3 py-2.5 rounded-xl shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 border transition-colors"
                      :class="!isDarkMode ? 'bg-white/90 border-gray-200 focus:ring-primary focus:border-primary' : 'bg-dark-surface/80 border-dark-border text-gray-100 placeholder-gray-500 focus:ring-primary focus:border-primary'"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                </div>

                <!-- Password Input -->
                <div>
                  <label for="password" class="block text-xs font-medium mb-1" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-4 w-4" :class="{ 'text-gray-400': !isDarkMode, 'text-gray-500': isDarkMode }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-white/90/80 hover:text-white/90"
                      :aria-label="showPassword ? 'Sembunyikan password.' : 'Tampilkan password sebagai teks biasa. Peringatan: ini akan menampilkan password di layar.'"
                      @click="showPassword = !showPassword"
                    >
                      <span class="text-[11px] font-medium" :class="{ 'text-gray-500': isDarkMode, 'text-gray-600': !isDarkMode }">{{ showPassword ? 'Sembunyikan' : 'Tampilkan' }}</span>
                    </button>
                    <input
                      :id="showPassword ? 'current-password' : 'current-password'"
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      v-model="form.password"
                      autocomplete="current-password"
                      class="block w-full pl-9 pr-3 py-2.5 rounded-xl shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 border transition-colors"
                      :class="!isDarkMode ? 'bg-white/90 border-gray-200 focus:ring-primary focus:border-primary' : 'bg-dark-surface/80 border-dark-border text-gray-100 placeholder-gray-500 focus:ring-primary focus:border-primary'"
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
                      class="h-3 w-3 rounded border-gray-300 focus:ring-primary text-primary"
                    />
                    <label for="remember-me" class="ml-1.5" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Ingat saya</label>
                  </div>
                  <div>
                    <a href="#" class="font-medium transition-colors text-primary hover:text-accent">Lupa password?</a>
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
                    class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
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
.auth-font { font-family: Inter, Poppins, Nunito, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }

.slide-fade-enter-active,
.slide-fade-leave-active { transition: all 0.5s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateY(12px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }

.bg-dark-background {
  background-color: #1a202c;
}

.bg-dark-surface {
  background-color: #2d3748;
}

.border-dark-border {
  border-color: #4a5568;
}

.text-dark {
  color: #cbd5e0;
}
</style>