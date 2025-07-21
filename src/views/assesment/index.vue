<template>
  <div class="pb-20">
    <!-- Header Section -->
    <div class="bg-blue-700 px-8 py-6 rounded-xl mb-8">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-blue-600 rounded-xl">
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
      <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
        <!-- Kelas Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
          <select 
            v-model="selectedKelas" 
            @change="onKelasChange"
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
          >
            <option value="">Pilih Kelas</option>
            <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas">
              {{ kelas.nama_kelas }}
            </option>
          </select>
        </div>
        
        <!-- Dimensi Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dimensi</label>
          <select 
            v-model="selectedDimensi"
            @change="onDimensiChange" 
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
            :disabled="!selectedKelas"
          >
            <option value="">Pilih Dimensi</option>
            <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
              {{ dimensi.nama_dimensi }}
            </option>
          </select>
        </div>
        
        <!-- Elemen Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Elemen</label>
          <select 
            v-model="selectedElemen"
            @change="onElemenChange" 
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
            :disabled="!selectedDimensi"
          >
            <option value="">Pilih Elemen</option>
            <option v-for="elemen in filteredElemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
              {{ elemen.nama_elemen }}
            </option>
          </select>
        </div>
        
        <!-- Sub Elemen Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Sub Elemen</label>
          <select 
            v-model="selectedSubElemen"
            @change="onSubElemenChange" 
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
            :disabled="!selectedElemen"
          >
            <option value="">Pilih Sub Elemen</option>
            <option v-for="subElemen in filteredSubElemenList" :key="subElemen.id_sub_elemen" :value="subElemen.id_sub_elemen">
              {{ subElemen.nama_sub_elemen }}
            </option>
          </select>
        </div>
        
        <!-- Capaian Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Capaian</label>
          <select 
            v-model="selectedCapaian"
            @change="onCapaianChange" 
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
            :disabled="!selectedSubElemen || capaianList.length === 0"
          >
            <option value="">Pilih Capaian</option>
            <option v-for="capaian in capaianList" :key="capaian.id_capaian" :value="capaian.id_capaian">
              {{ truncateText(capaian.deskripsi, 60) }}
            </option>
          </select>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button 
            @click="resetFilters" 
            class="px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 border-gray-300 bg-white text-gray-700 hover:bg-gray-100 w-full"
          >
            Reset
          </button>
          <button 
            @click="openCreateModal" 
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 justify-center w-full"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Buat
          </button>
        </div>
      </div>
    </div>

    <!-- Buku Penilaian - Muncul ketika kelas dipilih -->
    <div v-if="selectedKelas" class="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 overflow-hidden">
      <div class="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <h2 class="text-xl font-bold">Buku Penilaian: {{ getNamaKelas(selectedKelas) }}</h2>
        <p class="text-blue-100">{{ filterDescription }}</p>
      </div>
      
      <!-- Tabel Penilaian -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-full">
          <!-- Header -->
          <thead>
            <tr class="bg-blue-50">
              <th class="px-6 py-4 border-b-2 border-blue-200 bg-blue-100 sticky left-0 z-10">
                <div class="w-48">
                  <div class="font-bold text-blue-900">SKL</div>
                  <div class="font-bold text-blue-900">NO KD</div>
                  <div class="font-bold text-blue-900">KOMPETENSI</div>
                </div>
              </th>
              <th 
                v-for="(siswa, index) in siswaList" 
                :key="siswa.id_siswa" 
                class="px-4 py-3 font-medium text-gray-700 border-b-2 border-blue-200 whitespace-nowrap text-center"
              >
                <div class="w-20">{{ siswa.nama }}</div>
              </th>
              <th class="px-4 py-3 font-medium text-gray-700 border-b-2 border-blue-200 whitespace-nowrap text-center bg-blue-100">
                <div class="w-16">RATA-RATA</div>
              </th>
              <th class="px-4 py-3 font-medium text-gray-700 border-b-2 border-blue-200 whitespace-nowrap text-center bg-blue-100">
                <div class="w-16">STATUS</div>
              </th>
            </tr>
          </thead>
          
          <!-- Body -->
          <tbody>
            <template v-for="(dimensi, dimIndex) in filteredDimensiList" :key="dimensi.id_dimensi">
              <!-- Dimensi Row -->
              <tr class="bg-green-500 text-white">
                <td colspan="100%" class="px-6 py-3 font-bold sticky left-0">
                  {{ dimensi.nama_dimensi }}
                </td>
              </tr>
              
              <!-- Elemen & Sub Elemen Rows -->
              <template v-for="(elemen, elemIndex) in getElemenForDimensi(dimensi.id_dimensi)" :key="elemen.id_elemen">
                <!-- Elemen Row (optional) -->
                <tr class="bg-emerald-100">
                  <td colspan="100%" class="px-6 py-2 font-medium text-emerald-800 sticky left-0">
                    {{ elemen.nama_elemen }}
                  </td>
                </tr>
                
                <!-- Capaian Rows -->
                <template v-for="(capaian, capIndex) in getCapaianForElemen(elemen.id_elemen)" :key="capaian.id_capaian">
                  <tr :class="{'bg-blue-50': capIndex % 2 === 0}">
                    <!-- Kompetensi -->
                    <td class="px-6 py-4 border-b border-gray-200 sticky left-0 bg-inherit">
                      <div class="font-medium">
                        <div class="text-gray-800">{{ capIndex + 1 }}</div>
                        <div class="text-gray-900">{{ truncateText(capaian.deskripsi, 100) }}</div>
                      </div>
                    </td>
                    
                    <!-- Nilai per Siswa -->
                    <td 
                      v-for="siswa in siswaList" 
                      :key="`${capaian.id_capaian}-${siswa.id_siswa}`"
                      class="px-2 py-2 border-b border-gray-200 text-center"
                    >
                      <div class="inline-flex items-center justify-center w-10 h-10 rounded-full"
                        :class="getNilaiClass(getNilaiSiswa(capaian.id_capaian, siswa.id_siswa))">
                        {{ getNilaiSiswa(capaian.id_capaian, siswa.id_siswa) || '-' }}
                      </div>
                    </td>
                    
                    <!-- Rata-rata -->
                    <td class="px-2 py-2 border-b border-gray-200 text-center font-medium bg-blue-50">
                      {{ calculateRataRata(capaian.id_capaian).toFixed(1) }}
                    </td>
                    
                    <!-- Status -->
                    <td class="px-2 py-2 border-b border-gray-200 text-center font-medium bg-blue-50">
                      <span 
                        :class="{'text-green-600 bg-green-50 border-green-100': calculateRataRata(capaian.id_capaian) >= 3,
                                'text-orange-600 bg-orange-50 border-orange-100': calculateRataRata(capaian.id_capaian) < 3}"
                        class="px-2 py-1 rounded-full text-xs border"
                      >
                        {{ calculateRataRata(capaian.id_capaian) >= 3 ? 'Tuntas' : 'Belum Tuntas' }}
                      </span>
                    </td>
                  </tr>
                </template>
                
                <!-- Sub Elemen Rows (if needed) -->
                <!-- Similar structure as above -->
              </template>
            </template>
            
            <!-- Empty state -->
            <tr v-if="filteredDimensiList.length === 0">
              <td colspan="100%" class="px-6 py-10 text-center text-gray-500">
                {{ selectedDimensi ? 'Tidak ada data capaian yang tersedia.' : 'Pilih dimensi untuk melihat data capaian.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Toast notification -->
    <div v-if="showToast" class="w-full max-w-2xl mx-auto mb-4 text-center">
      <span :class="{'text-green-600': toastType === 'success', 'text-red-600': toastType === 'error'}" 
            class="italic text-base font-medium">
        {{ toastMessage }}
      </span>
    </div>

    <!-- Assessment List Section (keep it for reference) -->
    <div v-if="!selectedKelas && filteredAssessmentList.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        v-for="assessment in filteredAssessmentList" 
        :key="assessment.id_assessment" 
        class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
      >
        <h3 class="text-lg font-bold text-gray-800 mb-4">{{ assessment.nama_assessment }}</h3>
        <div class="space-y-2 mb-6">
          <div class="flex items-start">
            <span class="text-gray-500 w-24 flex-shrink-0">Kelas:</span>
            <span class="text-gray-800 font-medium">{{ getNamaKelas(assessment.id_kelas) }}</span>
          </div>
          <div class="flex items-start">
            <span class="text-gray-500 w-24 flex-shrink-0">Dimensi:</span>
            <span class="text-gray-800 font-medium">{{ getNamaDimensi(assessment.id_dimensi) }}</span>
          </div>
          <div class="flex items-start">
            <span class="text-gray-500 w-24 flex-shrink-0">Elemen:</span>
            <span class="text-gray-800 font-medium">{{ getNamaElemen(assessment.id_elemen) }}</span>
          </div>
          <div class="flex items-start">
            <span class="text-gray-500 w-24 flex-shrink-0">Sub Elemen:</span>
            <span class="text-gray-800 font-medium">{{ getNamaSubElemen(assessment.id_sub_elemen) }}</span>
          </div>
          <div class="flex items-start">
            <span class="text-gray-500 w-24 flex-shrink-0">Capaian:</span>
            <span class="text-gray-800 font-medium">{{ truncateText(getNamaCapaian(assessment.id_capaian), 100) }}</span>
          </div>
        </div>
        <div class="flex space-x-3">
          <router-link
            :to="{ name: 'assesment-detail', query: { id_assessment: assessment.id_assessment } }"
            class="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Detail
          </router-link>
          <button
            @click="editAssessment(assessment)"
            class="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors duration-200"
          >
            Ubah
          </button>
          <button
            @click="deleteAssessment(assessment.id_assessment)"
            class="px-3 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors duration-200"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- No results -->
    <div v-if="!selectedKelas && !loading && filteredAssessmentList.length === 0" class="text-center py-10">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-700 mb-1">Belum ada assessment</h3>
      <p class="text-gray-500 mb-6">Silakan buat assessment baru untuk mulai menilai siswa.</p>
      <button 
        @click="openCreateModal" 
        class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Buat Assessment
      </button>
    </div>

    <!-- Keep the modal component -->
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
import { ref, computed, watch, onMounted } from 'vue';
import AssesmentFormModal from '@/components/assesment/AssesmentFormModal.vue';
import { useAssesmentStore } from '@/stores/assesment'
import { useKelasStore } from '@/stores/kelas'
import { useDimensiStore } from '@/stores/dimensi'
import { useElemenStore } from '@/stores/elemen'
import { useSubElemenStore } from '@/stores/subElemen'
import { useCapaianStore } from '@/stores/capaian'
import { useThemeStore } from '@/stores/theme'
import axios from '@/plugins/axios'

// Store initialization
const assessmentStore = useAssesmentStore()
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()
const themeStore = useThemeStore()

// State variables
const loading = ref(false)
const searchQuery = ref('')
const showModal = ref(false)
const isEditMode = ref(false)
const selectedAssessment = ref(null)
const kelasList = ref([])
const dimensiList = ref([])
const elemenList = ref([])
const subElemenList = ref([])
const capaianList = ref([])
const siswaList = ref([])
const nilaiSiswa = ref({}) // {id_capaian: {id_siswa: nilai}}
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
let toastTimeout = null

// Filter selections
const selectedKelas = ref('')
const selectedDimensi = ref('')
const selectedElemen = ref('')
const selectedSubElemen = ref('')
const selectedCapaian = ref('')

// Computed for filter description
const filterDescription = computed(() => {
  const parts = []
  
  if (selectedDimensi.value) {
    parts.push(`Dimensi: ${getNamaDimensi(selectedDimensi.value)}`)
  }
  
  if (selectedElemen.value) {
    parts.push(`Elemen: ${getNamaElemen(selectedElemen.value)}`)
  }
  
  if (selectedSubElemen.value) {
    parts.push(`Sub Elemen: ${getNamaSubElemen(selectedSubElemen.value)}`)
  }
  
  if (selectedCapaian.value) {
    parts.push(`Capaian: ${truncateText(getNamaCapaian(selectedCapaian.value), 40)}`)
  }
  
  return parts.length > 0 ? parts.join(' • ') : 'Menampilkan semua data penilaian'
})

// Helper functions
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
  toastTimeout = setTimeout(() => { showToast.value = false }, 3000)
}

function truncateText(text, maxLength) {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Computed properties
const filteredAssessmentList = computed(() => {
  const list = assessmentStore.getAssessmentList
  if (!list.length) return []

  // Apply filters
  let filtered = list
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(assessment => 
      (assessment.nama_assessment && assessment.nama_assessment.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

const filteredElemenList = computed(() => {
  if (!selectedDimensi.value) return []
  return elemenList.value.filter(e => e.id_dimensi == selectedDimensi.value)
})

const filteredSubElemenList = computed(() => {
  if (!selectedElemen.value) return []
  return subElemenList.value.filter(se => se.id_elemen == selectedElemen.value)
})

const filteredDimensiList = computed(() => {
  if (!selectedKelas.value) return []
  
  let filtered = dimensiList.value

  if (selectedDimensi.value) {
    filtered = filtered.filter(d => d.id_dimensi == selectedDimensi.value)
  }
  
  return filtered
})

const isAllFilterSelected = computed(() => {
  return selectedKelas.value && selectedDimensi.value && 
         selectedElemen.value && selectedSubElemen.value && selectedCapaian.value
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

// Functions for grade book table
const getElemenForDimensi = (id_dimensi) => {
  if (!id_dimensi) return []
  
  let filtered = elemenList.value.filter(e => e.id_dimensi == id_dimensi)
  
  if (selectedElemen.value) {
    filtered = filtered.filter(e => e.id_elemen == selectedElemen.value)
  }
  
  return filtered
}

const getCapaianForElemen = (id_elemen) => {
  if (!id_elemen) return []
  
  // We need to find all capaian related to this elemen through sub_elemen
  const relevantSubElems = subElemenList.value.filter(se => se.id_elemen == id_elemen)
  
  if (selectedSubElemen.value) {
    const filteredSubElems = relevantSubElems.filter(se => se.id_sub_elemen == selectedSubElemen.value)
    
    // If no matching sub_elems, return empty
    if (filteredSubElems.length === 0) return []
    
    // Get capaian for these sub_elems
    let filtered = []
    
    filteredSubElems.forEach(se => {
      const capaianForSubElem = capaianList.value.filter(c => c.id_sub_elemen == se.id_sub_elemen)
      filtered = [...filtered, ...capaianForSubElem]
    })
    
    if (selectedCapaian.value) {
      filtered = filtered.filter(c => c.id_capaian == selectedCapaian.value)
    }
    
    return filtered
  }
  
  // If no sub_elemen filter, get all capaian for all sub_elemens of this elemen
  let allCapaian = []
  relevantSubElems.forEach(se => {
    const capaianForSubElem = capaianList.value.filter(c => c.id_sub_elemen == se.id_sub_elemen)
    allCapaian = [...allCapaian, ...capaianForSubElem]
  })
  
  if (selectedCapaian.value) {
    allCapaian = allCapaian.filter(c => c.id_capaian == selectedCapaian.value)
  }
  
  return allCapaian
}

const getNilaiSiswa = (id_capaian, id_siswa) => {
  // Check if we have assessment data for this combination
  if (!nilaiSiswa.value[id_capaian]) return null
  return nilaiSiswa.value[id_capaian][id_siswa] || null
}

const getNilaiClass = (nilai) => {
  if (!nilai) return 'bg-gray-100 text-gray-400'
  
  switch (nilai) {
    case '1':
    case 1:
    case 'MB':
      return 'bg-red-100 text-red-700'
    case '2':
    case 2:
    case 'SB':
      return 'bg-yellow-100 text-yellow-700'
    case '3':
    case 3:
    case 'BSH':
      return 'bg-blue-100 text-blue-700'
    case '4':
    case 4:
    case 'SAB':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}

const calculateRataRata = (id_capaian) => {
  if (!nilaiSiswa.value[id_capaian]) return 0
  
  const nilai = Object.values(nilaiSiswa.value[id_capaian])
  const validNilai = nilai.filter(n => n !== null && n !== undefined)
  
  if (validNilai.length === 0) return 0
  
  // Convert string values to numbers if needed
  const numericValues = validNilai.map(n => {
    if (typeof n === 'string') {
      if (n === 'MB') return 1
      if (n === 'SB') return 2
      if (n === 'BSH') return 3
      if (n === 'SAB') return 4
      return parseFloat(n) || 0
    }
    return n || 0
  })
  
  const sum = numericValues.reduce((total, num) => total + num, 0)
  return sum / numericValues.length
}

// Fetch data functions
const fetchKelasList = async () => {
  try {
    await kelasStore.fetchKelasList()
    kelasList.value = kelasStore.getKelasList || []
  } catch (error) {
    console.error('Error fetching kelas list:', error)
  }
}

const fetchDimensiList = async () => {
  try {
    await dimensiStore.fetchDimensiList()
    dimensiList.value = dimensiStore.getDimensiList || []
  } catch (error) {
    console.error('Error fetching dimensi list:', error)
  }
}

const fetchElemenList = async () => {
  try {
    await elemenStore.fetchElemenList()
    elemenList.value = elemenStore.getElemenList || []
  } catch (error) {
    console.error('Error fetching elemen list:', error)
  }
}

const fetchSubElemenList = async () => {
  try {
    await subElemenStore.fetchSubElemenList()
    subElemenList.value = subElemenStore.getSubElemenList || []
  } catch (error) {
    console.error('Error fetching sub elemen list:', error)
  }
}

const fetchCapaianList = async (id_fase, id_sub_elemen) => {
  try {
    const response = await axios.get(`/filter/capaian?id_fase=${id_fase}&id_sub_elemen=${id_sub_elemen}`)
    if (response.data.success) {
      capaianList.value = response.data.data || []
    } else {
      capaianList.value = []
    }
  } catch (error) {
    console.error('Error fetching capaian list:', error)
    capaianList.value = []
  }
}

const fetchSiswaByKelas = async (id_kelas) => {
  try {
    const response = await axios.get(`/list/siswa?id_kelas=${id_kelas}`)
    if (response.data.success) {
      siswaList.value = response.data.data.filter(siswa => siswa.id_kelas == id_kelas) || []
    } else {
      siswaList.value = []
    }
  } catch (error) {
    console.error('Error fetching siswa list:', error)
    siswaList.value = []
  }
}

const fetchNilaiSiswa = async () => {
  if (!selectedKelas.value) return
  
  try {
    // Fetch all assessments for this kelas
    const response = await axios.get(`/list/assessment?id_kelas=${selectedKelas.value}`)
    
    if (response.data.success) {
      const assessments = response.data.data || []
      const nilaiData = {}
      
      // Process assessment data
      assessments.forEach(assessment => {
        if (!assessment.nilai) return
        
        // Initialize capaian entry if needed
        if (!nilaiData[assessment.id_capaian]) {
          nilaiData[assessment.id_capaian] = {}
        }
        
        // Add student scores to the data structure
        Object.entries(assessment.nilai).forEach(([id_siswa, nilai]) => {
          nilaiData[assessment.id_capaian][id_siswa] = nilai
        })
      })
      
      nilaiSiswa.value = nilaiData
    }
  } catch (error) {
    console.error('Error fetching nilai siswa:', error)
  }
}

// Get id_fase from kelas name
function getIdFaseFromKelas(namaKelas) {
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

const fetchAllCapaianForKelas = async () => {
  if (!selectedKelas.value) return
  
  const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value)
  if (!kelas) return
  
  const id_fase = getIdFaseFromKelas(kelas.nama_kelas)
  if (!id_fase) return
  
  try {
    // Fetch all capaian for this fase
    const response = await axios.get(`/list/capaian?id_fase=${id_fase}`)
    if (response.data.success) {
      capaianList.value = response.data.data || []
    } else {
      capaianList.value = []
    }
  } catch (error) {
    console.error('Error fetching capaian list:', error)
    capaianList.value = []
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
      fetchSubElemenList()
    ])
  } catch (error) {
    console.error('Error fetching initial data:', error)
  } finally {
    loading.value = false
  }
}

// Filter change handlers
const onKelasChange = async () => {
  // Reset dependent filters
  selectedDimensi.value = ''
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
  
  if (selectedKelas.value) {
    await Promise.all([
      fetchSiswaByKelas(selectedKelas.value),
      fetchAllCapaianForKelas(),
      fetchNilaiSiswa()
    ])
  }
}

const onDimensiChange = () => {
  // Reset dependent filters
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
}

const onElemenChange = () => {
  // Reset dependent filters
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
}

const onSubElemenChange = async () => {
  // Reset capaian
  selectedCapaian.value = ''
  
  if (selectedSubElemen.value && selectedKelas.value) {
    const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value)
    if (kelas) {
      const id_fase = getIdFaseFromKelas(kelas.nama_kelas)
      if (id_fase) {
        await fetchCapaianList(id_fase, selectedSubElemen.value)
      }
    }
  }
}

const onCapaianChange = () => {
  // Any additional logic when capaian is selected
}

const resetFilters = () => {
  selectedKelas.value = ''
  selectedDimensi.value = ''
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
}

// Modal methods
const openCreateModal = () => {
  if (isAllFilterSelected.value) {
    selectedAssessment.value = {
      nama_assessment: '',
      id_kelas: selectedKelas.value,
      id_dimensi: selectedDimensi.value,
      id_elemen: selectedElemen.value,
      id_sub_elemen: selectedSubElemen.value,
      id_capaian: selectedCapaian.value,
      nilai: {}
    }
  } else {
    selectedAssessment.value = {
      nama_assessment: '',
      id_kelas: '',
      id_dimensi: '',
      id_elemen: '',
      id_sub_elemen: '',
      id_capaian: '',
      nilai: {}
    }
  }
  
  isEditMode.value = false
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const editAssessment = (assessment) => {
  selectedAssessment.value = { ...assessment }
  isEditMode.value = true
  showModal.value = true
}

const deleteAssessment = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus assessment ini?')) return
  
  try {
    loading.value = true
    await assessmentStore.deleteAssessment(id)
    showSuccessToast('Assessment berhasil dihapus')
  } catch (error) {
    console.error('Error deleting assessment:', error)
    showErrorToast('Gagal menghapus assessment: ' + (error.message || 'Unknown error'))
  } finally {
    loading.value = false
  }
}

const saveAssessment = async (formData) => {
  try {
    loading.value = true
    if (isEditMode.value) {
      await assessmentStore.updateAssessment(selectedAssessment.value.id_assessment, formData)
      showSuccessToast('Assessment berhasil diperbarui')
    } else {
      await assessmentStore.createAssessment(formData)
      showSuccessToast('Assessment baru berhasil dibuat')
    }
    closeModal()
    await fetchData()
    // Also refresh nilai data if we're looking at a class
    if (selectedKelas.value) {
      await fetchNilaiSiswa()
    }
  } catch (error) {
    console.error('Error saving assessment:', error)
    showErrorToast('Gagal menyimpan assessment: ' + (error.message || 'Unknown error'))
  } finally {
    loading.value = false
  }
}

// Watch for changes in filters to update data
watch(selectedKelas, () => {
  if (selectedKelas.value) {
    onKelasChange()
  }
})

// On component mount
onMounted(async () => {
  await fetchData()
})
</script>