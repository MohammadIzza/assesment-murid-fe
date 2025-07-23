<template>
  <div class="pb-20">
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
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-12 border-r border-gray-700">SKL</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-16 border-r border-gray-700">No KD</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-700">KOMPETENSI</th>
              
              <!-- Student headers - Dynamic based on loaded students -->
              <template v-for="siswa in siswaList" :key="siswa.id_siswa">
                <th :colspan="7" class="text-center border-l border-gray-700">
                  <div class="px-2 py-3 text-xs font-semibold">
                    {{ siswa.nama }}
                  </div>
                  <div class="flex border-t border-gray-700">
                    <div v-for="n in 6" :key="n" class="px-2 py-1 text-xs font-semibold w-8 text-center border-r last:border-r-0 border-gray-700">
                      {{ n }}
                    </div>
                    <div class="px-2 py-1 text-xs font-semibold w-12 text-center bg-gray-700">
                      NA
                    </div>
                  </div>
                </th>
              </template>
            </tr>
          </thead>
          
          <!-- Body -->
          <tbody>
            <template v-for="(dimensi, dimIndex) in filteredDimensiList" :key="dimensi.id_dimensi">
              <!-- Dimensi row - spans entire table -->
              <tr class="bg-green-700 text-white">
                <td :colspan="3 + siswaList.length * 7" class="px-4 py-2 text-base font-bold">
                  {{ dimensi.nama_dimensi }}
                </td>
              </tr>
              
              <!-- For each elemen in this dimensi -->
              <template v-for="(elemen, elemIndex) in getElemenForDimensi(dimensi.id_dimensi)" :key="elemen.id_elemen">
                <!-- Elemen row -->
                <tr class="bg-gray-100 dark:bg-gray-800">
                  <!-- Show the SKL letter (A, B) only once per elemen -->
                  <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                    {{ String.fromCharCode(65 + dimIndex) }}
                  </td>
                  <!-- Colspan over the No KD and Kompetensi -->
                  <td :colspan="2" class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-300">
                    {{ elemen.nama_elemen }}
                  </td>
                  
                  <!-- Empty cells for student columns -->
                  <td :colspan="siswaList.length * 7" class="border border-gray-300 dark:border-gray-700"></td>
                </tr>
                
                <!-- Get all capaian for this elemen -->
                <template v-for="(capaian, capIndex) in getCapaianForElemen(elemen.id_elemen)" :key="capaian.id_capaian">
                  <tr :class="{'bg-white dark:bg-gray-900': capIndex % 2 === 0, 'bg-gray-50 dark:bg-gray-800/50': capIndex % 2 !== 0}">
                    <!-- Empty cell for SKL letter since it's already shown in elemen row -->
                    <td class="border border-gray-300 dark:border-gray-700 px-4 py-3"></td>
                    
                    <!-- No KD -->
                    <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-300 text-center">
                      {{ capIndex + 1 }}
                    </td>
                    
                    <!-- Kompetensi -->
                    <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                      {{ capaian.deskripsi }}
                    </td>
                    
                    <!-- Student assessment cells -->
                    <template v-for="siswa in siswaList" :key="`${capaian.id_capaian}-${siswa.id_siswa}`">
                      <!-- Assessment values (1-6) -->
                      <td v-for="n in 6" :key="`${capaian.id_capaian}-${siswa.id_siswa}-${n}`" 
                          @click="editNilai(capaian, siswa, n)"
                          class="border border-gray-300 dark:border-gray-700 w-10 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div v-if="getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n)" 
                              :class="getNilaiClass(getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n))" 
                              class="m-1 py-1 px-1 font-medium rounded-full flex items-center justify-center h-8 w-8 mx-auto">
                          {{ getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n) }}
                        </div>
                        <div v-else class="m-1 py-1 px-1 text-gray-400 dark:text-gray-600">-</div>
                      </td>
                      
                      <!-- NA column (modus) -->
                      <td class="border border-gray-300 dark:border-gray-700 w-12 bg-gray-100 dark:bg-gray-700/80 text-center">
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
                
                <!-- Add average row for this elemen if there are capaian -->
                <tr v-if="getCapaianForElemen(elemen.id_elemen).length > 0" class="bg-gray-200 dark:bg-gray-700/70">
                  <td colspan="3" class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-300">
                    Rata-Rata Per Komponen SKL
                  </td>
                  
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
              <td :colspan="3 + siswaList.length * 7" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
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
  
  // Calculate mode (most frequent value)
  const counts = {};
  let maxCount = 0;
  let modus = null;
  
  values.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
    if (counts[value] > maxCount) {
      maxCount = counts[value];
      modus = value;
    }
  });
  
  return modus;
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
    counts[value] = (counts[value] || 0) + 1;
    if (counts[value] > maxCount) {
      maxCount = counts[value];
      modus = value;
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
  
  // Find existing assessment for this combination
  const existingAssessment = assessmentStore.getAssessmentList.find(a => 
    a.id_capaian == capaian.id_capaian && 
    a.id_kelas == siswa.id_kelas &&
    a.assessmentNumber == assessmentNumber
  );
  
  if (existingAssessment) {
    // Edit existing assessment
    selectedAssessment.value = { 
      ...existingAssessment,
      nilai: { ...existingAssessment.nilai } // Clone to avoid reference issues
    };
    isEditMode.value = true;
  } else {
    // Create new assessment
    selectedAssessment.value = {
      nama_assessment: `Assessment ${assessmentNumber} - ${capaian.deskripsi.substring(0, 30)}...`,
      id_kelas: siswa.id_kelas,
      id_dimensi: getElementForCapaian(capaian).id_dimensi,
      id_elemen: getSubElementForCapaian(capaian).id_elemen,
      id_sub_elemen: capaian.id_sub_elemen,
      id_capaian: capaian.id_capaian,
      nilai: {},
      assessmentNumber
    };
    isEditMode.value = false;
  }
  
  showModal.value = true;
}

