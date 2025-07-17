<template>
  <div class="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-10">
    <!-- Header Section -->
    <div class="bg-blue-600 text-white p-6 md:px-10">
      <div class="flex items-center space-x-4 mb-4">
        <div class="bg-blue-500 p-2 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-white mb-1">Assesment</h1>
          <p class="text-blue-100 text-sm">Kelola dan buat assesment untuk siswa</p>
        </div>
      </div>
      
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
        <!-- Filter Controls -->
        <div class="flex flex-wrap gap-3 mb-4 md:mb-0">
          <div class="relative w-full sm:w-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari assesment..."
              class="pl-10 pr-4 py-2 rounded-lg border border-blue-400 bg-blue-500 bg-opacity-20 focus:bg-blue-500 focus:bg-opacity-30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
            />
            <svg class="w-5 h-5 text-blue-200 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <!-- Kelas Dropdown -->
          <select 
            v-model="selectedKelas"
            class="py-2 px-3 rounded-lg border border-blue-400 bg-blue-500 bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Semua Kelas</option>
            <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas">
              {{ kelas.nama_kelas }}
            </option>
          </select>
          
          <!-- Dimensi Dropdown -->
          <select 
            v-model="selectedDimensi"
            @change="onDimensiChange"
            class="py-2 px-3 rounded-lg border border-blue-400 bg-blue-500 bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Semua Dimensi</option>
            <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
              {{ dimensi.nama_dimensi }}
            </option>
          </select>
          
          <!-- Elemen Dropdown -->
          <select 
            v-model="selectedElemen"
            @change="onElemenChange"
            class="py-2 px-3 rounded-lg border border-blue-400 bg-blue-500 bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            :disabled="!selectedDimensi"
          >
            <option value="">Semua Elemen</option>
            <option v-for="elemen in elemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
              {{ elemen.nama_elemen }}
            </option>
          </select>
          
          <!-- Sub Elemen Dropdown -->
          <select 
            v-model="selectedSubElemen"
            @change="onSubElemenChange"
            class="py-2 px-3 rounded-lg border border-blue-400 bg-blue-500 bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            :disabled="!selectedElemen"
          >
            <option value="">Semua Sub Elemen</option>
            <option v-for="subElemen in subElemenList" :key="subElemen.id_sub_elemen" :value="subElemen.id_sub_elemen">
              {{ subElemen.nama_sub_elemen }}
            </option>
          </select>
          
          <!-- Status Dropdown -->
          <select 
            v-model="filterStatus"
            class="py-2 px-3 rounded-lg border border-blue-400 bg-blue-500 bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Semua Status</option>
            <option value="completed">Selesai</option>
            <option value="in_progress">Belum Selesai</option>
          </select>
        </div>
        
        <!-- Action Buttons - Now in a column layout -->
        <div class="flex flex-col space-y-2">
          <button 
            @click="openCreateModal" 
            class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Buat Assessment
          </button>
          
          <button 
            @click="openEditModal" 
            class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Ubah Assessment
          </button>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <div v-if="loading" class="flex justify-center my-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else-if="assessmentList.length === 0" class="bg-white rounded-xl shadow-sm p-10 text-center">
        <div class="flex flex-col items-center justify-center">
          <div class="bg-blue-100 rounded-full p-4 mb-4">
            <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">Belum ada assessment</h3>
          <p class="text-gray-500 mb-4">Klik tombol "Buat Assessment" untuk membuat assessment baru</p>
          <button 
            @click="openCreateModal" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
          >
            Buat Assessment Sekarang
          </button>
        </div>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Assessment Card -->
        <div 
          v-for="(assessment, index) in filteredAssessmentList" 
          :key="assessment.id_assessment"
          class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
          :class="{'border-blue-500 ring-2 ring-blue-200': selectedAssessment?.id_assessment === assessment.id_assessment}"
          @click="selectAssessment(assessment)"
        >
          <!-- Card Header -->
          <div class="p-5 border-b border-gray-100 flex justify-between items-start">
            <div>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Assessment #{{ assessment.id_assessment }}
              </span>
              <h3 class="text-lg font-semibold text-gray-900 mt-2">
                {{ assessment.nama_kelas }} - {{ assessment.nama_dimensi }}
              </h3>
              <p class="text-sm text-gray-500 mt-1">
                {{ assessment.nama_elemen }} > {{ assessment.nama_sub_elemen }}
              </p>
              <p class="text-sm text-gray-600 mt-2">
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
            <div class="flex items-center text-sm text-gray-500 mb-4">
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
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" :style="`width: ${assessment.progress}%`"></div>
              </div>
            </div>
          </div>
          
          <!-- Card Footer -->
          <div class="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
              @click.stop="editAssessment(assessment)"
              class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
            >
              <!-- Add this content to the button -->
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

// Initialize stores
const assessmentStore = useAssesmentStore()
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()

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
  return status === 'completed' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-yellow-100 text-yellow-800'
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