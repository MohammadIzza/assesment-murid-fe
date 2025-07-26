<template>
  <div class="relative min-h-screen overflow-hidden" 
       :class="{ 'dark': isDarkMode }"
       :style="!isDarkMode ? 
         'background: linear-gradient(135deg, #fef7ff 0%, #f0f9ff 25%, #dbeafe 50%, #bfdbfe 75%, #93c5fd 100%);' : 
         'background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e40af 75%, #3b82f6 100%);'">
    
    <!-- Theme Toggle Button -->
    <button 
      @click="toggleTheme" 
      class="fixed top-5 right-5 z-50 px-4 py-2 rounded-full shadow-lg transition-all duration-300"
      :class="[isDarkMode ? 
        'bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700' : 
        'bg-white/90 text-blue-800 border border-blue-200 hover:bg-blue-50 backdrop-blur-md']"
    >
      <span class="flex items-center text-sm font-semibold">
        <svg v-if="isDarkMode" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
        <svg v-else class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
      </span>
    </button>

    <!-- Animated Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div class="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] rounded-full animate-float"
           :class="isDarkMode ? 'bg-blue-500/10' : 'bg-gradient-to-br from-blue-400/5 to-blue-500/10'"></div>
      <div class="absolute top-[20%] right-[-100px] w-[200px] h-[200px] rounded-full animate-float-delay-1"
           :class="isDarkMode ? 'bg-blue-500/10' : 'bg-gradient-to-br from-blue-300/8 to-blue-400/10'"></div>
      <div class="absolute bottom-[-75px] left-[30%] w-[150px] h-[150px] rounded-full animate-float-delay-2"
           :class="isDarkMode ? 'bg-blue-500/10' : 'bg-gradient-to-br from-blue-400/5 to-blue-500/10'"></div>
      <div class="absolute top-[60%] right-[20%] w-[100px] h-[100px] rounded-full animate-float-delay-3"
           :class="isDarkMode ? 'bg-blue-500/10' : 'bg-gradient-to-br from-blue-300/8 to-blue-400/10'"></div>
      <div class="absolute top-[10%] left-[15%] w-[160px] h-[160px] rounded-full animate-float-delay-4"
           :class="isDarkMode ? 'bg-blue-500/10' : 'bg-gradient-to-br from-blue-300/8 to-blue-400/10'"></div>
    </div>

    <!-- Main Container -->
    <div class="relative flex items-center justify-center min-h-screen px-4 py-12 z-10">
      <div 
        class="w-full max-w-md p-8 mx-auto rounded-[32px] shadow-2xl transform transition-all duration-500 login-card"
        :class="isDarkMode ? 
          'backdrop-blur-xl bg-gray-800/40 border border-gray-700/50' : 
          'backdrop-blur-xl bg-white/85 border-2 border-blue-100/30 shadow-blue-100'"
        id="loginCard"
      >
        <!-- Shimmer effect container -->
        <div class="shimmer-container absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none">
          <div class="shimmer"></div>
        </div>
        
        <!-- Header -->
        <div class="text-center mb-6">
          <h1 class="text-3xl font-extrabold mb-1 static-glow"
              :class="isDarkMode ? 
                'text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200' : 
                'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500'">
            Selamat Datang di ASIK!
          </h1>
          <p :class="isDarkMode ? 'text-blue-100/90 text-base' : 'text-gray-700 text-base font-medium'">
            Assessment Cerdik untuk Guru Hebat
          </p>
        </div>

        <div class="mb-8 text-center">
          <p :class="isDarkMode ? 'text-sm text-blue-100/70' : 'text-sm text-gray-600'">
            Belum punya akun?
            <router-link to="/register" 
                       class="font-medium transition-all duration-300 hover:-translate-y-0.5 relative"
                       :class="isDarkMode ? 
                          'text-blue-300 hover:text-blue-200' : 
                          'text-blue-600 hover:text-blue-700'">
              <span>Daftar Sekarang</span>
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </router-link>
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Input -->
          <div class="group">
            <label for="email" 
                  class="block text-sm font-semibold mb-2"
                  :class="isDarkMode ? 'text-blue-100' : 'text-gray-700'">
              Alamat Email
            </label>
            <div class="relative transform transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5" 
                     :class="isDarkMode ? 'text-blue-300' : 'text-blue-500'"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                v-model="form.email"
                class="block w-full pl-10 pr-3 py-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ease-out font-sans text-base"
                :class="isDarkMode ? 
                  'bg-gray-800/80 border border-blue-300/20 focus:border-blue-400 text-white placeholder-blue-300/50 focus:ring-blue-500 hover:bg-gray-700/80 backdrop-blur-sm' : 
                  'bg-white/70 border-2 border-blue-100/30 focus:border-blue-500 text-gray-800 placeholder-gray-400 focus:ring-blue-400 hover:bg-white/90 backdrop-blur-sm'"
                placeholder="nama@contoh.com"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="group">
            <label for="password" 
                  class="block text-sm font-semibold mb-2"
                  :class="isDarkMode ? 'text-blue-100' : 'text-gray-700'">
              Kata Sandi
            </label>
            <div class="relative transform transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5" 
                     :class="isDarkMode ? 'text-blue-300' : 'text-blue-500'"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                v-model="form.password"
                class="block w-full pl-10 pr-3 py-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ease-out font-sans text-base"
                :class="isDarkMode ? 
                  'bg-gray-800/80 border border-blue-300/20 focus:border-blue-400 text-white placeholder-blue-300/50 focus:ring-blue-500 hover:bg-gray-700/80 backdrop-blur-sm' : 
                  'bg-white/70 border-2 border-blue-100/30 focus:border-blue-500 text-gray-800 placeholder-gray-400 focus:ring-blue-400 hover:bg-white/90 backdrop-blur-sm'"
                placeholder="Masukkan kata sandi Anda"
              />
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-5 w-5 rounded transition-colors"
                :class="isDarkMode ? 
                  'text-blue-600 focus:ring-blue-500 border-blue-300/30 bg-gray-800/80' : 
                  'text-blue-600 focus:ring-blue-400 border-2 border-blue-200 bg-white/70'"
              />
              <label for="remember-me" 
                     class="ml-2 block text-sm font-medium"
                     :class="isDarkMode ? 'text-blue-100' : 'text-gray-700'">
                Ingat saya
              </label>
            </div>

            <div>
              <a href="#" 
                 class="text-sm font-semibold transition-colors relative group"
                 :class="isDarkMode ? 
                  'text-blue-300 hover:text-blue-200' : 
                  'text-blue-600 hover:text-blue-700'">
                Lupa password?
                <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          <!-- Login Button -->
          <div class="pt-3">
            <button
              type="submit"
              class="relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl font-medium transition-all duration-300 overflow-hidden login-button"
              :class="isDarkMode ? 
                'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:-translate-y-1 hover:shadow-lg' : 
                'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white hover:-translate-y-1 hover:shadow-xl shadow-blue-200/50'"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memverifikasi...
              </span>
              <span v-else class="flex items-center">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Masuk ke Akun
              </span>
              <div class="absolute inset-0 overflow-hidden">
                <div class="button-shimmer"></div>
              </div>
            </button>
          </div>
        </form>

        <!-- Developer Credit Footer -->
        <div class="text-center mt-8 text-sm" :class="isDarkMode ? 'text-blue-100/60' : 'text-gray-500'">
          Dikembangkan dengan 
          <span class="text-red-500 animate-pulse">❤️</span> 
          oleh Appapun IT
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <Toast
      v-if="showToast"
      :type="toastType"
      :title="toastTitle"
      :message="toastMessage"
      :duration="toastDuration"
      @close="closeToast"
    />
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import Toast from '@/components/common/Toast.vue'

