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
          <!-- Capaian Filter -->
          <!-- <div class="flex flex-col"> -->
            <!-- <label class="text-xs font-semibold text-gray-600 mb-1">Capaian</label> -->
            <select
              v-model="selectedCapaian"
              class="px-3 py-2 border rounded-lg shadow-md focus:ring-1 focus:ring-blue-400 border-gray-300 bg-white text-gray-700 text-sm appearance-none focus:outline-none w-full max-w-xs"
              :disabled="!selectedSubElemen || capaianList.length === 0"
              @change="onCapaianChange"
            >
              <option value="" disabled selected class="text-gray-400">Pilih Capaian</option>
              <option
                v-if="capaianList.length === 0 && selectedSubElemen"
                disabled
                class="text-sm px-2 py-1 text-left text-gray-400"
              >
                Tidak ada capaian tersedia
              </option>
              <option
                v-for="capaian in filteredCapaian"
                :key="capaian.id_capaian"
                :value="capaian.id_capaian"
                class="text-sm px-2 py-1 text-left whitespace-normal break-words max-w-xs"
              >
                {{ capaian.deskripsi }}
              </option>
            </select>
          <!-- </div> -->
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
              :disabled="!isAllFilterSelected"
              @click="buatAssessment"
              class="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Buat Assessment
            </button>
          </div>
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
                <span v-if="assessment.id_assessment">Assessment #{{ assessment.id_assessment }}</span>
                <span v-else>Assessment ID Tidak Tersedia</span>
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
    <!-- Tabel Dinamis Siswa & Penilaian -->
    <div v-if="siswaList.length > 0" class="mx-4 sm:mx-6 lg:mx-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 transition-all duration-300 hover:shadow-xl">
    <div class="font-semibold text-lg mb-6 flex items-center gap-2 text-gray-800">
      <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Daftar Siswa di Kelas Ini
    </div>
    <div class="overflow-x-auto rounded-2xl border border-gray-100">
      <table class="min-w-full text-sm border-separate border-spacing-0 rounded-2xl overflow-hidden">
        <thead class="bg-gradient-to-r from-blue-100 to-blue-50 sticky top-0 z-10">
          <tr>
            <th class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200 transition-colors duration-300 hover:bg-blue-200" style="min-width: 150px;">Nama</th>
            <th class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200 transition-colors duration-300 hover:bg-blue-200" style="min-width: 150px;">Kelas</th>
            <th v-if="selectedDimensi" class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200 transition-colors duration-300 hover:bg-blue-200 relative" :style="{ 'min-width': selectedDimensi && (selectedElemen || selectedSubElemen || selectedCapaian) ? '600px' : '200px' }">
              <div class="flex flex-col items-center">
                <!-- Dimensi -->
                <span>DIMENSI</span>
                <span class="font-normal text-xs text-gray-600">{{ getNamaDimensi(selectedDimensi) }}</span>
                <!-- Elemen -->
                <span v-if="selectedElemen" class="mt-2">ELEMEN</span>
                <span v-if="selectedElemen" class="font-normal text-xs text-gray-600">{{ getNamaElemen(selectedElemen) }}</span>
                <!-- Sub Elemen -->
                <span v-if="selectedSubElemen" class="mt-2">SUB ELEMEN</span>
                <span v-if="selectedSubElemen" class="font-normal text-xs text-gray-600">{{ getNamaSubElemen(selectedSubElemen) }}</span>
                <!-- Capaian -->
                <span v-if="selectedCapaian" class="mt-2">CAPAIAN</span>
                <span v-if="selectedCapaian" class="font-normal text-xs text-gray-600">{{ getNamaCapaian(selectedCapaian) }}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(siswa, idx) in siswaList" :key="siswa.id_siswa" :class="[idx % 2 === 0 ? 'bg-white' : 'bg-gray-50', 'hover:bg-blue-50/50 transition-all duration-200 border-b border-gray-100 last:border-b-0']">
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 text-center border-r border-gray-200 relative" style="min-width: 150px;">
              <span class="inline-flex items-center gap-2">
                {{ siswa.nama }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 text-center border-r border-gray-200" style="min-width: 150px;">{{ getNamaKelas(siswa.id_kelas) }}</td>
            <td v-if="selectedDimensi" class="px-6 py-4 whitespace-nowrap text-gray-900 text-center border-r border-gray-200" style="min-width: 200px;">
              <!-- Radio buttons ketika semua filter dipilih -->
              <div v-if="selectedDimensi && selectedElemen && selectedSubElemen && selectedCapaian" class="flex gap-4 justify-center">
                <label v-for="opt in ['MB', 'SB', 'BSH', 'SAB']" :key="opt" class="inline-flex items-center gap-2 p-2 rounded-lg bg-white shadow-md hover:bg-blue-50 transition-all duration-200">
                  <input type="radio" :name="'nilai-' + siswa.id_siswa" :value="opt" v-model="nilaiSiswa[siswa.id_siswa]" class="accent-blue-600 w-5 h-5 cursor-pointer" />
                  <span class="text-base font-medium text-gray-800">{{ opt }}</span>
                </label>
              </div>
              
              <!-- Informasi filter yang dipilih -->
              <div v-else class="text-center">
                <div v-if="!selectedElemen" class="text-s text-gray-400 italic">
                  Pilih Elemen untuk melanjutkan
                </div>
                <div v-else-if="!selectedSubElemen" class="text-s text-gray-400 italic">
                  Pilih Sub Elemen untuk melanjutkan
                </div>
                <div v-else-if="!selectedCapaian" class="text-s text-gray-400 italic">
                  Pilih Capaian untuk mulai assessment
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAssesmentStore } from '@/stores/assesment'
import { useKelasStore } from '@/stores/kelas'
import { useDimensiStore } from '@/stores/dimensi'
import { useElemenStore } from '@/stores/elemen'
import { useSubElemenStore } from '@/stores/subElemen'
import { useCapaianStore } from '@/stores/capaian'
import AssesmentFormModal from '@/components/assesment/AssesmentFormModal.vue'
import { useThemeStore } from '@/stores/theme'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios'

