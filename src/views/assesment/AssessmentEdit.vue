<template>
  <div class="min-h-screen bg-gray-50 py-8" style="padding-top: 5rem;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="forbidden" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p class="text-yellow-800 font-semibold">Akses ditolak</p>
        <p class="text-yellow-700 text-sm">Anda bukan pengampu kelas ini. Hubungi admin bila ini seharusnya diperbolehkan.</p>
      </div>
      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p class="text-red-600">{{ error }}</p>
      </div>
      
      <div v-else-if="assessment">
        <h1 class="text-2xl font-bold mb-6">Edit Assessment: {{ assessment.nama_assessment }}</h1>
        
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div v-if="!assessment">
            <div class="text-red-600 font-semibold">Assessment tidak ditemukan.</div>
          </div>
          <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <div class="mb-2"><span class="font-semibold text-gray-700">Kelas:</span> <span class="text-gray-800">{{ kelas?.nama_kelas || '-' }}</span></div>
                <div class="mb-2"><span class="font-semibold text-gray-700">Dimensi:</span> <span class="text-gray-800">{{ dimensi?.nama_dimensi || '-' }}</span></div>
                <div class="mb-2"><span class="font-semibold text-gray-700">Elemen:</span> <span class="text-gray-800">{{ elemen?.nama_elemen || '-' }}</span></div>
                <div class="mb-2"><span class="font-semibold text-gray-700">Sub Elemen:</span> <span class="text-gray-800">{{ subElemen?.nama_sub_elemen || '-' }}</span></div>
                <div class="mb-2"><span class="font-semibold text-gray-700">Capaian:</span> <span class="text-gray-800">{{ capaian?.deskripsi || '-' }}</span></div>
              </div>
            </div>

            <h2 class="text-lg font-semibold mb-3 text-blue-600">Edit Nilai Siswa</h2>
            
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-8">
              <div class="inline-flex items-center px-4 py-2 text-blue-600">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat data...
              </div>
            </div>

            <div v-else class="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              <table class="min-w-full text-sm border-separate border-spacing-0 rounded-xl overflow-hidden">
                <thead class="bg-gradient-to-r from-blue-100 to-blue-50">
                  <tr>
                    <th class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200">Nama</th>
                    <th class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200">Kelas</th>
                    <th class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in nilaiSiswaList" :key="row.id_siswa" class="hover:bg-blue-50/50 transition-all duration-200 border-b border-gray-100 last:border-b-0">
                    <td class="px-6 py-4 whitespace-nowrap text-gray-900 text-center font-medium">{{ row.nama }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-900 text-center">{{ row.kelas }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <div class="flex justify-center gap-4">
                        <label v-for="nilaiOption in nilaiOptions" :key="nilaiOption" class="inline-flex items-center cursor-pointer group">
                          <input 
                            type="radio" 
                            :name="`nilai_${row.id_siswa}`" 
                            :value="nilaiOption" 
                            v-model="row.nilai"
                            @change="markAsChanged(row.id_siswa)"
                            :disabled="forbidden"
                            class="sr-only"
                          />
                          <div class="relative">
                            <div class="w-4 h-4 border-2 rounded-full transition-all duration-200" 
                                 :class="row.nilai === nilaiOption 
                                   ? 'border-blue-500 bg-blue-500' 
                                   : 'border-gray-300 group-hover:border-blue-400'">
                              <div v-if="row.nilai === nilaiOption" 
                                   class="absolute inset-1 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <span class="ml-2 text-sm font-medium transition-colors duration-200"
                                :class="row.nilai === nilaiOption 
                                  ? 'text-blue-600' 
                                  : 'text-gray-600 group-hover:text-blue-500'">
                          {{ nilaiOption }}
                          </span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="nilaiSiswaList.length === 0">
                    <td colspan="3" class="text-center text-gray-400 py-8">Belum ada data siswa</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Save Button -->
            <div v-if="nilaiSiswaList.length > 0" class="mt-8 flex justify-center">
              <button 
                @click="saveChanges" 
                :disabled="saving || !hasChanges || forbidden"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                :class="saving || !hasChanges 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'"
              >
                <svg v-if="saving" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                </svg>
                {{ saving ? 'Menyimpan...' : 'Simpan Perubahan' }}
              </button>
            </div>

            <!-- Success/Error Messages -->
            <div v-if="message" class="mt-4 text-center">
              <div class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                   :class="messageType === 'success' 
                     ? 'bg-green-100 text-green-700 border border-green-200' 
                     : 'bg-red-100 text-red-700 border border-red-200'">
                <svg v-if="messageType === 'success'" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                {{ message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/plugins/axios'
import { useAuthStore } from '@/stores/auth'
import { useGuruStore } from '@/stores/guru'

const route = useRoute()
const idAssessment = route.params.id

const assessment = ref(null)
const capaian = ref(null)
const subElemen = ref(null)
const elemen = ref(null)
const dimensi = ref(null)
const kelas = ref(null)
const nilaiSiswaList = ref([])
const originalValues = ref({})
const changedItems = ref(new Set())
const nilaiOptions = ['MB', 'SB', 'BSH', 'SAB']

const loading = ref(true)
const saving = ref(false)
const message = ref('')
const messageType = ref('success')
const error = ref(null)
const forbidden = ref(false)

const hasChanges = computed(() => changedItems.value.size > 0)

const markAsChanged = (idSiswa) => {
  const current = nilaiSiswaList.value.find(item => item.id_siswa === idSiswa)
  if (current && originalValues.value[idSiswa] !== current.nilai) {
    changedItems.value.add(idSiswa)
  } else {
    changedItems.value.delete(idSiswa)
  }
}

const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const saveChanges = async () => {
  if (!hasChanges.value) return
  
  saving.value = true
  
  try {
    const promises = Array.from(changedItems.value).map(async (idSiswa) => {
      const siswa = nilaiSiswaList.value.find(item => item.id_siswa === idSiswa)
      if (siswa) {
        // Assuming there's an API endpoint to update nilai
        // You might need to adjust this based on your actual API structure
        await axios.put(`/update/nilai/${idSiswa}/${idAssessment}`, {
          nilai: siswa.nilai
        })
      }
    })
    
    await Promise.all(promises)
    
    // Update original values and clear changes
    changedItems.value.forEach(idSiswa => {
      const siswa = nilaiSiswaList.value.find(item => item.id_siswa === idSiswa)
      if (siswa) {
        originalValues.value[idSiswa] = siswa.nilai
      }
    })
    changedItems.value.clear()
    
    showMessage(`Berhasil menyimpan ${promises.length} perubahan nilai`, 'success')
  } catch (error) {
    showMessage('Gagal menyimpan perubahan. Silakan coba lagi.', 'error')
  } finally {
    saving.value = false
  }
}

const fetchAssessment = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await axios.get(`/view/assessment/${idAssessment}`)
    
    if (response.data.success) {
      assessment.value = response.data.data
    } else {
      throw new Error(response.data.message || 'Failed to load assessment')
    }
  } catch (err) {
    error.value = err.message || 'Failed to load assessment data'
    assessment.value = null
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  // Resolve access first
  const authStore = useAuthStore()
  const guruStore = useGuruStore()
  if (idAssessment) {
    await fetchAssessment()
  } else {
    error.value = 'No assessment ID provided'
    loading.value = false
  }

  try {
    loading.value = true
    
    // 1. Fetch all assessment, lalu filter
    const allAssRes = await axios.get('/list/assessment')
    assessment.value = allAssRes.data.data.find(a => a.id_assessment == idAssessment)
    if (!assessment.value) {
      showMessage('Assessment tidak ditemukan', 'error')
      return
    }

    // 2. Trace relasi via capaian_kelas -> sub_elemen -> elemen -> dimensi -> kelas
  const ckList = (await axios.get('/list/capaian_kelas')).data.data
    const ck = ckList.find(x => x.id === assessment.value.id_capaian_kelas)
    if (ck) {
      const subElemenList = (await axios.get('/list/sub_elemen')).data.data
      subElemen.value = subElemenList.find(se => se.id_sub_elemen == ck.id_sub_elemen) || null
      const elemenList = (await axios.get('/list/elemen')).data.data
      elemen.value = subElemen.value ? elemenList.find(e => e.id_elemen == subElemen.value.id_elemen) : null
      const dimensiList = (await axios.get('/list/dimensi')).data.data
      dimensi.value = elemen.value ? dimensiList.find(d => d.id_dimensi == elemen.value.id_dimensi) : null
      const kelasList = (await axios.get('/list/kelas')).data.data
      kelas.value = kelasList.find(k => k.id_kelas == ck.id_kelas) || null
      capaian.value = { deskripsi: ck.nama_ck }

      // Access guard: if user is guru and not pengampu of kelas, mark forbidden
      const isAdmin = authStore.isAdmin
      if (!isAdmin) {
        // resolve current guru id
        let currentGuruId = guruStore.getCurrentGuruId
        if (!currentGuruId) {
          try { await guruStore.fetchCurrentGuruFromToken() } catch (e) {}
          currentGuruId = guruStore.getCurrentGuruId
        }
        // load pengampu and check
        const pengRes = await axios.get('/list/pengampu')
        const allowed = (pengRes.data?.data || []).some(p => p.id_guru == currentGuruId && p.id_kelas == ck.id_kelas)
        if (!allowed) {
          forbidden.value = true
        }
      }
    }

    // 3. Fetch nilai & siswa
    const nilaiList = (await axios.get('/list/nilai')).data.data.filter(n => n.id_assessment == idAssessment)
    const siswaList = (await axios.get('/list/siswa')).data.data
    const kelasList = (await axios.get('/list/kelas')).data.data

    nilaiSiswaList.value = nilaiList.map(n => {
      const siswa = siswaList.find(s => s.id_siswa == n.id_siswa)
      const kelasObj = siswa ? kelasList.find(k => k.id_kelas == siswa.id_kelas) : null
      const nilaiValue = n.nilai || 'MB' // default ke MB jika tidak ada nilai
      
      // Store original value
      originalValues.value[n.id_siswa] = nilaiValue
      
      return {
        id_siswa: n.id_siswa,
        nama: siswa?.nama || '-',
        kelas: kelasObj?.nama_kelas || '-',
        nilai: nilaiValue
      }
    })

    // 4. Kelas sudah diset dari capaian_kelas (fallback ke siswa pertama bila belum)
    if (!kelas.value && nilaiSiswaList.value.length > 0) {
      kelas.value = kelasList.find(k => k.nama_kelas == nilaiSiswaList.value[0].kelas)
    }
  } catch (error) {
    showMessage('Gagal memuat data. Silakan refresh halaman.', 'error')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>