export default {
  components: {
    Toast
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const themeStore = useThemeStore()
    
    const form = reactive({
      email: '',
      password: '',
      rememberMe: false
    })
    
    const loading = ref(false)
    const error = ref('')
    const success = ref('')
    const showToast = ref(false)
    const toastType = ref('info')
    const toastTitle = ref('')
    const toastMessage = ref('')
    const toastDuration = ref(4000)
    
    const isDarkMode = computed(() => themeStore.isDarkMode)
    
    const toggleTheme = () => {
      // Get current theme and toggle it
      const newTheme = themeStore.isDarkMode ? 'light' : 'dark'
      themeStore.setTheme(newTheme)
    }
    
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
      
      if (!form.email || !form.password) {
        error.value = 'Email dan password harus diisi'
        showNotification('error', 'Validasi Gagal', 'Email dan password harus diisi')
        return
      }
      
      loading.value = true
      
      // Show loading notification
      showNotification('info', 'Memproses Login', 'Sedang memverifikasi kredensial Anda...', 0)
      
      try {
        await authStore.login({
          email: form.email,
          password: form.password
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
    
    // Add subtle 3D tilt effect to the login card
    const addTiltEffect = () => {
      const card = document.getElementById('loginCard');
      if (!card) return;

      document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const rotateX = (mouseY - 0.5) * 5;
        const rotateY = (mouseX - 0.5) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      // Reset transform when mouse leaves window
      document.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    }
    
    // Initialize on component mount
    onMounted(() => {
      addTiltEffect();
    })
    
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
      toggleTheme,
      handleLogin,
      closeToast
    }
  }
}
</script>

<style scoped>
/* Custom animations and styles that extend Tailwind */
@keyframes float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1); 
    opacity: 0.6;
  }
  25% { 
    transform: translateY(-30px) rotate(90deg) scale(1.1); 
    opacity: 0.8;
  }
  50% { 
    transform: translateY(-60px) rotate(180deg) scale(0.9); 
    opacity: 0.5;
  }
  75% { 
    transform: translateY(-30px) rotate(270deg) scale(1.05); 
    opacity: 0.7;
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes buttonShimmer {
  0% { 
    left: -50%; /* Start before the button */
  }
  100% { 
    left: 150%; /* End after the button */
  }
}

/* Static glow instead of animated */
.static-glow {
  filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.3));
}