// Initialize stores
const assessmentStore = useAssesmentStore()
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()
const themeStore = useThemeStore()
const router = useRouter()

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
    await capaianStore.fetchCapaianBySubElemen(id_fase, id_sub_elemen)
    capaianList.value = capaianStore.getCapaianList || []
    console.debug('Capaian list fetched:', capaianList.value)
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
  selectedCapaian.value = ''
  capaianList.value = []
  if (selectedSubElemen.value && selectedKelas.value) {
    const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value)
    const id_fase = kelas ? kelas.id_fase : null
    if (id_fase) {
      await fetchCapaianList(id_fase, selectedSubElemen.value)
    } else {
      console.warn('No id_fase found for selected kelas:', selectedKelas.value)
    }
  }
}

const onCapaianChange = () => {
  console.debug('Selected capaian:', selectedCapaian.value)
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

const buatAssessment = async () => {
  try {
    loading.value = true
    const res = await axios.post('/add/assessment', {
      id_kelas: selectedKelas.value,
      id_dimensi: selectedDimensi.value,
      id_elemen: selectedElemen.value,
      id_sub_elemen: selectedSubElemen.value,
      id_capaian: selectedCapaian.value
    })
    if (res.data.success && res.data.id) {
      router.push({ name: 'assesment-penilaian', params: { id: res.data.id } })
    } else {
      alert('Gagal membuat assessment: Tidak ada ID yang dikembalikan')
    }
  } catch (err) {
    console.error('Error creating assessment:', err)
    alert('Gagal membuat assessment: ' + (err.response?.data?.message || err.message || 'Unknown error'))
  } finally {
    loading.value = false
  }
}

// Lifecycle hooks
onMounted(fetchData)
</script>