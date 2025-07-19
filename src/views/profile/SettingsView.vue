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
import { ref, reactive, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

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

const themeValue = computed({
  get() {
    return themeStore.currentTheme;
  },
  set(value) {
    themeStore.setTheme(value);
  }
});

const isDarkMode = computed(() => themeStore.isDarkMode)

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