// Helper to get elemen for capaian
const getElementForCapaian = (capaian) => {
  const subElement = subElemenList.value.find(se => se.id_sub_elemen == capaian.id_sub_elemen);
  if (!subElement) return {};
  
  const element = elemenList.value.find(e => e.id_elemen == subElement.id_elemen);
  return element || {};
}

// Helper to get sub_elemen for capaian
const getSubElementForCapaian = (capaian) => {
  return subElemenList.value.find(se => se.id_sub_elemen == capaian.id_sub_elemen) || {};
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
  // Clear existing data first
  nilaiSiswa.value = {};
  assessmentValues.value = {};
  
  if (!selectedKelas.value) return;
  
  try {
    // Step 1: Fetch all assessments for this kelas
    const responseAssessments = await axios.get(`/list/assessment?id_kelas=${selectedKelas.value}`);
    
    if (!responseAssessments.data.success) {
      console.error('Failed to fetch assessments');
      return;
    }
    
    const assessments = responseAssessments.data.data || [];
    const assessmentIds = assessments.map(a => a.id_assessment);
    
    if (assessmentIds.length === 0) {
      return;
    }
    
    // Step 2: Fetch all nilai (scores) for these assessments
    const responseNilai = await axios.get(`/list/nilai?id_kelas=${selectedKelas.value}`);
    
    if (!responseNilai.data.success) {
      console.error('Failed to fetch nilai data');
      return;
    }
    
    const nilaiList = responseNilai.data.data || [];
    
    // Step 3: Organize data by capaian, student, and assessment number
    assessments.forEach(assessment => {
      const id_capaian = assessment.id_capaian;
      const assessmentNumber = assessment.assessmentNumber || 1; // Default to 1 if not specified
      
      // Initialize assessment values structure
      if (!assessmentValues.value[id_capaian]) {
        assessmentValues.value[id_capaian] = {};
      }
      
      // Find scores for this assessment
      const scoresForAssessment = nilaiList.filter(n => n.id_assessment === assessment.id_assessment);
      
      // Map scores to students and assessment numbers
      scoresForAssessment.forEach(nilai => {
        if (nilai.nilai !== null && nilai.nilai !== undefined && nilai.nilai !== '') {
          if (!assessmentValues.value[id_capaian][nilai.id_siswa]) {
            assessmentValues.value[id_capaian][nilai.id_siswa] = {};
          }
          assessmentValues.value[id_capaian][nilai.id_siswa][assessmentNumber] = nilai.nilai;
        }
      });
    });
    
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

// Add this helper function to check if there are any actual values
const hasAnyValues = (id_capaian) => {
  if (!nilaiSiswa.value[id_capaian]) return false;
  
  const values = Object.values(nilaiSiswa.value[id_capaian]);
  return values.some(v => v !== null && v !== undefined && v !== '');
};

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