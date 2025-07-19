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
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <!-- Search -->
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari assessment..." 
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
          />
          <!-- Kelas Filter -->
          <select 
            v-model="selectedKelas" 
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
          >
            <option value="">Semua Kelas</option>
            <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas">
              {{ kelas.nama_kelas }}
            </option>
          </select>
          <!-- Dimensi Filter -->
          <select 
            v-model="selectedDimensi" 
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
            @change="onDimensiChange"
          >
            <option value="">Semua Dimensi</option>
            <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
              {{ dimensi.nama_dimensi }}
            </option>
          </select>
          <!-- Elemen Filter -->
          <select 
            v-model="selectedElemen" 
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
            @change="onElemenChange"
            :disabled="!selectedDimensi"
          >
            <option value="">Semua Elemen</option>
            <option v-for="elemen in elemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
              {{ elemen.nama_elemen }}
            </option>
          </select>
          <!-- Sub Elemen Filter -->
          <select 
            v-model="selectedSubElemen" 
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 bg-white text-gray-700"
            @change="onSubElemenChange"
            :disabled="!selectedElemen"
          >
            <option value="">Semua Sub Elemen</option>
            <option v-for="subElemen in subElemenList" :key="subElemen.id_sub_elemen" :value="subElemen.id_sub_elemen">
              {{ subElemen.nama_sub_elemen }}
            </option>
          </select>
        </div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <button 
            @click="resetFilters" 
            class="px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          >
            Reset Filter
          </button>
          <button 
            @click="openCreateModal" 
            class="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Buat Assessment
          </button>
        </div>
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

      <!-- Assessment List -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Assessment Card -->
        <div 
          v-for="(assessment, index) in filteredAssessmentList" 
          :key="assessment.id_assessment"
          class="rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-200 overflow-hidden cursor-pointer"
          @click="selectAssessment(assessment)"
        >
          <!-- Card Header -->
          <div class="p-5 border-b border-gray-100 flex justify-between items-start">
            <div>
              <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Assessment #{{ assessment.id_assessment }}
              </span>
              <h3 class="text-lg font-semibold mt-2 text-gray-900">
                {{ assessment.nama_kelas }} - {{ assessment.nama_dimensi }}
              </h3>
              <p class="text-sm mt-1 text-gray-500">
                {{ assessment.nama_elemen }} > {{ assessment.nama_sub_elemen }}
              </p>
              <p class="text-sm mt-2 text-gray-600">
                {{ assessment.kompetensi }}
              </p>
            </div>
            <span 
              :class="getStatusClass(assessment.status)"
              class="text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {{ getStatusText(assessment.status) }}
            </span>
          </div>
          <!-- Card Body -->
          <div class="p-5">
            <div class="flex items-center text-sm mb-4 text-gray-500">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{{ formatDate(assessment.tanggal_buat) }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span>{{ assessment.total_siswa }} siswa</span>
            </div>
            <!-- Progress Bar -->
            <div class="mt-4">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-medium text-gray-500">Kemajuan</span>
                <span class="text-xs font-medium text-gray-500">{{ assessment.progress }}%</span>
              </div>
              <div class="w-full rounded-full h-2 bg-gray-200">
                <div class="bg-blue-600 h-2 rounded-full" :style="`width: ${assessment.progress}%`"></div>
              </div>
            </div>
          </div>
          <!-- Card Footer -->
          <div class="p-4 border-t bg-gray-50 border-gray-100 flex justify-end">
            <button 
              @click.stop="editAssessment(assessment)"
              class="text-sm flex items-center font-medium text-blue-600 hover:text-blue-800"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Ubah Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Assessment Form Modal -->
    <assessment-form-modal
      v-if="showModal"
      :isEdit="isEditMode"
      :selectedAssessment="selectedAssessment"
      @close="closeModal"
      @save="saveAssessment"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAssesmentStore } from '@/stores/assesment'
import { useKelasStore } from '@/stores/kelas'
import { useDimensiStore } from '@/stores/dimensi'
import { useElemenStore } from '@/stores/elemen'
import { useSubElemenStore } from '@/stores/subElemen'
import { useCapaianStore } from '@/stores/capaian'
import AssesmentFormModal from '@/components/assesment/AssesmentFormModal.vue'
import { useThemeStore } from '@/stores/theme'

