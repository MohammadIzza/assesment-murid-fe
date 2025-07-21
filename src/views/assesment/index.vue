<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg border border-blue-600 p-8 mb-8 text-white">
        <div class="flex items-center space-x-6">
          <div class="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white mb-2">Assessment</h1>
            <p class="text-blue-100 text-base">Kelola dan buat assessment untuk siswa</p>
          </div>
        </div>
      </div>
    
      <!-- Filter & Action Section -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <!-- Kelas Filter -->
        <select 
          v-model="selectedKelas" 
            class="px-3 py-2 border rounded-lg shadow-md focus:ring-1 focus:ring-blue-400 border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none w-full min-w-[160px]"
            @change="onKelasChange"
          >
            <option value="" disabled selected class="text-gray-400">Pilih Kelas</option>
            <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas" class="text-sm px-2 py-1 text-left">{{ kelas.nama_kelas }}</option>
        </select>
        <!-- Dimensi Filter -->
        <select 
          v-model="selectedDimensi" 
            class="px-3 py-2 border rounded-lg shadow-md focus:ring-1 focus:ring-blue-400 border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none w-full min-w-[160px]"
          @change="onDimensiChange"
        >
            <option value="" disabled selected class="text-gray-400">Pilih Dimensi</option>
            <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi" class="text-sm px-2 py-1 text-left">{{ dimensi.nama_dimensi }}</option>
        </select>
        <!-- Elemen Filter -->
        <select 
          v-model="selectedElemen" 
            class="px-3 py-2 border rounded-lg shadow-md focus:ring-1 focus:ring-blue-400 border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none w-full min-w-[160px]"
          @change="onElemenChange"
          :disabled="!selectedDimensi"
        >
            <option value="" disabled selected class="text-gray-400">Pilih Elemen</option>
            <option v-for="elemen in filteredElemen" :key="elemen.id_elemen" :value="elemen.id_elemen" class="text-sm px-2 py-1 text-left">{{ elemen.nama_elemen }}</option>
        </select>
        <!-- Sub Elemen Filter -->
        <select 
          v-model="selectedSubElemen" 
            class="px-3 py-2 border rounded-lg shadow-md focus:ring-1 focus:ring-blue-400 border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none w-full min-w-[160px]"
          @change="onSubElemenChange"
          :disabled="!selectedElemen"
        >
            <option value="" disabled selected class="text-gray-400">Pilih Sub Elemen</option>
            <option v-for="subElemen in filteredSubElemen" :key="subElemen.id_sub_elemen" :value="subElemen.id_sub_elemen" class="text-sm px-2 py-1 text-left">{{ subElemen.nama_sub_elemen }}</option>
          </select>
          <!-- Dropdown Filter Capaian -->
          <select
            v-model="selectedCapaian"
            :disabled="!selectedSubElemen || capaianList.length === 0"
            class="px-3 py-2 border rounded-lg shadow-md focus:ring-1 focus:ring-blue-400 border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none w-full max-w-xs"
          >
            <option value="" disabled selected>Pilih Capaian</option>
            <option
              v-for="capaian in capaianList"
              :key="capaian.id_capaian"
              :value="capaian.id_capaian"
            >
              {{ capaian.deskripsi }}
            </option>
          </select>
          <!-- Debug visual sementara -->
          <!-- <div style="font-size:12px;color:#888;">CapaianList: {{ capaianList }}</div> -->
      </div>
        <!-- Tombol dan search tetap -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <input 
            v-model="searchQuery"
            type="text"   
            placeholder="Cari assessment..." 
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
          />
          <div class="flex gap-2 mt-2 md:mt-0">
          <button 
            @click="resetFilters" 
            class="px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          >
            Reset Filter
          </button>
          <button 
            @click="openCreateModal" 
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Buat Assessment
          </button>
        </div>
      </div>
      </div>
      <!-- Toast notification below filter -->
      <div v-if="showToast" class="w-full max-w-2xl mx-auto mb-4 text-center">
        <span class="italic text-gray-700 text-base font-medium">{{ toastMessage }}</span>
      </div>
      <!-- Loading Indicator -->
      <div v-if="loading" class="flex justify-center my-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="assessmentList.length === 0" class="bg-white rounded-xl shadow-lg border border-gray-200 p-10 text-center flex flex-col items-center justify-center">
        <div class="rounded-full p-4 mb-4 bg-blue-100">
          <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
        <h3 class="text-lg font-medium mb-1 text-gray-900">Belum ada assessment</h3>
        <p class="mb-4 text-gray-500">Klik tombol "Buat Assessment" untuk membuat assessment baru</p>
          <button 
            @click="openCreateModal" 
          class="text-white font-medium py-2 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200"
          >
            Buat Assessment Sekarang
          </button>
      </div>
      
    </div>
    
    <!-- Assessment Form Modal -->
    <AssesmentFormModal
      v-if="showModal"
      :isEdit="isEditMode"
      :selectedAssessment="selectedAssessment"
      @close="closeModal"
      @save="saveAssessment"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AssesmentFormModal from '@/components/assesment/AssesmentFormModal.vue';
