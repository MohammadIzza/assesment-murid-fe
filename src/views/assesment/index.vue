<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="bg-blue-700 px-8 py-6 rounded-xl mb-8">
      <div class="flex items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white mb-2">Assessment</h1>
          <p class="text-blue-100 text-base">Kelola dan buat assessment untuk siswa</p>
        </div>
      </div>
    </div>
  
    <!-- Filter & Action Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
        <!-- Kelas Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kelas</label>
          <select 
            v-model="selectedKelas" 
            @change="onKelasChange"
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="">Pilih Kelas</option>
            <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas">
              {{ kelas.nama_kelas }}
            </option>
          </select>
        </div>
        
        <!-- Dimensi Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dimensi</label>
          <select 
            v-model="selectedDimensi"
            @change="onDimensiChange" 
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="">Pilih Dimensi</option>
            <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
              {{ dimensi.nama_dimensi }}
            </option>
          </select>
        </div>
        
        <!-- Elemen Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Elemen</label>
          <select 
            v-model="selectedElemen"
            @change="onElemenChange" 
            :disabled="!selectedDimensi"
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="">Pilih Elemen</option>
            <option v-for="elemen in filteredElemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
              {{ elemen.nama_elemen }}
            </option>
          </select>
        </div>
        
        <!-- Sub Elemen Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sub Elemen</label>
          <select 
            v-model="selectedSubElemen"
            @change="onSubElemenChange" 
            :disabled="!selectedElemen"
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="">Pilih Sub Elemen</option>
            <option v-for="subElemen in filteredSubElemenList" :key="subElemen.id_sub_elemen" :value="subElemen.id_sub_elemen">
              {{ subElemen.nama_sub_elemen }}
            </option>
          </select>
        </div>
        
        <!-- Capaian Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capaian</label>
          <select 
            v-model="selectedCapaian"
            @change="onCapaianChange" 
            :disabled="!selectedSubElemen"
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
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
            @click="openCreateModal"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Buat
          </button>
        </div>
      </div>
    </div>

    <!-- Message when no class is selected -->
    <div v-if="!selectedKelas" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">Pilihlah Kelas terlebih dahulu!</h3>
      <p class="text-gray-500 dark:text-gray-400">Anda harus memilih kelas untuk melihat dan mengelola penilaian siswa.</p>
    </div>

    <!-- Buku Penilaian - Muncul ketika kelas dipilih -->
    <div v-if="selectedKelas" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden">
      <div class="p-6 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white">
        <h2 class="text-xl font-bold">Buku Penilaian: {{ getNamaKelas(selectedKelas) }}</h2>
        <p class="text-blue-100">{{ filterDescription }}</p>
      </div>
      
      <!-- Tabel Penilaian dengan Styling yang Ditingkatkan -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-full border-collapse">
          <!-- Header -->
          <thead>
            <tr class="bg-gray-800 text-white border-b border-gray-600">
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-16 border-r border-gray-700">Dimensi</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-12 border-r border-gray-700">Elemen</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-16 border-r border-gray-700">SKL</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-700">Kompetensi</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-16 border-r border-gray-700 bg-gray-700">Capaian Kelas</th>
              
              <!-- Student headers - Dynamic based on loaded students -->
              <template v-for="siswa in siswaList" :key="siswa.id_siswa">
                <th :colspan="7" class="text-center border-l border-gray-700">
                  <div class="px-2 py-3 text-xs font-semibold">
                    {{ siswa.nama }}
                  </div>
                  <div class="flex border-t border-gray-700">
                    <div v-for="n in 6" :key="n" class="flex-1 px-1 py-2 text-xs border-r last:border-r-0 border-gray-700">{{ n }}</div>
                    <div class="flex-1 px-1 py-2 text-xs font-semibold bg-gray-700">M</div>
                  </div>
                </th>
              </template>
            </tr>
          </thead>
          
          <!-- Body -->
          <tbody>
            <!-- For each dimensi -->
            <template v-for="(dimensi, dimIndex) in filteredDimensiList" :key="dimensi.id_dimensi">
              <!-- Dimensi header row with colored background -->
              <tr class="bg-green-600 dark:bg-green-800 text-white">
                <td colspan="100%" class="px-4 py-3 font-semibold">
                  {{ dimensi.nama_dimensi }}
                </td>
              </tr>
              
              <!-- For each elemen in this dimensi -->
              <template v-for="(elemen, elemIndex) in getElemenForDimensi(dimensi.id_dimensi)" :key="elemen.id_elemen">
                <!-- Elemen Header Row -->
                <tr class="bg-gray-100 dark:bg-gray-700">
                  <!-- Elemen identifier (A, B, C, etc.) -->
                  <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-lg font-bold text-green-700 dark:text-green-300">
                    {{ String.fromCharCode(65 + elemIndex) }}
                  </td>
                  
                  <!-- Elemen Name -->
                  <td colspan="4" class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-300">
                    {{ elemen.nama_elemen }}
                  </td>
                  
                  <!-- Empty cells for student columns -->
                  <td :colspan="siswaList.length * 7" class="border border-gray-300 dark:border-gray-700"></td>
                </tr>
                
                <!-- Sub-Elemen (SKL) and Capaian (Kompetensi) Rows -->
                <template v-for="(subElemen, subIndex) in getSubElemenForElemen(elemen.id_elemen)" :key="subElemen.id_sub_elemen">
                  <!-- For each capaian in this sub-elemen -->
                  <template v-for="(capaian, capIndex) in getCapaianForSubElemen(subElemen.id_sub_elemen)" :key="capaian.id_capaian">
                    <tr class="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-blue-950">
                      <!-- Empty cell for elemen identifier column -->
                      <td class="border border-gray-300 dark:border-gray-700"></td>
                      
                      <!-- SKL Number (incrementing counter) -->
                      <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-medium text-center text-gray-800 dark:text-gray-300">
                        {{ subIndex + 1 }}
                      </td>
                      
                      <!-- SKL Name -->
                      <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                        {{ subElemen.nama_sub_elemen }}
                      </td>
                      
                      <!-- Kompetensi Description -->
                      <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                        {{ capaian.deskripsi }}
                      </td>
                      
                      <!-- Additional empty column for spacing -->
                      <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-300"></td>
                      
                      <!-- Student assessment cells -->
                      <template v-for="siswa in siswaList" :key="`${capaian.id_capaian}-${siswa.id_siswa}`">
                        <!-- Assessment values (1-6) -->
                        <td v-for="n in 6" :key="`${capaian.id_capaian}-${siswa.id_siswa}-${n}`" 
                            @click="editNilai(capaian, siswa, n)"
                            class="border border-gray-300 dark:border-gray-700 w-12 text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-black dark:hover:text-white">
                          <div v-if="getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n)" 
                               :class="getNilaiClass(getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n))" 
                               class="m-1 py-1 px-1 font-medium rounded-full flex items-center justify-center h-8 w-8 mx-auto">
                          {{ getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n) }}
                          </div>
                          <div v-else class="m-1 py-1 px-1 text-gray-400 dark:text-gray-600">-</div>
                        </td>
                        
                        <!-- Modus value -->
                        <td class="border border-gray-300 dark:border-gray-700 w-12 bg-gray-100 dark:bg-gray-600 text-center">
                          <div v-if="getModusNilai(capaian.id_capaian, siswa.id_siswa)" 
                               :class="getNilaiClass(getModusNilai(capaian.id_capaian, siswa.id_siswa))" 
                               class="m-1 py-1 px-1 font-medium rounded-full flex items-center justify-center h-8 w-8 mx-auto">
                          {{ getModusNilai(capaian.id_capaian, siswa.id_siswa) }}
                          </div>
                          <div v-else class="m-1 py-1 px-1 text-gray-400 dark:text-gray-600">-</div>
                        </td>
                      </template>
                    </tr>
                  </template>
                </template>
                
                <!-- Average Row for each Elemen -->
                <tr class="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-200 dark:border-blue-800">
                  <td colspan="3" class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-300">
                    Modus Per Elemen
                  </td>
                  
                  <!-- Empty cell for capaian column -->
                  <td class="border border-gray-300 dark:border-gray-700"></td>
                  
                  <!-- Additional empty cell for spacing column -->
                  <td class="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-750"></td>
                  
                  <!-- Average for each student -->
                  <template v-for="siswa in siswaList" :key="`avg-${elemen.id_elemen}-${siswa.id_siswa}`">
                    <td colspan="6" class="border border-gray-300 dark:border-gray-700 text-center text-sm font-medium text-gray-800 dark:text-gray-300 py-3">
                      {{ calculateAvgForElemenAndSiswa(elemen.id_elemen, siswa.id_siswa).toFixed(1) }}
                    </td>
                    <td class="border border-gray-300 dark:border-gray-700 w-12 bg-gray-100 dark:bg-gray-600 text-center">
                      <div v-if="getElemenModusForSiswa(elemen.id_elemen, siswa.id_siswa)" 
                           :class="getNilaiClass(getElemenModusForSiswa(elemen.id_elemen, siswa.id_siswa))" 
                           class="m-1 py-1 px-1 font-medium rounded-full flex items-center justify-center h-8 w-8 mx-auto">
                        {{ getElemenModusForSiswa(elemen.id_elemen, siswa.id_siswa) }}
                      </div>
                      <div v-else class="m-1 py-1 px-1 text-gray-400 dark:text-gray-600">-</div>
                    </td>
                  </template>
                </tr>
              </template>
            </template>
            
            <!-- Empty state -->
            <tr v-if="filteredDimensiList.length === 0">
              <td colspan="100%" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                Tidak ada data penilaian yang sesuai dengan filter. Silakan ubah filter atau tambahkan assessment baru.
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

    <!-- Keep the modal component -->
    <AssesmentFormModal
      v-if="showModal"
      :isEdit="isEditMode"
      :selectedAssessment="selectedAssessment"
      @close="closeModal"
      @save="saveAssessment"
    />
    </div>
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
import { useAuthStore } from '@/stores/auth'
import axios from '@/plugins/axios'