// Initialize stores
const assessmentStore = useAssesmentStore()
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()
const themeStore = useThemeStore()

// State variables
const loading = ref(true)
const searchQuery = ref('')
const selectedKelas = ref('')
const selectedDimensi = ref('')
const selectedElemen = ref('')
const selectedSubElemen = ref('')
const filterStatus = ref('')
const showModal = ref(false)
const isEditMode = ref(false)
const selectedAssessment = ref(null)

// Lists for dropdowns
const elemenList = ref([])
const subElemenList = ref([])
const capaianList = ref([])

// Computed properties
const assessmentList = computed(() => assessmentStore.getAssessmentList)
const kelasList = computed(() => kelasStore.getKelasList)
const dimensiList = computed(() => dimensiStore.getDimensiList)
const isDarkMode = computed(() => themeStore.isDarkMode)

const filteredAssessmentList = computed(() => {
  let filtered = [...assessmentList.value]
  
  // Filter by search query
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
  
  // Filter by kelas
  if (selectedKelas.value) {
    filtered = filtered.filter(assessment => 
      assessment.id_kelas == selectedKelas.value
    )
  }
  
  // Filter by dimensi
  if (selectedDimensi.value) {
    filtered = filtered.filter(assessment => 
      assessment.id_dimensi == selectedDimensi.value
    )
  }
  
  // Filter by elemen
  if (selectedElemen.value) {
    filtered = filtered.filter(assessment => 
      assessment.id_elemen == selectedElemen.value
    )
  }
  
  // Filter by sub_elemen
  if (selectedSubElemen.value) {
    filtered = filtered.filter(assessment => 
      assessment.id_sub_elemen == selectedSubElemen.value
    )
  }
  
  // Filter by status
  if (filterStatus.value) {
    filtered = filtered.filter(assessment => 
      assessment.status === filterStatus.value
    )
  }
  
  return filtered
})

// Methods
const fetchData = async () => {
  loading.value = true
  try {
    await Promise.all([
      assessmentStore.fetchAssessmentList(),
      kelasStore.fetchKelasList(),
      dimensiStore.fetchDimensiList()
    ])
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

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
    await fetchData() // Refresh the list
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

// Methods to handle dropdown changes
const onDimensiChange = async () => {
  // Reset dependent dropdowns
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  elemenList.value = []
  subElemenList.value = []
  
  if (selectedDimensi.value) {
    try {
      await elemenStore.fetchElemenByDimensi(selectedDimensi.value)
      elemenList.value = elemenStore.getElemenList
    } catch (error) {
      console.error('Error fetching elemen list:', error)
    }
  }
}

const onElemenChange = async () => {
  // Reset dependent dropdown
  selectedSubElemen.value = ''
  subElemenList.value = []
  
  if (selectedElemen.value) {
    try {
      await subElemenStore.fetchSubElemenByElemen(selectedElemen.value)
      subElemenList.value = subElemenStore.getSubElemenList
    } catch (error) {
      console.error('Error fetching sub elemen list:', error)
    }
  }
}

const onSubElemenChange = async () => {
  // You can add additional logic here if needed when sub-elemen changes
  // For example, loading capaian based on the selected sub-elemen
}

// Reset filters method
const resetFilters = () => {
  searchQuery.value = ''
  selectedKelas.value = ''
  selectedDimensi.value = ''
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  filterStatus.value = ''
  elemenList.value = []
  subElemenList.value = []
}

// Lifecycle hooks
onMounted(() => {
  fetchData()
})

// Watchers
watch([searchQuery, selectedKelas, selectedDimensi, selectedElemen, selectedSubElemen, filterStatus], () => {
  // This will run whenever any filter changes
  // You could add debounce logic here if needed
})

// Specific watcher for dimensi changes
watch(selectedDimensi, (newValue) => {
  if (newValue) {
    onDimensiChange()
  }
})

// Specific watcher for elemen changes  
watch(selectedElemen, (newValue) => {
  if (newValue) {
    onElemenChange()
  }
})
</script>