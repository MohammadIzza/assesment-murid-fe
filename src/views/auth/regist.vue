<template>
  <div class="relative min-h-screen flex items-center justify-center p-6 auth-font bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
    <!-- Decorative background blobs -->
    <div class="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-primary/20 to-accent/30 blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-300/20 to-sky-300/30 blur-3xl"></div>

    <transition name="slide-fade" mode="out-in" appear>
      <div :key="$route.name" class="relative w-full max-w-6xl">
        <div class="grid md:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl ring-1 bg-white/70 ring-black/5 backdrop-blur-xl">
          <!-- Left: Branding -->
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

          <!-- Right: Form -->
          <div class="md:col-span-3 p-6 sm:p-10">
            <div class="mx-auto max-w-md">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-semibold mb-1 text-gray-900">Daftar Akun Baru</h3>
                <p class="text-xs text-gray-600">
                  Sudah punya akun?
                  <router-link to="/login" class="font-medium underline transition-colors text-primary hover:text-accent">
                    masuk di sini
                  </router-link>
                </p>
              </div>

              <form class="space-y-5" @submit.prevent="handleRegister">
                <!-- Name Input -->
                <div>
                  <label for="name" class="block text-xs font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      v-model="form.name"
                      class="block w-full pl-9 pr-3 py-2.5 rounded-xl shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 border transition-colors bg-white/90 border-gray-200 focus:ring-primary focus:border-primary"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                </div>

                <!-- Email Input -->
                <div>
                  <label for="email" class="block text-xs font-medium text-gray-700 mb-1">Email</label>
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
                      autocomplete="username"
                      autocapitalize="none"
                      spellcheck="false"
                      class="block w-full pl-9 pr-3 py-2.5 rounded-xl shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 border transition-colors bg-white/90 border-gray-200 focus:ring-primary focus:border-primary"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                </div>

                <!-- Password Input -->
                <div>
                  <label for="password" class="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-[11px] font-medium"
                      aria-label="Tampilkan atau sembunyikan password"
                      @click="showPassword = !showPassword"
                    >
                      <span class="text-gray-600">{{ showPassword ? 'Sembunyikan' : 'Tampilkan' }}</span>
                    </button>
                    <input
                      :id="showPassword ? 'new-password' : 'new-password'"
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      v-model="form.password"
                      autocomplete="new-password"
                      class="block w-full pl-9 pr-3 py-2.5 rounded-xl shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 border transition-colors bg-white/90 border-gray-200 focus:ring-primary focus:border-primary"
                      placeholder="Masukkan password (min. 6 karakter)"
                    />
                  </div>
                </div>

                <!-- Confirm Password Input -->
                <div>
                  <label for="confirmPassword" class="block text-xs font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.2 2a8.963 8.963 0 01-2.474 6.222 8.957 8.957 0 01-5.903 2.661.007.007 0 01-.018 0 8.957 8.957 0 01-5.903-2.661A8.963 8.963 0 0117.852 12z" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      v-model="form.confirmPassword"
                      class="block w-full pl-9 pr-3 py-2.5 rounded-xl shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 border transition-colors bg-white/90 border-gray-200 focus:ring-primary focus:border-primary"
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
                    class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <span v-if="!loading" class="flex items-center">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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

<style scoped>
.auth-font { font-family: Inter, Poppins, Nunito, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }
.slide-fade-enter-active,
.slide-fade-leave-active { transition: all 0.5s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateY(12px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>