// Store initialization
const assessmentStore = useAssesmentStore()
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()
const themeStore = useThemeStore()
const authStore = useAuthStore()

// State variables
const loading = ref(false)
const searchQuery = ref('')
const showModal = ref(false)
const isEditMode = ref(false)
const selectedAssessment = ref(null)
// GANTI: kelasList pakai computed agar reactive ke store
const kelasList = computed(() => kelasStore.getKelasList)
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

// New data structure for storing assessment values
const assessmentValues = ref({}) // {id_capaian: {id_siswa: {assessmentNumber: nilai}}}

// Track current editing assessment
const currentEditingAssessment = ref({
  capaian: null,
  siswa: null,
  assessmentNumber: null
})

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
  if (!id_elemen || !selectedKelas.value) return [];
  
  // Get all sub-elemens for this elemen
  const relevantSubElems = getSubElemenForElemen(id_elemen);
  if (relevantSubElems.length === 0) return [];
  
  // Get the fase from the selected kelas
  const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value);
  if (!kelas) return [];
  
  const id_fase = getIdFaseFromKelas(kelas.nama_kelas);
  if (!id_fase) return [];
  
  // Get all capaian for all sub-elemens of this elemen, filtered by fase
  let allCapaian = [];
  relevantSubElems.forEach(se => {
    const capaianForSubElem = capaianList.value.filter(c => 
      c.id_sub_elemen == se.id_sub_elemen && 
      c.id_fase == id_fase
    );
    allCapaian = [...allCapaian, ...capaianForSubElem];
  });
  
  // Additional filter if a specific capaian is selected
  if (selectedCapaian.value) {
    allCapaian = allCapaian.filter(c => c.id_capaian == selectedCapaian.value);
  }
  
  return allCapaian;
}