import { useAssesmentStore } from '@/stores/assesment'
import { useAssessmentResultsStore } from '@/stores/assessmentResults'
import { useKelasStore } from '@/stores/kelas'
import { useDimensiStore } from '@/stores/dimensi'
import { useElemenStore } from '@/stores/elemen'
import { useSubElemenStore } from '@/stores/subElemen'
import { useCapaianStore } from '@/stores/capaian'
import { useThemeStore } from '@/stores/theme'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/plugins/axios'

// Initialize stores
const assessmentStore = useAssesmentStore()
const assessmentResultsStore = useAssessmentResultsStore()
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()

// State variables
const loading = ref(true)
const searchQuery = ref('')
const selectedKelas = ref('')
const selectedDimensi = ref('')
const selectedElemen = ref('')
const selectedSubElemen = ref('')
const selectedCapaian = ref('')
const filterStatus = ref('')
const showModal = ref(false)
const isEditMode = ref(false)
const selectedAssessment = ref(null)
const siswaList = ref([])
const nilaiSiswa = ref({})
const kelasList = ref([])
const dimensiList = ref([])
const elemenList = ref([])
const subElemenList = ref([])
const capaianList = ref([])
const notif = ref('')
const notifType = ref('success')
const pengampuMap = ref({})
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
let toastTimeout = null

function showSuccessToast(msg) {
  toastMessage.value = msg
  toastType.value = 'success'
  showToast.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => { showToast.value = false }, 2000)
}
function showErrorToast(msg) {
  toastMessage.value = msg
  toastType.value = 'error'
  showToast.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => { showToast.value = false }, 2000)
}

// Computed properties
const assessmentList = computed(() => assessmentStore.getAssessmentList)
const isDarkMode = computed(() => themeStore.isDarkMode)

const filteredAssessmentList = computed(() => {
  let filtered = [...assessmentList.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(assessment => 
      assessment.nama_kelas?.toLowerCase().includes(query) || 
      assessment.nama_dimensi?.toLowerCase().includes(query) ||
      assessment.nama_elemen?.toLowerCase().includes(query) ||
      assessment.nama_sub_elemen?.toLowerCase().includes(query) ||
      assessment.kompetensi?.toLowerCase().includes(query)
    )
  }
  
  if (selectedKelas.value) {
    filtered = filtered.filter(assessment => 
      assessment.id_kelas == selectedKelas.value
    )
  }
  
  if (selectedDimensi.value) {
    filtered = filtered.filter(assessment => 
      assessment.id_dimensi == selectedDimensi.value
    )
  }
  
  if (selectedElemen.value) {
    filtered = filtered.filter(assessment => 
      assessment.id_elemen == selectedElemen.value
    )
  }
  
  if (selectedSubElemen.value) {
    filtered = filtered.filter(assessment => 
      assessment.id_sub_elemen == selectedSubElemen.value
    )
  }
  
  if (filterStatus.value) {
    filtered = filtered.filter(assessment => 
      assessment.status === filterStatus.value
    )
  }
  
  return filtered
})

const filteredElemen = computed(() =>
  elemenList.value.filter(e => e.id_dimensi == selectedDimensi.value)
)

const filteredSubElemen = computed(() =>
  subElemenList.value.filter(se => se.id_elemen == selectedElemen.value)
)

const filteredCapaian = computed(() =>
  capaianList.value.filter(c => c.id_sub_elemen == selectedSubElemen.value)
)

const isAllFilterSelected = computed(() =>
  selectedKelas.value && selectedDimensi.value && selectedElemen.value && selectedSubElemen.value && selectedCapaian.value
)

