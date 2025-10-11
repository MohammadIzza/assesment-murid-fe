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
								<h3 class="text-2xl font-semibold mb-1 text-gray-900">Verifikasi NIP</h3>
								<p class="text-xs text-gray-600">Masukkan NIP Anda untuk mengaitkan akun dengan data guru.</p>
							</div>

							<form @submit.prevent="submitNip" class="space-y-5">
								<div>
									<label for="nip" class="block text-xs font-medium text-gray-700 mb-1">NIP</label>
									<div class="relative">
										<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3zm6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
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
											class="block w-full pl-9 pr-3 py-2.5 rounded-xl shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 border transition-colors bg-white/90 border-gray-200 focus:ring-primary focus:border-primary"
										/>
									</div>
								</div>

								<div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
									<div class="flex">
										<svg class="h-4 w-4 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<p class="ml-2 text-xs text-red-700">{{ error }}</p>
									</div>
								</div>

								<div>
									<button :disabled="loading" type="submit" class="w-full py-2.5 bg-primary hover:bg-blue-600 text-white rounded-xl disabled:opacity-50 transition-colors">
										<span v-if="!loading">Verifikasi NIP</span>
										<span v-else>Memproses...</span>
									</button>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios'
import Cookies from 'js-cookie'
import { parseJWT } from '@/utils/jwt'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const nip = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

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
.auth-font { font-family: Inter, Poppins, Nunito, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }
.slide-fade-enter-active,
.slide-fade-leave-active { transition: all 0.5s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateY(12px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