// Functions for new assessment table
const getNilaiForAssessment = (id_capaian, id_siswa, assessmentNumber) => {
  if (!assessmentValues.value[id_capaian] ||
      !assessmentValues.value[id_capaian][id_siswa] ||
      !assessmentValues.value[id_capaian][id_siswa][assessmentNumber]) {
    return null;
  }
  
  return assessmentValues.value[id_capaian][id_siswa][assessmentNumber];
}

const getModusNilai = (id_capaian, id_siswa) => {
  if (!assessmentValues.value[id_capaian] || !assessmentValues.value[id_capaian][id_siswa]) {
    return null;
  }
  
  // Get all values for this capaian and student
  const values = Object.values(assessmentValues.value[id_capaian][id_siswa]).filter(Boolean);
  
  if (values.length === 0) return null;
  
  // Convert values to numeric for proper comparison
  const numericValues = values.map(val => {
    if (typeof val === 'number') return val;
    if (val === 'MB') return 1;
    if (val === 'SB') return 2;
    if (val === 'BSH') return 3;
    if (val === 'SAB') return 4;
    if (typeof val === 'string' && !isNaN(Number(val))) {
      return Number(val);
    }
    return 0;
  });
  
  // Calculate mode (most frequent value)
  const counts = {};
  let maxCount = 0;
  
  numericValues.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
    if (counts[value] > maxCount) {
      maxCount = counts[value];
    }
  });
  
  // Find all values with the maximum count
  const modesWithMaxCount = Object.keys(counts)
    .filter(key => counts[key] === maxCount)
    .map(key => Number(key));
  
  // If there are multiple modes with the same count, take the highest value
  const finalModus = Math.max(...modesWithMaxCount);
  
  // Convert back to original format
  if (finalModus === 1) return 'MB';
  if (finalModus === 2) return 'SB';
  if (finalModus === 3) return 'BSH';
  if (finalModus === 4) return 'SAB';
  
  return finalModus;
}

