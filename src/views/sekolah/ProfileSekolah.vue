<template>
  <div :class="['min-h-screen py-8 transition-colors duration-300', isDark ? 'bg-dark-background' : 'bg-gray-50']" style="padding-top: 6rem;">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page header -->
      <div class="mb-6 sm:mb-8">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-lg"
               :class="isDark ? 'bg-indigo-600/20 text-indigo-300' : 'bg-blue-50 text-blue-600'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z"/>
            </svg>
          </div>
          <div>
            <h1 :class="['text-2xl sm:text-3xl font-bold', isDark ? 'text-gray-100' : 'text-gray-900']">Profil Sekolah</h1>
            <p :class="['mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-600']">Edit nama, alamat, jenjang, dan NPSN sekolah.</p>
          </div>
        </div>
      </div>

      <!-- Branding Sekolah (Logo) -->
      <div class="mt-6 sm:mt-8" :class="['rounded-2xl shadow-sm border overflow-hidden', isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200']">
        <div :class="['px-6 py-4 border-b flex items-center justify-between', isDark ? 'border-dark-border' : 'border-gray-200']">
          <div>
            <h2 :class="['text-lg font-semibold flex items-center gap-2', isDark ? 'text-gray-100' : 'text-gray-900']">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Branding Sekolah
            </h2>
            <p :class="['text-xs mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500']">Unggah logo sekolah. Logo tampil sebagai ikon di Navbar.</p>
          </div>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <!-- Preview -->
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-xl overflow-hidden flex items-center justify-center border"
                 :class="isDark ? 'border-dark-border bg-gray-800' : 'border-gray-200 bg-gray-50'">
              <img v-if="brandingStore.hasLogo || previewUrl" :src="previewUrl || brandingStore.logoObjectUrl" alt="Logo Sekolah" class="w-full h-full object-cover" />
              <div v-else class="w-10 h-10 flex items-center justify-center rounded bg-blue-600">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p class="mt-3 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">PNG/JPG maks 5MB</p>
          </div>

          <!-- Controls -->
          <div class="md:col-span-2 space-y-4 w-full">
            <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0 w-full">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/gif"
                @change="onFileChange"
                class="block w-full text-sm text-gray-700 file:mr-4 file:h-10 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:leading-none file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                @click="uploadLogo"
                :disabled="!selectedFile || uploading || !resolvedSekolahId"
                class="inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-medium text-white whitespace-nowrap leading-none bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!uploading">Unggah Logo</span>
                <span v-else>Mengunggah...</span>
              </button>
              <button
                v-if="brandingStore.hasLogo"
                @click="deleteLogo"
                :disabled="deleting || !resolvedSekolahId"
                class="inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-medium whitespace-nowrap leading-none border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!deleting">Hapus Logo</span>
                <span v-else>Menghapus...</span>
              </button>
            </div>

            <p v-if="brandingError" class="text-sm text-red-600">{{ brandingError }}</p>
            <p v-if="brandingSuccess" class="text-sm text-green-600">{{ brandingSuccess }}</p>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div :class="['rounded-2xl shadow-sm border overflow-hidden', isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200']">
        <div :class="['px-6 py-4 border-b flex items-center justify-between', isDark ? 'border-dark-border' : 'border-gray-200']">
          <div>
            <h2 :class="['text-lg font-semibold', isDark ? 'text-gray-100' : 'text-gray-900']">Informasi Sekolah</h2>
            <p :class="['text-xs mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500']">Pastikan data sesuai dengan profil Dapodik.</p>
          </div>
          <div v-if="lockedSekolahId" class="hidden sm:flex items-center gap-2 text-xs">
            <span :class="['px-2 py-1 rounded-full', isDark ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-200']">Terkunci</span>
          </div>
        </div>

        <div class="p-6">
          <!-- Skeleton for initial load -->
          <div v-if="!initialLoaded" class="space-y-4 animate-pulse">
            <div class="h-4 w-1/3 rounded" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"></div>
            <div class="h-10 w-full rounded" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"></div>
            <div class="h-4 w-1/4 rounded" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"></div>
            <div class="h-24 w-full rounded" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="h-10 rounded" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"></div>
              <div class="h-10 rounded" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"></div>
            </div>
          </div>

          <!-- Form content -->
          <div v-else class="space-y-6">
            <!-- Admin tanpa idSekolah: pilih sekolah terlebih dahulu -->
            <div v-if="isAdmin && !lockedSekolahId" class="rounded-xl p-4 border"
                 :class="isDark ? 'bg-gray-900/40 border-gray-700' : 'bg-blue-50/60 border-blue-200'">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label :class="['text-sm font-medium', isDark ? 'text-gray-200' : 'text-gray-700']">Pilih Sekolah</label>
                  <p :class="['text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-600']">Untuk admin global, pilih sekolah yang ingin diedit.</p>
                </div>
                <div class="sm:col-span-2">
                  <select v-model="selectedSekolahId" @change="onSelectSekolah" :disabled="loadingList"
                          class="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          :class="isDark ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'">
                    <option disabled value="">-- pilih sekolah --</option>
                    <option v-for="s in sekolahList" :key="s.id_sekolah" :value="s.id_sekolah">{{ s.nama_sekolah || s.nama || ('Sekolah #' + s.id_sekolah) }}</option>
                  </select>
                  <p v-if="loadError" class="text-sm text-red-600 mt-2">{{ loadError }}</p>
                </div>
              </div>
            </div>

            <!-- Locked info already indicated in card header; no extra chip here -->

            <!-- Grid form -->
            <div class="grid grid-cols-1 gap-5">
              <!-- Nama Sekolah -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                <label :class="['text-sm font-medium pt-2', isDark ? 'text-gray-200' : 'text-gray-700']">Nama Sekolah<span class="text-red-500">*</span></label>
                <div class="sm:col-span-2">
                  <input v-model.trim="form.nama_sekolah"
                         type="text"
                         :aria-invalid="!!errors.nama_sekolah"
                         class="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                         :class="[
                           isDark ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400',
                           errors.nama_sekolah ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                         ]"
                         placeholder="Contoh: SDIT Harapan Bangsa" />
                  <p v-if="errors.nama_sekolah" class="mt-1 text-xs text-red-600">{{ errors.nama_sekolah }}</p>
                  <p v-else class="mt-1 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Nama resmi sesuai dokumen sekolah.</p>
                </div>
              </div>

              <!-- Alamat -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                <label :class="['text-sm font-medium pt-2', isDark ? 'text-gray-200' : 'text-gray-700']">Alamat</label>
                <div class="sm:col-span-2">
                  <textarea v-model.trim="form.alamat" rows="3"
                            class="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            :class="isDark ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'"
                            placeholder="Alamat lengkap sekolah"></textarea>
                  <p class="mt-1 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Sertakan nama jalan, nomor, kecamatan/kota.</p>
                </div>
              </div>

              <!-- Jenjang -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                <label :class="['text-sm font-medium pt-2', isDark ? 'text-gray-200' : 'text-gray-700']">Jenjang</label>
                <div class="sm:col-span-2">
                  <select v-model="form.jenjang"
                          class="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          :class="isDark ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'">
                    <option value="">Pilih jenjang</option>
                    <option>SD</option>
                    <option>SMP</option>
                    <option>SMA</option>
                    <option>SMK</option>
                    <option>MI</option>
                    <option>MTs</option>
                    <option>MA</option>
                  </select>
                  <p class="mt-1 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Opsional, pilih bila tersedia.</p>
                </div>
              </div>

              <!-- NPSN -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                <label :class="['text-sm font-medium pt-2', isDark ? 'text-gray-200' : 'text-gray-700']">NPSN</label>
                <div class="sm:col-span-2">
                  <input v-model.trim="form.npsn"
                         type="text"
                         inputmode="numeric"
                         :aria-invalid="!!errors.npsn"
                         class="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                         :class="[
                           isDark ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400',
                           errors.npsn ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                         ]"
                         placeholder="Nomor NPSN (8 digit)" />
                  <p v-if="errors.npsn" class="mt-1 text-xs text-red-600">{{ errors.npsn }}</p>
                  <p v-else class="mt-1 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Opsional. Hanya angka, 8 digit.</p>
                </div>
              </div>
            </div>

            <!-- Alerts -->
            <div v-if="error" class="rounded-lg border px-4 py-3"
                 :class="isDark ? 'bg-red-900/30 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-700'">
              {{ error }}
            </div>
            <div v-if="success" class="rounded-lg border px-4 py-3"
                 :class="isDark ? 'bg-green-900/30 border-green-800 text-green-200' : 'bg-green-50 border-green-200 text-green-700'">
              {{ success }}
            </div>

            <!-- Action bar -->
            <div :class="['flex items-center justify-end gap-3 pt-4 mt-2 border-t', isDark ? 'border-gray-800' : 'border-gray-200']">
              <button
                @click="reload"
                type="button"
                :disabled="saving"
                class="inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap leading-none border"
                :class="isDark ? 'border-gray-600 text-gray-200 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
              >
                Muat Ulang
              </button>
              <button
                @click="save"
                type="button"
                :disabled="saving || !canSave"
                class="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium text-white whitespace-nowrap leading-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                :class="isDark ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-blue-600 hover:bg-blue-700'"
              >
                <svg v-if="saving" class="-ml-0.5 mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>{{ saving ? 'Menyimpan...' : 'Simpan' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import axios from '@/plugins/axios'