const canSaveAssessment = computed(() => {
  if (!isAllFilterSelected.value) return false
  // Semua siswa wajib diisi nilainya
  return siswaList.value.length > 0 && siswaList.value.every(siswa => nilaiSiswa.value[siswa.id_siswa])
})

// Helper functions for fetching names
const getNamaKelas = (id) => {
  const kelas = kelasList.value.find(k => k.id_kelas == id)
  return kelas ? kelas.nama_kelas : 'N/A'
}

const getNamaDimensi = (id) => {
  const dimensi = dimensiList.value.find(d => d.id_dimensi == id)
  return dimensi ? dimensi.nama_dimensi : 'N/A'
}

const getNamaElemen = (id) => {
  const elemen = elemenList.value.find(e => e.id_elemen == id)
  return elemen ? elemen.nama_elemen : 'N/A'
}

const getNamaSubElemen = (id) => {
  const subElemen = subElemenList.value.find(se => se.id_sub_elemen == id)
  return subElemen ? subElemen.nama_sub_elemen : 'N/A'
}

const getNamaCapaian = (id) => {
  const capaian = capaianList.value.find(c => c.id_capaian == id)
  return capaian ? capaian.deskripsi : 'N/A'
}

// Mapping kelas ke id_fase
function getIdFaseFromKelas(namaKelas) {
  // Mapping romawi ke id_fase
  if (/\bI\b|\bII\b|\bIII\b|\bIV\b|\bV\b|\bVI\b|\bVII\b|\bVIII\b|\bIX\b|\bX\b|\bXI\b|\bXII\b/i.test(namaKelas)) {
    if (/\bI\b/i.test(namaKelas)) return 2; // Fase A (Kelas 1)
    if (/\bII\b/i.test(namaKelas)) return 2; // Fase A (Kelas 2)
    if (/\bIII\b/i.test(namaKelas)) return 3; // Fase B (Kelas 3)
    if (/\bIV\b/i.test(namaKelas)) return 3; // Fase B (Kelas 4)
    if (/\bV\b/i.test(namaKelas)) return 4; // Fase C (Kelas 5)
    if (/\bVI\b/i.test(namaKelas)) return 4; // Fase C (Kelas 6)
    if (/\bVII\b/i.test(namaKelas)) return 5; // Fase D (Kelas 7)
    if (/\bVIII\b/i.test(namaKelas)) return 5; // Fase D (Kelas 8)
    if (/\bIX\b/i.test(namaKelas)) return 5; // Fase D (Kelas 9)
    if (/\bX\b/i.test(namaKelas)) return 6; // Fase E (Kelas 10)
    if (/\bXI\b/i.test(namaKelas)) return 7; // Fase F (Kelas 11)
    if (/\bXII\b/i.test(namaKelas)) return 7; // Fase F (Kelas 12)
  }
  return null;
}

// Fetch data methods
const fetchKelasList = async () => {
  try {
    await kelasStore.fetchKelasList()
    kelasList.value = kelasStore.getSortedKelasList || []
    console.debug('Kelas list fetched (sorted):', kelasList.value)
  } catch (error) {
    console.error('Error fetching kelas list:', error)
    kelasList.value = []
  }
}

const fetchDimensiList = async () => {
  try {
    await dimensiStore.fetchDimensiList()
    dimensiList.value = dimensiStore.getDimensiList || []
    console.debug('Dimensi list fetched:', dimensiList.value)
  } catch (error) {
    console.error('Error fetching dimensi list:', error)
    dimensiList.value = []
  }
}

const fetchElemenList = async () => {
  try {
    await elemenStore.fetchElemenList()
    elemenList.value = elemenStore.getElemenList || []
    console.debug('Elemen list fetched:', elemenList.value)
  } catch (error) {
    console.error('Error fetching elemen list:', error)
    elemenList.value = []
  }
}

const fetchSubElemenList = async () => {
  try {
    await subElemenStore.fetchSubElemenList()
    subElemenList.value = subElemenStore.getSubElemenList || []
    console.debug('Sub Elemen list fetched:', subElemenList.value)
  } catch (error) {
    console.error('Error fetching sub elemen list:', error)
    subElemenList.value = []
  }
}