const getElemenModusForSiswa = (id_elemen, id_siswa) => {
  // Get all capaian for this elemen
  const capaians = getCapaianForElemen(id_elemen);
  if (capaians.length === 0) return null;
  
  // Get mode values for each capaian
  const modeValues = capaians
    .map(capaian => getModusNilai(capaian.id_capaian, id_siswa))
    .filter(Boolean);
  
  if (modeValues.length === 0) return null;
  
  // Calculate mode of mode values
  const counts = {};
  let maxCount = 0;
  let modus = null;
  
  modeValues.forEach(value => {
    // Convert string numeric values to actual numbers
    const normalizedValue = typeof value === 'string' && !isNaN(Number(value)) 
      ? Number(value) 
      : value;
      
    counts[normalizedValue] = (counts[normalizedValue] || 0) + 1;
    if (counts[normalizedValue] > maxCount) {
      maxCount = counts[normalizedValue];
      modus = normalizedValue;
    }
  });
  
  return modus;
}

const calculateAvgForElemenAndSiswa = (id_elemen, id_siswa) => {
  const capaians = getCapaianForElemen(id_elemen);
  if (capaians.length === 0) return 0;
  
  let total = 0;
  let count = 0;
  
  capaians.forEach(capaian => {
    const modeValue = getModusNilai(capaian.id_capaian, id_siswa);
    if (modeValue) {
      let numericValue = 0;
      
      if (typeof modeValue === 'string') {
        if (modeValue === 'MB') numericValue = 1;
        else if (modeValue === 'SB') numericValue = 2;
        else if (modeValue === 'BSH') numericValue = 3;
        else if (modeValue === 'SAB') numericValue = 4;
        else numericValue = parseFloat(modeValue) || 0;
      } else {
        numericValue = modeValue || 0;
      }
      
      total += numericValue;
      count++;
    }
  });
  
  return count > 0 ? total / count : 0;
}

const getNilaiClass = (nilai) => {
  if (!nilai) return 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400'
  
  switch (nilai) {
    case '1':
    case 1:
    case 'MB':
      return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
    case '2':
    case 2:
    case 'SB':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
    case '3':
    case 3:
    case 'BSH':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
    case '4':
    case 4:
    case 'SAB':
      return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
    default:
      return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
  }
}

// Edit assessment value function
const editNilai = (capaian, siswa, assessmentNumber) => {
  currentEditingAssessment.value = {
    capaian,
    siswa,
    assessmentNumber
  };
  
  // Create new assessment for this specific cell
  selectedAssessment.value = {
    nama_assessment: `Assessment ${assessmentNumber} - ${capaian.deskripsi.substring(0, 30)}...`,
    id_kelas: selectedKelas.value,
    id_dimensi: getElemenForCapaian(capaian).id_dimensi,
    id_elemen: getSubElemenForCapaian(capaian).id_elemen,
    id_sub_elemen: capaian.id_sub_elemen,
    id_capaian: capaian.id_capaian,
    nilai: {
      [siswa.id_siswa]: getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, assessmentNumber) || ''
    },
    assessmentNumber
  };
  
  isEditMode.value = false;
  showModal.value = true;
}