import { useAuthStore } from '@/stores/auth'
import { useSekolahScopeStore } from '@/stores/sekolahScope'
import { useBrandingStore } from '@/stores/branding'
import { useThemeStore } from '@/stores/theme'

const authStore = useAuthStore()
const themeStore = useThemeStore()
const sekolahScope = useSekolahScopeStore()
const brandingStore = useBrandingStore()

const isDark = computed(() => themeStore.isDarkMode)
const isAdmin = computed(() => authStore.isAdmin)
const lockedSekolahId = computed(() => authStore.user?.idSekolah || null)

const sekolahList = ref([])
const selectedSekolahId = ref('')
const loadingList = ref(false)

const form = reactive({
  nama_sekolah: '',
  alamat: '',
  jenjang: '',
  npsn: ''
})

const initialLoaded = ref(false)
const loading = ref(false) // legacy; kept for backward compatibility
const saving = ref(false)
const error = ref('')
const success = ref('')
const loadError = ref('')

// Branding (logo) state
const selectedFile = ref(null)
const previewUrl = ref('')
const uploading = ref(false)
const deleting = ref(false)
const brandingError = ref('')
const brandingSuccess = ref('')

const resolvedSekolahId = computed(() => {
  if (lockedSekolahId.value) return lockedSekolahId.value
  return selectedSekolahId.value || null
})

