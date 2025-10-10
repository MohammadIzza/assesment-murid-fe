<template>
  <div :class="[
    'min-h-screen py-8 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gray-50'
  ]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p class="text-gray-600 mt-1">Kelola preferensi dan konfigurasi aplikasi Anda</p>
      </div>

      <div class="space-y-8">
        <!-- Branding Sekolah: Upload Logo -->
        <div :class="[
          'rounded-xl shadow-sm border overflow-hidden',
          isDarkMode ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div :class="['px-8 py-6 border-b', isDarkMode ? 'border-dark-border' : 'border-gray-200']">
            <h3 :class="['text-lg font-semibold flex items-center', isDarkMode ? 'text-gray-100' : 'text-gray-900']">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Branding Sekolah
            </h3>
            <p :class="['mt-1 text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-500']">Unggah logo sekolah Anda. Logo akan tampil di Navbar.</p>
          </div>
          <div class="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <!-- Preview -->
            <div class="flex flex-col items-center">
              <div class="w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center border"
                   :class="isDarkMode ? 'border-dark-border bg-gray-800' : 'border-gray-200 bg-gray-50'">
                <img v-if="brandingStore.hasLogo || previewUrl" :src="previewUrl || brandingStore.logoObjectUrl" alt="Logo Sekolah" class="w-full h-full object-cover" />
                <div v-else class="w-10 h-10 flex items-center justify-center rounded bg-blue-600">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <p class="mt-3 text-xs text-gray-500" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">PNG/JPG maks 5MB</p>
            </div>

            <!-- Controls -->
            <div class="md:col-span-2 space-y-4 w-full">
              <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0 w-full">
                <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/jpg,image/gif" @change="onFileChange" class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                <button @click="uploadLogo" :disabled="!selectedFile || uploading" class="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                  <span v-if="!uploading">Unggah Logo</span>
                  <span v-else>Mengunggah...</span>
                </button>
                <button v-if="brandingStore.hasLogo" @click="deleteLogo" :disabled="deleting" class="inline-flex items-center px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50">
                  <span v-if="!deleting">Hapus Logo</span>
                  <span v-else>Menghapus...</span>
                </button>
              </div>

              <!-- Admin scope: if user has idSekolah, lock to that school and hide selector -->
              <div v-if="isAdmin && !authStore.user?.idSekolah" class="flex items-center space-x-3">
                <label class="text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">Pilih Sekolah</label>
                <select v-model="selectedSekolahId" class="px-3 py-2 border rounded-lg" :class="isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-700'">
                  <option disabled value="">-- pilih sekolah --</option>
                  <option v-for="s in sekolahList" :key="s.id_sekolah" :value="s.id_sekolah">{{ s.nama || ('Sekolah #' + s.id_sekolah) }}</option>
                </select>
              </div>
              <div v-else-if="isAdmin && authStore.user?.idSekolah" class="text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                Terkunci ke Sekolah ID: {{ authStore.user.idSekolah }}
              </div>

              <p v-if="brandingError" class="text-sm text-red-600">{{ brandingError }}</p>
              <p v-if="brandingSuccess" class="text-sm text-green-600">{{ brandingSuccess }}</p>
            </div>
          </div>
        </div>
        <!-- General Settings -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
              Pengaturan Umum
            </h3>
          </div>
          <div class="p-8 space-y-6">
            <!-- Language Setting -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Bahasa</h4>
                  <p class="text-sm text-gray-500">Pilih bahasa untuk interface aplikasi</p>
                </div>
              </div>
              <select v-model="settings.language" class="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>

            <!-- Theme Setting -->
            <div :class="[
              'flex items-center justify-between p-4 border rounded-lg',
              isDarkMode ? 'border-dark-border' : 'border-gray-200'
            ]">
              <div class="flex items-center space-x-3">
                <div :class="[
                  'flex items-center justify-center w-10 h-10 rounded-lg',
                  isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-100'
                ]">
                  <svg :class="[
                    'w-5 h-5', 
                    isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                </div>
                <div>
                  <h4 :class="[
                    'font-medium', 
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Tema</h4>
                  <p :class="[
                    'text-sm', 
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">
                    Pilih tema tampilan aplikasi
                  </p>
                </div>
              </div>
              <select 
                v-model="themeValue" 
                :class="[
                  'px-4 py-2 border rounded-lg',
                  isDarkMode ? 
                    'border-gray-600 bg-gray-800 text-gray-200' : 
                    'border-gray-300 bg-white text-gray-700'
                ]"
              >
                <option value="light">Terang</option>
                <option value="dark">Gelap</option>
                <option value="auto">Sistem (Otomatis)</option>
              </select>
            </div>

            <!-- Timezone Setting -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Zona Waktu</h4>
                  <p class="text-sm text-gray-500">Zona waktu untuk tampilan tanggal dan waktu</p>
                </div>
              </div>
              <select v-model="settings.timezone" class="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM7 7v10a2 2 0 002 2h6M7 7V3a2 2 0 012-2h6a2 2 0 012 2v4M7 7H3a2 2 0 00-2 2v6a2 2 0 002 2h4"></path>
              </svg>
              Notifikasi
            </h3>
          </div>
          <div class="p-8 space-y-6">
            <!-- Email Notifications -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Notifikasi Email</h4>
                  <p class="text-sm text-gray-500">Terima notifikasi melalui email</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.emailNotifications" type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <!-- Push Notifications -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM7 7v10a2 2 0 002 2h6M7 7V3a2 2 0 012-2h6a2 2 0 012 2v4M7 7H3a2 2 0 00-2 2v6a2 2 0 002 2h4"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Notifikasi Push</h4>
                  <p class="text-sm text-gray-500">Terima notifikasi push di browser</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.pushNotifications" type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <!-- Assessment Reminders -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Pengingat Assessment</h4>
                  <p class="text-sm text-gray-500">Pengingat untuk deadline assessment</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.assessmentReminders" type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Keamanan
            </h3>
          </div>
          <div class="p-8 space-y-6">
            <!-- Two Factor Authentication -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Autentikasi Dua Faktor</h4>
                  <p class="text-sm text-gray-500">Tingkatkan keamanan dengan 2FA</p>
                </div>
              </div>
              <button class="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                {{ settings.twoFactorEnabled ? 'Aktif' : 'Aktifkan' }}
              </button>
            </div>

            <!-- Session Timeout -->
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Timeout Sesi</h4>
                  <p class="text-sm text-gray-500">Waktu logout otomatis saat tidak aktif</p>
                </div>
              </div>
              <select v-model="settings.sessionTimeout" class="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                <option value="30">30 menit</option>
                <option value="60">1 jam</option>
                <option value="120">2 jam</option>
                <option value="480">8 jam</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Save Settings Button -->
        <div class="flex justify-end">
          <button @click="saveSettings" :disabled="isSaving" class="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50">
            <svg v-if="!isSaving" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div v-else class="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {{ isSaving ? 'Menyimpan...' : 'Simpan Pengaturan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useGuruStore } from '@/stores/guru'