// Change this function name to match what's used in the template
const getSubElemenForCapaian = (capaian) => {
  if (!capaian || capaian.id_sub_elemen === undefined) return {};
  return subElemenList.value.find(se => se.id_sub_elemen == capaian.id_sub_elemen) || {};
}

// Also rename this function for consistency
const getElemenForCapaian = (capaian) => {
  if (!capaian || capaian.id_sub_elemen === undefined) return {};
  
  const subElement = subElemenList.value.find(se => se.id_sub_elemen == capaian.id_sub_elemen);
  if (!subElement || !subElement.id_elemen) return {};
  
  const element = elemenList.value.find(e => e.id_elemen == subElement.id_elemen);
  return element || {};
}

// Add these functions to support the hierarchy display

// Get Sub Elemen for an Elemen
const getSubElemenForElemen = (id_elemen) => {
  if (!id_elemen) return [];
  return subElemenList.value.filter(se => se.id_elemen == id_elemen);
}

// Get Capaian for a Sub Elemen, filtered by the current fase
const getCapaianForSubElemen = (id_sub_elemen) => {
  if (!id_sub_elemen || !selectedKelas.value) return [];
  
  // Get the fase from the selected kelas
  const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value);
  if (!kelas) return [];
  
  const id_fase = getIdFaseFromKelas(kelas.nama_kelas);
  if (!id_fase) return [];
  
  // Filter capaian by both sub_elemen and fase
  return capaianList.value.filter(c => 
    c.id_sub_elemen == id_sub_elemen && 
    c.id_fase == id_fase
  );
}