const errors = computed(() => {
  const e = { nama_sekolah: '', npsn: '' }
  if (!form.nama_sekolah || form.nama_sekolah.trim().length < 3) {
    e.nama_sekolah = 'Nama sekolah wajib diisi (min. 3 karakter)'
  }
  if (form.npsn) {
    const onlyDigits = /^\d{8}$/
    if (!onlyDigits.test(form.npsn)) {
      e.npsn = 'NPSN harus 8 digit angka'
    }
  }
  return e
})

const hasErrors = computed(() => Object.values(errors.value).some(Boolean))
const canSave = computed(() => !!resolvedSekolahId.value && !!form.nama_sekolah && !hasErrors.value)

async function loadSekolahList() {
  if (lockedSekolahId.value) return
  loadingList.value = true
  loadError.value = ''
  try {
    const res = await axios.get('/list/sekolah')
    sekolahList.value = res?.data?.data || []
  } catch (e) {
    loadError.value = e?.response?.data?.message || e?.message || 'Gagal memuat daftar sekolah'
  } finally {
    loadingList.value = false
  }
}

async function fetchDetail() {
  const id = resolvedSekolahId.value
  if (!id) return
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    const res = await axios.get(`/view/sekolah/${id}`)
    const data = res?.data?.data || {}
    form.nama_sekolah = data.nama_sekolah || data.nama || ''
    form.alamat = data.alamat || ''
    form.jenjang = data.jenjang || ''
    form.npsn = data.npsn || ''
    // Update scope store for navbar title
    await sekolahScope.setActiveSekolah(parseInt(id), form.nama_sekolah)
  } catch (e) {
    error.value = e?.response?.data?.message || e?.message || 'Gagal memuat data sekolah'
  } finally {
    loading.value = false
    if (!initialLoaded.value) initialLoaded.value = true
  }
}

function onSelectSekolah() {
  fetchDetail()
}

async function save() {
  const id = resolvedSekolahId.value
  if (!id) {
    error.value = 'Pilih sekolah terlebih dahulu'
    return
  }
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    const payload = {
      nama_sekolah: form.nama_sekolah || null,
      alamat: form.alamat || null,
      jenjang: form.jenjang || null,
      npsn: form.npsn || null,
    }
    const res = await axios.put(`/update/sekolah/${id}`, payload)
    if (res?.data?.success) {
      success.value = 'Profil sekolah berhasil disimpan'
      // Refresh scope name after save
      await sekolahScope.setActiveSekolah(parseInt(id), form.nama_sekolah)
    } else {
      error.value = res?.data?.message || 'Gagal menyimpan profil sekolah'
    }
  } catch (e) {
    error.value = e?.response?.data?.message || e?.message || 'Gagal menyimpan profil sekolah'
  } finally {
    saving.value = false
  }
}

function reload() {
  fetchDetail()
}

onMounted(async () => {
  await authStore.initAuth()
  await loadSekolahList()
  // Auto-select if list exists and not locked
  if (!lockedSekolahId.value && sekolahList.value.length && !selectedSekolahId.value) {
    selectedSekolahId.value = sekolahList.value[0].id_sekolah
  }
  await fetchDetail()
})

// Reset alerts on form change
watch(() => ({ ...form }), () => {
  if (error.value) error.value = ''
  if (success.value) success.value = ''
})

// Branding handlers
function onFileChange(e) {
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

async function uploadLogo() {
  brandingError.value = ''
  brandingSuccess.value = ''
  const idSekolah = resolvedSekolahId.value
  if (!idSekolah) {
    brandingError.value = 'Pilih sekolah terlebih dahulu.'
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
      // Refresh navbar logo
      if (authStore.user?.id) await brandingStore.refreshLogoForCurrentUser(authStore.user.id)
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

async function deleteLogo() {
  brandingError.value = ''
  brandingSuccess.value = ''
  const idSekolah = resolvedSekolahId.value
  if (!idSekolah) {
    brandingError.value = 'Pilih sekolah terlebih dahulu.'
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
</script>

<style scoped>
</style>
