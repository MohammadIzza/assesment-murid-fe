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

						<!-- Info section -->
						<div class="mt-12 space-y-4">
							<div class="flex items-start gap-3 group">
								<div class="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
									<svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
									</svg>
								</div>
								<div>
									<h3 class="text-sm font-semibold text-white">Validasi Data Kepegawaian</h3>
									<p class="text-xs text-gray-400 mt-0.5">Hubungkan akun dengan data guru di sistem sekolah</p>
								</div>
							</div>
							<div class="flex items-start gap-3 group">
								<div class="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
									<svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.2 2a8.963 8.963 0 01-2.474 6.222 8.957 8.957 0 01-5.903 2.661.007.007 0 01-.018 0 8.957 8.957 0 01-5.903-2.661A8.963 8.963 0 0117.852 12z" />
									</svg>
								</div>
								<div>
									<h3 class="text-sm font-semibold text-white">Akses Penuh Sistem</h3>
									<p class="text-xs text-gray-400 mt-0.5">Setelah verifikasi, kelola rapor siswa Anda</p>
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
							<div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 mb-4">
								<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.2 2a8.963 8.963 0 01-2.474 6.222 8.957 8.957 0 01-5.903 2.661.007.007 0 01-.018 0 8.957 8.957 0 01-5.903-2.661A8.963 8.963 0 0117.852 12z" />
								</svg>
							</div>
							<h3 class="text-3xl font-bold mb-2" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
								Verifikasi Data Kepegawaian
							</h3>
							<p class="text-sm" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
								Masukkan Nomor Induk Pegawai (NIP) untuk menghubungkan akun Anda dengan database guru sekolah
							</p>
						</div>

							<form @submit.prevent="submitNip" class="space-y-5">
								<!-- NIP Input -->
								<div class="group">
									<label for="nip" class="block text-sm font-semibold mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
										Nomor Induk Pegawai (NIP)
									</label>
									<div class="relative">
										<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300">
											<svg class="h-5 w-5 transition-colors" :class="{ 'text-gray-400 group-focus-within:text-blue-500': !isDarkMode, 'text-gray-500 group-focus-within:text-blue-400': isDarkMode }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
											</svg>
										</div>
										<input
											id="nip"
											v-model="nip"
											type="text"
											inputmode="numeric"
											autocomplete="one-time-code"
											autocapitalize="none"
											spellcheck="false"
											required
											placeholder="Masukkan NIP"
											class="block w-full pl-12 pr-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border"
											:class="!isDarkMode ? 'bg-slate-50 border-slate-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-300' : 'bg-dark-surface/80 border-dark-border text-gray-100 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400/20'"
										/>
									</div>
									<p class="mt-2 text-xs" :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">Contoh: 198501012010011001</p>
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
									:disabled="loading"
									type="submit"
									class="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
								>
									<span v-if="!loading" class="flex items-center gap-2">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										Verifikasi NIP
									</span>
									<span v-else class="flex items-center gap-2">
										<svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Memproses...
									</span>
								</button>

								<!-- Help text -->
								<div class="mt-6 text-center">
									<p class="text-xs" :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">
										NIP tidak ditemukan? Hubungi admin sekolah untuk pendataan guru
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios'
import Cookies from 'js-cookie'
import { parseJWT } from '@/utils/jwt'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const nip = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const isDarkMode = computed(() => themeStore.isDarkMode)

async function submitNip() {
	error.value = ''
	success.value = ''

	if (!nip.value || nip.value.trim() === '') {
		error.value = 'NIP harus diisi.'
		return
	}

	loading.value = true

	try {
		const payload = { nip: nip.value.trim() }
		const response = await axios.post('/auth/verify_nip', payload)

		if (response.data && response.data.success && response.data.token) {
			const newToken = response.data.token

			// Parse token untuk mendapatkan klaim email dan id
			const decoded = parseJWT(newToken) || {}
			const sessionId = Cookies.get('session_id') || authStore.sessionId || null

			const user = {
				email: decoded.email || authStore.user?.email || '',
				name: decoded.email ? decoded.email.split('@')[0] : (authStore.user?.name || ''),
				id: decoded.id || null,
				is_verified: decoded.is_verified || 1,
				is_verified_nip: decoded.is_verified_nip || 1
			}

			// Simpan token dan user di cookie/state melalui store
			try {
				authStore.setAuthCookies(newToken, user, sessionId)
			} catch (cookieErr) {
				// fallback: set cookie directly
				Cookies.set('auth_token', newToken)
				if (sessionId) Cookies.set('session_id', sessionId)
				Cookies.set('user_data', JSON.stringify(user))
			}

			// Update store state
			authStore.token = newToken
			authStore.user = user
			authStore.isAuthenticated = true
			// Set axios default header in case interceptor not yet applied
			axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

			success.value = 'Verifikasi NIP berhasil. Mengalihkan...'

			setTimeout(() => {
				router.push('/dashboard')
			}, 1000)
		} else {
			throw new Error(response.data?.message || 'Verifikasi gagal')
		}
	} catch (err) {
		console.error('verify_nip error', err)
		error.value = err.response?.data?.message || err.message || 'Gagal memverifikasi NIP'
	} finally {
		loading.value = false
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