import { useBrandingStore } from '@/stores/branding'
import axios from '@/plugins/axios'

const isSaving = ref(false)

const settings = reactive({
  language: 'id',
  theme: 'light',
  timezone: 'Asia/Jakarta',
  emailNotifications: true,
  pushNotifications: true,
  assessmentReminders: true,
  twoFactorEnabled: false,
  sessionTimeout: '60'
})

const themeStore = useThemeStore();
const authStore = useAuthStore();
const guruStore = useGuruStore();
const brandingStore = useBrandingStore();

const themeValue = computed({
  get() {
    return themeStore.currentTheme;
  },
  set(value) {
    themeStore.setTheme(value);
  }
});

const isDarkMode = computed(() => themeStore.isDarkMode)

// Branding state
const selectedFile = ref(null)
const previewUrl = ref('')
const uploading = ref(false)
const deleting = ref(false)
const sekolahList = ref([])
const selectedSekolahId = ref('')
const brandingError = ref('')
const brandingSuccess = ref('')
const isAdmin = computed(() => authStore.isAdmin)

const resolveCurrentSekolahId = computed(() => {
  // Guru: use currentGuru.id_sekolah if available
  const guruSekolah = guruStore.currentGuru?.id_sekolah
  if (guruSekolah) return guruSekolah
  // Admin: use selected sekolah from dropdown
  if (isAdmin.value) {
    // If admin has idSekolah in user profile, force lock to it
    if (authStore.user?.idSekolah) return authStore.user.idSekolah
    return selectedSekolahId.value || null
  }
  return null
})