const fetchCapaianList = async (id_fase, id_sub_elemen) => {
  try {
    console.debug('Fetching capaian with params:', { id_fase, id_sub_elemen })
    
    // Gunakan endpoint filter capaian yang sudah berfungsi
    const response = await axios.get(`/filter/capaian?id_fase=${id_fase}&id_sub_elemen=${id_sub_elemen}`)
    
    console.debug('Capaian API response:', response.data)
    
    if (response.data.success) {
      capaianList.value = response.data.data || []
      console.debug('Capaian list fetched:', capaianList.value)
    } else {
      console.warn('No capaian data returned from API')
      capaianList.value = []
    }
  } catch (error) {
    console.error('Error fetching capaian list:', error, { id_fase, id_sub_elemen })
    capaianList.value = []
  }
}

const fetchSiswaList = async (id_kelas) => {
  try {
    const res = await axios.get(`/list/siswa?id_kelas=${id_kelas}`)
    siswaList.value = res.data.success ? res.data.data.filter(siswa => siswa.id_kelas == id_kelas) : []
    console.debug('Siswa list fetched:', siswaList.value)
  } catch (error) {
    console.error('Error fetching siswa list:', error)
    siswaList.value = []
  }
}

const fetchPengampuList = async () => {
  try {
    const res = await axios.get('/list/pengampu')
    if (res.data.success) {
      pengampuMap.value = {}
      res.data.data.forEach(p => {
        pengampuMap.value[p.id_kelas] = p.id_pengampu
      })
    }
  } catch (err) {
    console.error('Error fetching pengampu:', err)
  }
}

const fetchData = async () => {
  loading.value = true
  try {
    await Promise.all([
      assessmentStore.fetchAssessmentList(),
      fetchKelasList(),
      fetchDimensiList(),
      fetchElemenList(),
      fetchSubElemenList(),
      fetchPengampuList() // tambahkan ini
    ])
  } catch (error) {
    console.error('Error fetching initial data:', error)
  } finally {
    loading.value = false
  }
}

// Methods for handling dropdown changes
const onKelasChange = async () => {
  selectedDimensi.value = ''
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
  elemenList.value = []
  subElemenList.value = []
  capaianList.value = []
  siswaList.value = []
  if (selectedKelas.value) {
    await fetchSiswaList(selectedKelas.value)
  }
}

const onDimensiChange = async () => {
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
  subElemenList.value = []
  capaianList.value = []
  if (selectedDimensi.value) {
    try {
      await elemenStore.fetchElemenByDimensi(selectedDimensi.value)
      elemenList.value = elemenStore.getElemenList || []
      console.debug('Filtered elemen list:', elemenList.value)
    } catch (error) {
      console.error('Error fetching elemen list:', error)
    }
  }
}

const onElemenChange = async () => {
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
  capaianList.value = []
  if (selectedElemen.value) {
    try {
      await subElemenStore.fetchSubElemenByElemen(selectedElemen.value)
      subElemenList.value = subElemenStore.getSubElemenList || []
      console.debug('Filtered sub elemen list:', subElemenList.value)
    } catch (error) {
      console.error('Error fetching sub elemen list:', error)
    }
  }
}

const onSubElemenChange = async () => {
  selectedCapaian.value = '';
  capaianList.value = [];
  if (selectedSubElemen.value && selectedKelas.value) {
    const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value);
    const id_fase = getIdFaseFromKelas(kelas?.nama_kelas || '');
    if (id_fase) {
      await fetchCapaianList(id_fase, selectedSubElemen.value);
    } else {
      console.warn('Tidak bisa menentukan id_fase dari kelas:', kelas?.nama_kelas);
    }
  }
};

const onCapaianChange = async () => {
  console.debug('Selected capaian:', selectedCapaian.value)
  
  // Load assessment results jika semua filter sudah dipilih
  if (selectedKelas.value && selectedDimensi.value && selectedElemen.value && selectedSubElemen.value && selectedCapaian.value) {
    const filters = {
      id_kelas: selectedKelas.value,
      id_dimensi: selectedDimensi.value,
      id_elemen: selectedElemen.value,
      id_sub_elemen: selectedSubElemen.value,
      id_capaian: selectedCapaian.value,
      nama_kelas: getNamaKelas(selectedKelas.value),
      nama_dimensi: getNamaDimensi(selectedDimensi.value),
      nama_elemen: getNamaElemen(selectedElemen.value),
      nama_sub_elemen: getNamaSubElemen(selectedSubElemen.value),
      nama_capaian: getNamaCapaian(selectedCapaian.value)
    }
    
    await assessmentResultsStore.loadAssessmentResults(filters)
  }
}