// Fetch data functions
const fetchKelasList = async () => {
  try {
    await kelasStore.fetchKelasList()
    // HAPUS: kelasList.value = kelasStore.getKelasList || []
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
  // Clear existing data first
  nilaiSiswa.value = {};
  assessmentValues.value = {};
  
  if (!selectedKelas.value) return;
  
  try {
    console.log('Fetching nilai for kelas:', selectedKelas.value);
    
    // Step 1: Fetch all assessments
    const responseAssessments = await axios.get(`/list/assessment`);
    
    if (!responseAssessments.data.success) {
      console.error('Failed to fetch assessments');
      return;
    }
    
    const allAssessments = responseAssessments.data.data || [];
    console.log('All assessments:', allAssessments.length);
    
    // Step 2: Fetch all nilai
    const responseNilai = await axios.get(`/list/nilai`);
    
    if (!responseNilai.data.success) {
      console.error('Failed to fetch nilai data');
      return;
    }
    
    const allNilai = responseNilai.data.data || [];
    console.log('All nilai:', allNilai.length);
    
    // Step 3: Get current class students
    const currentStudents = siswaList.value.map(s => s.id_siswa);
    console.log('Current students:', currentStudents);
    
    // Step 4: Create assessment list with nilai data (similar to laporan logic)
    const assessmentList = allAssessments.map(assessment => {
      const nilaiForAssessment = allNilai.filter(nilai =>
        nilai.id_assessment === assessment.id_assessment &&
        currentStudents.includes(nilai.id_siswa)
      );
      
      const nilai = {};
      nilaiForAssessment.forEach(n => {
        nilai[n.id_siswa] = n.nilai;
      });
      
      return {
        ...assessment,
        nilai: nilai
      };
    });
    
    // Step 5: Process each capaian to get assessment values
    const capaianIds = [...new Set(assessmentList.map(a => a.id_capaian))];
    
    capaianIds.forEach(id_capaian => {
      // Get all assessments for this capaian that have nilai data
      const assessmentsForCapaian = assessmentList.filter(a =>
        a.id_capaian == id_capaian &&
        a.nilai &&
        Object.keys(a.nilai).length > 0
      );
      
      // Sort by creation date or ID to maintain order
      assessmentsForCapaian.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
      
      console.log(`Processing capaian ${id_capaian} with ${assessmentsForCapaian.length} assessments with nilai`);
      
      // Initialize structure for this capaian
      if (!assessmentValues.value[id_capaian]) {
        assessmentValues.value[id_capaian] = {};
      }
      
      // Process each student for this capaian
      currentStudents.forEach(id_siswa => {
        const studentAssessments = assessmentsForCapaian.filter(a =>
          a.nilai[id_siswa] !== undefined &&
          a.nilai[id_siswa] !== null &&
          a.nilai[id_siswa] !== ''
        );
        
        if (studentAssessments.length > 0) {
          if (!assessmentValues.value[id_capaian][id_siswa]) {
            assessmentValues.value[id_capaian][id_siswa] = {};
          }
          
          // Store up to 6 assessment values
          studentAssessments.slice(0, 6).forEach((assessment, index) => {
            const assessmentNumber = index + 1; // 1-based numbering
            assessmentValues.value[id_capaian][id_siswa][assessmentNumber] = assessment.nilai[id_siswa];
            console.log(`Stored: Capaian ${id_capaian}, Siswa ${id_siswa}, Assessment ${assessmentNumber} = ${assessment.nilai[id_siswa]}`);
          });
        }
      });
    });
    
    console.log('Final assessment values structure:', assessmentValues.value);
    
    // Also maintain the existing nilaiSiswa structure for backward compatibility
    Object.keys(assessmentValues.value).forEach(id_capaian => {
      nilaiSiswa.value[id_capaian] = {};
      
      Object.keys(assessmentValues.value[id_capaian]).forEach(id_siswa => {
        // Use the mode value as the representative value
        nilaiSiswa.value[id_capaian][id_siswa] = getModusNilai(id_capaian, id_siswa);
      });
    });
    
  } catch (error) {
    console.error('Error fetching nilai siswa:', error);
    nilaiSiswa.value = {}; // Reset on error
    assessmentValues.value = {};
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
  if (!selectedKelas.value) return;
  
  const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value);
  if (!kelas) return;
  
  const id_fase = getIdFaseFromKelas(kelas.nama_kelas);
  if (!id_fase) return;
  
  try {
    // If sub_elemen is selected, fetch capaian for that specific sub_elemen and fase
    if (selectedSubElemen.value) {
      const response = await axios.get(`/filter/capaian?id_fase=${id_fase}&id_sub_elemen=${selectedSubElemen.value}`);
      if (response.data.success) {
        capaianList.value = response.data.data || [];
      } else {
        capaianList.value = [];
      }
    } else {
      // Fetch all capaian for this fase
      const response = await axios.get(`/list/capaian?id_fase=${id_fase}`);
      if (response.data.success) {
        capaianList.value = response.data.data.filter(c => c.id_fase == id_fase) || [];
      } else {
        capaianList.value = [];
      }
    }
  } catch (error) {
    console.error('Error fetching capaian list:', error);
    capaianList.value = [];
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
  selectedCapaian.value = '';
  
  if (selectedSubElemen.value && selectedKelas.value) {
    const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value);
    if (kelas) {
      const id_fase = getIdFaseFromKelas(kelas.nama_kelas);
      if (id_fase) {
        try {
          // Fetch capaian filtered by both fase and sub_elemen
          const response = await axios.get(`/filter/capaian?id_fase=${id_fase}&id_sub_elemen=${selectedSubElemen.value}`);
          
          if (response.data.success) {
            capaianList.value = response.data.data || [];
          } else {
            capaianList.value = [];
            console.warn('No capaian data returned from API');
          }
        } catch (error) {
          console.error('Error fetching capaian list:', error);
          capaianList.value = [];
        }
      } else {
        capaianList.value = [];
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
  currentEditingAssessment.value = {
    capaian: null,
    siswa: null,
    assessmentNumber: null
  }
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
    
    // If we're editing a specific cell, update the assessmentNumber
    if (currentEditingAssessment.value.capaian) {
      formData.assessmentNumber = currentEditingAssessment.value.assessmentNumber;
    }
    
    let id_assessment = null; // Initialize id_assessment

    if (isEditMode.value) {
      await assessmentStore.updateAssessment(selectedAssessment.value.id_assessment, formData)
      id_assessment = selectedAssessment.value.id_assessment
      showSuccessToast('Assessment berhasil diperbarui')
    } else {
      // Prepare assessment data with proper validation
      const assessmentPayload = {
        id_capaian: parseInt(formData.id_capaian),
        nama_assessment: formData.nama_assessment || `Assessment ${Date.now()}`,
        deskripsi: formData.deskripsi || 'Assessment otomatis',
        bobot: parseInt(formData.bobot) || 20
      };

      console.log('Sending assessment data:', assessmentPayload);
      
      // Fix: Use correct endpoint with leading slash
      const res = await axios.post('/add/assessment', assessmentPayload);
      
      if (!res.data.success) {
        throw new Error(res.data.message || 'Gagal membuat assessment');
      }
      
      id_assessment = res.data.id;
      showSuccessToast('Assessment baru berhasil dibuat');
    }

    // Get current user ID from auth store
    const currentUserId = authStore.user?.id_guru || 1;

    // Process nilai submission with better error handling
    if (id_assessment && formData.nilai) {
      const nilaiPromises = [];
      
      for (const [id_siswa, nilai] of Object.entries(formData.nilai)) {
        if (nilai && nilai.trim() !== '') {
          const nilaiPayload = {
            id_siswa: parseInt(id_siswa),
            id_pengampu: currentUserId,
            id_assessment: parseInt(id_assessment),
            nilai: nilai.toString(),
            tanggal_input: new Date().toISOString().slice(0, 10)
          };
          
          console.log('Sending nilai data:', nilaiPayload);
          
          // Fix: Use correct endpoint that matches backend
          nilaiPromises.push(
            axios.post('/add/nilai', nilaiPayload)
              .catch(err => {
                console.error(`Error saving nilai for student ${id_siswa}:`, err);
                throw new Error(`Gagal menyimpan nilai untuk siswa ${id_siswa}: ${err.response?.data?.message || err.message}`);
              })
          );
        }
      }
      
      // Execute all nilai submissions in parallel
      if (nilaiPromises.length > 0) {
        try {
          await Promise.all(nilaiPromises);
          console.log(`Successfully saved ${nilaiPromises.length} nilai records`);
        } catch (error) {
          console.error('Error in batch nilai submission:', error);
          throw error;
        }
      }
    }
    
    closeModal()
    await fetchData()
    // Also refresh nilai data if we're looking at a class
    if (selectedKelas.value) {
      await fetchNilaiSiswa()
    }
  } catch (error) {
    console.error('Error saving assessment:', error);
    
    let errorMessage = 'Gagal menyimpan assessment';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 401:
          errorMessage = 'Sesi login telah berakhir. Silakan login kembali.';
          break;
        case 403:
          errorMessage = 'Anda tidak memiliki izin untuk melakukan operasi ini.';
          break;
        case 400:
          errorMessage = `Data tidak valid: ${data.message || 'Periksa kembali input Anda'}`;
          break;
        case 500:
          errorMessage = 'Terjadi kesalahan server. Silakan coba lagi nanti.';
          break;
        default:
          errorMessage = data.message || `Error ${status}: ${error.message}`;
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    } else {
      // Other error
      errorMessage = error.message || 'Terjadi kesalahan tidak terduga';
    }
    
    showErrorToast(errorMessage);
  } finally {
    loading.value = false
  }
}

// Add this helper function to check if there are any actual values
const hasAnyValues = (id_capaian) => {
  if (!nilaiSiswa.value[id_capaian]) return false;
  
  const values = Object.values(nilaiSiswa.value[id_capaian]);
  return values.some(v => v !== null && v !== undefined && v !== '');
};

// Initialize data on component mount
onMounted(async () => {
  await fetchData();
});

// Add to the script section with other helper functions
const getElemenLetter = (index) => {
  return String.fromCharCode(65 + index); // A, B, C, ...
}

// Update or add to your script section
const getSiswaStatus = (avgValue) => {
  if (avgValue >= 3) return "Tuntas";
  return "Belum Tuntas";
}

const getSiswaStatusClass = (avgValue) => {
  if (avgValue >= 3) {
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-lg text-xs font-medium";
  }
  return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-1 rounded-lg text-xs font-medium";
}
</script>