onMounted(async () => {
  // Ensure guru profile is loaded (for guru users)
  try {
    if (!guruStore.currentGuru && authStore.user?.id) {
      await guruStore.fetchCurrentGuruFromToken()
    }
  } catch {}

  // For admin, load sekolah list to allow selection
  if (isAdmin.value) {
    try {
      // If admin is locked to one school, we don't need a full list
      if (authStore.user?.idSekolah) {
        selectedSekolahId.value = authStore.user.idSekolah
      } else {
        const res = await axios.get('/list/sekolah')
        sekolahList.value = res?.data?.data || []
        if (!selectedSekolahId.value && sekolahList.value.length) {
          selectedSekolahId.value = sekolahList.value[0].id_sekolah
        }
      }
    } catch (e) {
      console.error('Gagal memuat daftar sekolah:', e)
    }
  }
})

const onFileChange = (e) => {
  brandingError.value = ''
  brandingSuccess.value = ''
  const file = e.target.files?.[0]
  if (!file) {
    selectedFile.value = null
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
    return
  }
  const allowed = ['image/png','image/jpeg','image/jpg','image/gif']
  if (!allowed.includes(file.type)) {
    brandingError.value = 'Format file harus PNG/JPG/GIF'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    brandingError.value = 'Ukuran file maksimal 5MB'
    return
  }
  selectedFile.value = file
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = URL.createObjectURL(file)
}

const uploadLogo = async () => {
  brandingError.value = ''
  brandingSuccess.value = ''
  const idSekolah = resolveCurrentSekolahId.value
  if (!idSekolah) {
    brandingError.value = 'ID Sekolah tidak ditemukan. Untuk Admin, pilih sekolah terlebih dahulu.'
    return
  }
  if (!selectedFile.value) {
    brandingError.value = 'Pilih file logo terlebih dahulu'
    return
  }
  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('logo', selectedFile.value)
    const res = await axios.post(`/upload/sekolah/${idSekolah}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    if (res?.data?.success) {
      brandingSuccess.value = 'Logo berhasil diunggah'
      // Refresh navbar logo via branding store using current user lookup endpoint
      if (authStore.user?.id) await brandingStore.refreshLogoForCurrentUser(authStore.user.id)
      // Reset file input
      selectedFile.value = null
      if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = ''
    } else {
      brandingError.value = res?.data?.message || 'Gagal mengunggah logo'
    }
  } catch (e) {
    brandingError.value = e?.response?.data?.message || e?.message || 'Gagal mengunggah logo'
  } finally {
    uploading.value = false
  }
}

const deleteLogo = async () => {
  brandingError.value = ''
  brandingSuccess.value = ''
  const idSekolah = resolveCurrentSekolahId.value
  if (!idSekolah) {
    brandingError.value = 'ID Sekolah tidak ditemukan.'
    return
  }
  if (!confirm('Hapus logo sekolah?')) return
  deleting.value = true
  try {
    const res = await axios.delete(`/upload/sekolah/${idSekolah}/logo`)
    if ((res.status >= 200 && res.status < 300) && res?.data?.success !== false) {
      brandingSuccess.value = 'Logo berhasil dihapus'
      brandingStore.clearLogo()
    } else {
      brandingError.value = res?.data?.message || 'Gagal menghapus logo'
    }
  } catch (e) {
    brandingError.value = e?.response?.data?.message || e?.message || 'Gagal menghapus logo'
  } finally {
    deleting.value = false
  }
}

const saveSettings = async () => {
  isSaving.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Pengaturan berhasil disimpan!')
  } catch (error) {
    alert('Gagal menyimpan pengaturan: ' + error.message)
  } finally {
    isSaving.value = false
  }
}
</script>