// Other methods
const openCreateModal = () => {
  selectedAssessment.value = null
  isEditMode.value = false
  showModal.value = true
}

const selectAssessment = (assessment) => {
  selectedAssessment.value = assessment
}

const editAssessment = (assessment) => {
  selectedAssessment.value = assessment
  isEditMode.value = true
  showModal.value = true
}

const saveAssessment = async (formData) => {
  try {
    loading.value = true
    if (isEditMode.value) {
      await assessmentStore.updateAssessment(selectedAssessment.value.id_assessment, formData)
    } else {
      await assessmentStore.createAssessment(formData)
    }
    closeModal()
    await fetchData()
  } catch (error) {
    console.error('Error saving assessment:', error)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  isEditMode.value = false
  selectedAssessment.value = null
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const getStatusClass = (status) => {
  if (isDarkMode.value) {
    return status === 'completed' 
      ? 'bg-green-900/30 text-green-300' 
      : 'bg-yellow-900/30 text-yellow-300'
  } else {
    return status === 'completed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800'
  }
}

const getStatusText = (status) => {
  return status === 'completed' ? 'Selesai' : 'Belum Selesai'
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedKelas.value = ''
  selectedDimensi.value = ''
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
  filterStatus.value = ''
  elemenList.value = []
  subElemenList.value = []
  capaianList.value = []
  siswaList.value = []
}

const saveAssessmentResults = async () => {
  try {
    // Siapkan data untuk disimpan
    const filters = {
      id_kelas: selectedKelas.value,
      id_dimensi: selectedDimensi.value,
      id_elemen: selectedElemen.value,
      id_sub_elemen: selectedSubElemen.value,
      id_capaian: selectedCapaian.value,
      nama_kelas: getNamaKelas(selectedKelas.value),
      nama_dimensi: getNamaDimensi(selectedDimensi.value),
      nama_elemen: getNamaElemen(selectedElemen.value),
      nama_sub_elemen: getNamaSubElemen(selectedSubElemen.value),
      nama_capaian: getNamaCapaian(selectedCapaian.value)
    }
    
    const data = {
      siswaList: siswaList.value,
      nilaiSiswa: nilaiSiswa.value,
      filters: filters
    }
    
    // Simpan assessment results
    const result = await assessmentResultsStore.saveAssessmentResult(data)
    
    // Reset nilai form
    nilaiSiswa.value = {}
    
    // Tampilkan pesan sukses
    alert(`Assessment berhasil disimpan! Session ${assessmentResultsStore.getProgress.current}/${assessmentResultsStore.getProgress.max}`)
    
    // Jika sudah mencapai maksimal, tampilkan modus
    if (!assessmentResultsStore.canAddMore()) {
      const modus = assessmentResultsStore.getModus
      alert(`Assessment selesai! Modus: ${modus.nilai} (${modus.count}/${modus.total})`)
    }
    
  } catch (error) {
    console.error('Error saving assessment results:', error)
    alert('Gagal menyimpan assessment: ' + (error.message || 'Unknown error'))
  }
}

const buatAssessmentDanNilai = async () => {
  notif.value = ''
  notifType.value = 'success'
  if (!isAllFilterSelected.value) {
    showErrorToast('Lengkapi semua filter!')
    notif.value = 'Lengkapi semua filter!'
    notifType.value = 'error'
    return
  }
  if (!siswaList.value.every(siswa => nilaiSiswa.value[siswa.id_siswa])) {
    showErrorToast('Semua siswa wajib diisi nilainya!')
    notif.value = 'Semua siswa wajib diisi nilainya!'
    notifType.value = 'error'
    return
  }
  try {
    loading.value = true
    // 1. Buat assessment
    const idCapaianInt = parseInt(selectedCapaian.value)
    const assessmentData = {
      id_capaian: isNaN(idCapaianInt) ? null : idCapaianInt,
      nama_assessment: `${getNamaKelas(selectedKelas.value)} - ${getNamaDimensi(selectedDimensi.value)} - ${getNamaElemen(selectedElemen.value)} - ${getNamaSubElemen(selectedSubElemen.value)}`,
      deskripsi: `Assessment untuk ${getNamaKelas(selectedKelas.value)} pada ${getNamaDimensi(selectedDimensi.value)}`,
      bobot: 1
    }
    // Validasi payload
    if (!assessmentData.id_capaian || !assessmentData.nama_assessment || !assessmentData.deskripsi || !assessmentData.bobot) {
      showErrorToast('Data assessment tidak lengkap!')
      notif.value = 'Data assessment tidak lengkap!'
      notifType.value = 'error'
      loading.value = false
      return
    }
    const res = await axios.post('/add/assessment', assessmentData)
    if (!res.data.success || !res.data.id) throw new Error('Gagal membuat assessment')
    const id_assessment = res.data.id
    // 2. Simpan nilai siswa
    await Promise.all(
      siswaList.value.map(siswa =>
        axios.post('/add/nilai', {
          id_siswa: siswa.id_siswa,
          id_pengampu: pengampuMap.value[siswa.id_kelas],
          id_assessment,
          nilai: nilaiSiswa.value[siswa.id_siswa]
        })
      )
    )
    showSuccessToast('Assessment dan nilai siswa berhasil disimpan!')
    // notif.value = 'Assessment dan nilai siswa berhasil disimpan!'
    notifType.value = 'success'
    resetFilters()
  } catch (err) {
    showErrorToast('Gagal menyimpan assessment/nilai: ' + (err.response?.data?.message || err.message))
    notif.value = 'Gagal menyimpan assessment/nilai: ' + (err.response?.data?.message || err.message)
    notifType.value = 'error'
  } finally {
    loading.value = false
  }
}

// Lifecycle hooks
onMounted(async () => {
  await fetchData()
  // Auto-load assessment jika ada id_assessment di query
  const idAssessment = route.query.id_assessment
  if (idAssessment) {
    try {
      // Fetch detail assessment
      const res = await axios.get(`/list/assessment?id_assessment=${idAssessment}`)
      const ass = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data
      if (ass) {
        // Fetch capaian untuk dapatkan sub elemen, elemen, dimensi
        const capaianRes = await axios.get(`/list/capaian`)
        const capaian = capaianRes.data.data.find(c => c.id_capaian == ass.id_capaian)
        let subElemen, elemen, dimensi
        if (capaian) {
          const subElemenRes = await axios.get(`/list/sub_elemen`)
          subElemen = subElemenRes.data.data.find(se => se.id_sub_elemen == capaian.id_sub_elemen)
          if (subElemen) {
            const elemenRes = await axios.get(`/list/elemen`)
            elemen = elemenRes.data.data.find(e => e.id_elemen == subElemen.id_elemen)
            if (elemen) {
              const dimensiRes = await axios.get(`/list/dimensi`)
              dimensi = dimensiRes.data.data.find(d => d.id_dimensi == elemen.id_dimensi)
            }
          }
        }
        // Fetch nilai untuk assessment ini
        const nilaiRes = await axios.get(`/list/nilai`)
        const nilaiAssessment = nilaiRes.data.data.filter(n => n.id_assessment == ass.id_assessment)
        // Ambil semua id_siswa dari nilai
        const siswaIds = Array.from(new Set(nilaiAssessment.map(n => n.id_siswa)))
        // Fetch siswa untuk kelas yang ditemukan dari nilai (ambil kelas dari siswa pertama)
        const siswaRes = await axios.get(`/list/siswa`)
        const siswaAssessment = siswaRes.data.data.filter(s => siswaIds.includes(s.id_siswa))
        // Set filter otomatis
        if (siswaAssessment.length > 0) {
          selectedKelas.value = siswaAssessment[0].id_kelas
          await fetchSiswaList(selectedKelas.value)
        }
        if (dimensi) selectedDimensi.value = dimensi.id_dimensi
        if (elemen) selectedElemen.value = elemen.id_elemen
        if (subElemen) selectedSubElemen.value = subElemen.id_sub_elemen
        if (capaian) selectedCapaian.value = capaian.id_capaian
        // Set nilai siswa otomatis
        nilaiSiswa.value = {}
        nilaiAssessment.forEach(n => {
          nilaiSiswa.value[n.id_siswa] = n.nilai
        })
      }
    } catch (err) {
      console.error('Gagal auto-load assessment:', err)
    }
  }
})
</script>