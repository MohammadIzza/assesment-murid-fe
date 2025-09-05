```vue
<template>
	<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div class="text-center">
				<h2 class="text-2xl font-bold text-gray-900">Verifikasi NIP</h2>
				<p class="text-sm text-gray-500">Masukkan NIP Anda untuk mengaitkan akun dengan data guru.</p>
			</div>

			<div class="rounded-xl shadow-lg border p-6 bg-white">
				<form @submit.prevent="submitNip" class="space-y-4">
					<div>
						<label for="nip" class="block text-xs font-medium text-gray-700 mb-1">NIP</label>
						<input
							id="nip"
							v-model="nip"
							type="text"
							required
							placeholder="Masukkan NIP"
							class="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div v-if="error" class="text-xs text-red-600">{{ error }}</div>
					<div v-if="success" class="text-xs text-green-600">{{ success }}</div>

					<div>
						<button :disabled="loading" type="submit" class="w-full py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-50">
							<span v-if="!loading">Verifikasi NIP</span>
							<span v-else>Memproses...</span>
						</button>
					</div>
				</form>
			</div>
		</div>
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
.min-h-screen { background-color: #f8fafc; }
</style>

```