.dark .static-glow {
  filter: drop-shadow(0 0 3px rgba(219, 234, 254, 0.2));
}

.animate-float {
  animation: float 25s infinite ease-in-out;
}

.animate-float-delay-1 {
  animation: float 25s infinite ease-in-out;
  animation-delay: -5s;
}

.animate-float-delay-2 {
  animation: float 25s infinite ease-in-out;
  animation-delay: -10s;
}

.animate-float-delay-3 {
  animation: float 25s infinite ease-in-out;
  animation-delay: -15s;
}

.animate-float-delay-4 {
  animation: float 25s infinite ease-in-out;
  animation-delay: -20s;
}

/* Shimmer effect */
.shimmer-container {
  z-index: 0;
}

.shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.6),
    transparent
  );
  animation: shimmer 4s ease-in-out infinite;
}

.dark .shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
}

.button-shimmer {
  position: absolute;
  top: 0;
  left: -100%; /* Start from outside the button */
  width: 50%; /* Make the shimmer wider */
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: buttonShimmer 3s ease-in-out infinite;
  transform: skewX(-15deg);
}

/* Make login card have proper stacking context for 3D effect */
.login-card {
  transform-style: preserve-3d;
  will-change: transform;
  font-family: 'Inter', sans-serif;
}

/* Form input focus effect */
.form-input:focus {
  transform: translateY(-2px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Loading spinner animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Fix for form input font */
input, button, select, textarea {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Fix for input autofill styles */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
  -webkit-text-fill-color: currentColor;
  transition: background-color 5000s ease-in-out 0s;
  caret-color: currentColor;
}

.dark input:-webkit-autofill,
.dark input:-webkit-autofill:hover, 
.dark input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #1F2937 inset;
  -webkit-text-fill-color: white;
}
</style>
