<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" 
    :class="{'bg-gray-900/50': !isDarkMode, 'bg-black/70': isDarkMode}">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
      <div class="relative w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl transform transition-all"
        :class="{'bg-white': !isDarkMode, 'bg-gray-800': isDarkMode}">
        
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b"
          :class="{'border-gray-200': !isDarkMode, 'border-gray-700': isDarkMode}">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold"
              :class="{'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode}">
              {{ isEdit ? 'Edit Assessment' : 'Buat Assessment Baru' }}
            </h3>
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Modal Body -->
        <div class="px-6 py-4 max-h-[80vh] overflow-y-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Form Fields -->
            <div class="col-span-1 md:col-span-2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nama Assessment -->
                <div class="group">
                  <label for="nama_assessment" class="block text-sm font-medium mb-2"
                    :class="{'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode}">
                    Nama Assessment <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.nama_assessment"
                    type="text"
                    id="nama_assessment"
                    class="block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    :class="{'border-gray-300 bg-white text-gray-700': !isDarkMode, 'border-gray-600 bg-gray-800 text-gray-200': isDarkMode}"
                    placeholder="Nama akan dibuat otomatis"
                    :disabled="autoNaming"
                  />
                  <div class="mt-1 text-xs text-gray-500 flex items-center gap-2">
                    <input type="checkbox" v-model="autoNaming" id="autoNaming" class="rounded">
                    <label for="autoNaming">Buat nama otomatis</label>
                  </div>
                </div>
                
                <!-- Kelas selection -->
                <div class="group">
                  <label for="id_kelas" class="block text-sm font-medium mb-2"
                    :class="{'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode}">
                    Kelas <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.id_kelas"
                    id="id_kelas"
                    class="block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    :class="{'border-gray-300 bg-white text-gray-700': !isDarkMode, 'border-gray-600 bg-gray-800 text-gray-200': isDarkMode}"
                    @change="onKelasChange"
                  >
                    <option value="" disabled>Pilih Kelas</option>
                    <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas">
                      {{ kelas.nama_kelas }}
                    </option>
                  </select>
                </div>

                <!-- Dimensi -->
                <div class="group">
                  <label for="id_dimensi" class="block text-sm font-medium mb-2"
                    :class="{'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode}">
                    Dimensi <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.id_dimensi"
                    id="id_dimensi"
                    class="block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    :class="{'border-gray-300 bg-white text-gray-700': !isDarkMode, 'border-gray-600 bg-gray-800 text-gray-200': isDarkMode}"
                    @change="onDimensiChange"
                  >
                    <option value="" disabled>Pilih Dimensi</option>
                    <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
                      {{ dimensi.nama_dimensi }}
                    </option>
                  </select>
                </div>

                <!-- Elemen -->
                <div class="group">
                  <label for="id_elemen" class="block text-sm font-medium mb-2"
                    :class="{'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode}">
                    Elemen <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.id_elemen"
                    id="id_elemen"
                    class="block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    :class="{'border-gray-300 bg-white text-gray-700': !isDarkMode, 'border-gray-600 bg-gray-800 text-gray-200': isDarkMode}"
                    @change="onElemenChange"
                    :disabled="!form.id_dimensi"
                  >
                    <option value="" disabled>Pilih Elemen</option>
                    <option v-for="elemen in filteredElemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
                      {{ elemen.nama_elemen }}
                    </option>
                  </select>
                </div>

                <!-- Sub Elemen -->
                <div class="group">
                  <label for="id_sub_elemen" class="block text-sm font-medium mb-2"
                    :class="{'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode}">
                    Sub Elemen <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.id_sub_elemen"
                    id="id_sub_elemen"
                    class="block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    :class="{'border-gray-300 bg-white text-gray-700': !isDarkMode, 'border-gray-600 bg-gray-800 text-gray-200': isDarkMode}"
                    @change="onSubElemenChange"
                    :disabled="!form.id_elemen"
                  >
                    <option value="" disabled>Pilih Sub Elemen</option>
                    <option v-for="subElemen in filteredSubElemenList" :key="subElemen.id_sub_elemen" :value="subElemen.id_sub_elemen">
                      {{ subElemen.nama_sub_elemen }}
                    </option>
                  </select>
                </div>

                <!-- Capaian -->
                <div class="group">
                  <label for="id_capaian" class="block text-sm font-medium mb-2"
                    :class="{'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode}">
                    Capaian <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.id_capaian"
                    id="id_capaian"
                    class="block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    :class="{'border-gray-300 bg-white text-gray-700': !isDarkMode, 'border-gray-600 bg-gray-800 text-gray-200': isDarkMode}"
                    @change="onCapaianChange"
                    :disabled="!form.id_sub_elemen || capaianList.length === 0"
                  >
                    <option value="" disabled>Pilih Capaian</option>
                    <option v-for="capaian in capaianList" :key="capaian.id_capaian" :value="capaian.id_capaian">
                      {{ capaian.deskripsi }}
                    </option>
                  </select>
                </div>

                <!-- Search -->
                <div class="group col-span-1 md:col-span-2 mt-4">
                  <div class="relative">
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="Cari siswa..."
                      class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                      :class="{'border-gray-300 bg-white text-gray-700': !isDarkMode, 'border-gray-600 bg-gray-800 text-gray-200': isDarkMode}"
                    />
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Daftar Siswa dan Nilai -->
            <div class="col-span-1 md:col-span-2 mt-4 border rounded-xl overflow-hidden"
              :class="{'border-gray-200': !isDarkMode, 'border-gray-700': isDarkMode}">
              <div class="overflow-hidden">
                <div class="p-4 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-100 dark:border-blue-800">
                  <h3 class="font-medium"
                    :class="{'text-blue-800': !isDarkMode, 'text-blue-300': isDarkMode}">
                    Daftar Siswa
                  </h3>
                  <p class="text-sm mt-1"
                    :class="{'text-blue-600': !isDarkMode, 'text-blue-400': isDarkMode}">
                    * Nilai siswa opsional, dapat diisi nanti
                  </p>
                </div>
                
                <!-- Table Header -->
                <div class="grid grid-cols-12 gap-4 p-4 font-medium border-b"
                  :class="{'border-gray-200 bg-gray-50': !isDarkMode, 'border-gray-700 bg-gray-700': isDarkMode}">
                  <div class="col-span-1"
                    :class="{'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode}">
                    #
                  </div>
                  <div class="col-span-5"
                    :class="{'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode}">
                    Nama Siswa
                  </div>
                  <div class="col-span-6"
                    :class="{'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode}">
                    Nilai
                  </div>
                </div>
              </div>
              
              <div class="overflow-y-auto max-h-[400px]">
                <div 
                  v-for="(siswa, index) in filteredSiswaList" 
                  :key="siswa.id_siswa"
                  class="p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                  :class="{'border-gray-100': !isDarkMode, 'border-gray-700': isDarkMode}"
                >
                  <div class="grid grid-cols-12 gap-4 items-center">
                    <div class="col-span-1"
                      :class="{'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode}">{{ index + 1 }}</div>
                    <div class="col-span-5"
                      :class="{'text-gray-900': !isDarkMode, 'text-gray-200': isDarkMode}">{{ siswa.nama }}</div>
                    <div class="col-span-6">
                      <div class="flex gap-4 flex-wrap">
                        <label 
                          v-for="opt in ['MB', 'SB', 'BSH', 'SAB']" 
                          :key="opt" 
                          class="inline-flex items-center gap-2 cursor-pointer"
                          :class="{'hover:text-blue-600': !isDarkMode, 'hover:text-blue-400': isDarkMode}"
                        >
                          <input 
                            type="radio" 
                            :name="'nilai-' + siswa.id_siswa" 
                            :value="opt"
                            v-model="form.nilai[siswa.id_siswa]"
                            class="w-4 h-4"
                            :class="{'accent-blue-600': !isDarkMode, 'accent-blue-400': isDarkMode}"
                          />
                          <span class="ml-2 text-sm"
                            :class="{'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode}">{{ opt }}</span>
                        </label>
                        <span v-if="form.nilai[siswa.id_siswa] === '-'" class="text-sm text-gray-500">
                          (Belum dinilai)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="filteredSiswaList.length === 0" class="p-8 text-center"
                  :class="{'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode}">
                  {{ form.id_kelas ? 'Tidak ada siswa ditemukan' : 'Pilih kelas untuk melihat daftar siswa' }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal Footer -->
        <div class="px-6 py-4 flex justify-end space-x-3"
          :class="{'bg-gray-50': !isDarkMode, 'bg-gray-800': isDarkMode}">
          <button 
            @click="$emit('close')" 
            class="px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200"
            :class="{'border-gray-300 text-gray-700 hover:bg-gray-100': !isDarkMode, 'border-gray-600 text-gray-300 hover:bg-gray-700': isDarkMode}"
          >
            Batal
          </button>
          <button 
            @click="submitForm" 
            :disabled="!isFormValid || isSubmitting"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50"
            :class="{'bg-blue-600 text-white hover:bg-blue-700': !isDarkMode, 'bg-blue-700 text-white hover:bg-blue-600': isDarkMode}"
          >
          <span v-if="isSubmitting" class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Menyimpan...
          </span>
          <span v-else>
            {{ isEdit ? 'Simpan Perubahan' : 'Simpan' }}
          </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useKelasStore } from '@/stores/kelas'
import { useDimensiStore } from '@/stores/dimensi'
import { useElemenStore } from '@/stores/elemen'
import { useSubElemenStore } from '@/stores/subElemen'
import { useCapaianStore } from '@/stores/capaian'
import { useAssesmentStore } from '@/stores/assesment'
import { useThemeStore } from '@/stores/theme'
import axios from '@/plugins/axios'

// Props
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  selectedAssessment: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['close', 'save'])

// Store initialization
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()
const themeStore = useThemeStore()
const assessmentStore = useAssesmentStore()

// Computed properties
const isDarkMode = computed(() => themeStore.isDarkMode)

// State variables
const isSubmitting = ref(false)
const searchQuery = ref('')
const siswaList = ref([])
const elemenList = ref([])
const subElemenList = ref([])
const capaianList = ref([])
const assessmentNumber = ref(1)
const autoNaming = ref(true)

// Form state
const form = ref({
  nama_assessment: '',
  id_kelas: '',
  id_dimensi: '',
  id_elemen: '',
  id_sub_elemen: '',
  id_capaian: '',
  nilai: {}
})

// Computed properties
const kelasList = computed(() => kelasStore.getKelasList)
const dimensiList = computed(() => dimensiStore.getDimensiList)

const filteredSiswaList = computed(() => {
  if (!searchQuery.value) return siswaList.value
  
  const query = searchQuery.value.toLowerCase()
  return siswaList.value.filter(siswa => 
    siswa.nama.toLowerCase().includes(query) ||
    (siswa.nis && siswa.nis.toLowerCase().includes(query))
  )
})

const filteredElemenList = computed(() => 
  elemenList.value.filter(e => e.id_dimensi == form.value.id_dimensi)
)

const filteredSubElemenList = computed(() => 
  subElemenList.value.filter(se => se.id_elemen == form.value.id_elemen)
)

const isFormValid = computed(() => {
  // Basic form validation for required fields - removed kompetensi
  if (!form.value.nama_assessment || !form.value.id_kelas || !form.value.id_dimensi || 
      !form.value.id_elemen || !form.value.id_sub_elemen || !form.value.id_capaian) {
    return false
  }
  
  // Make student assessment optional - valid even if not all students have values
  return true
})

// Load initial form data if editing
const loadFormData = () => {
  if (props.isEdit && props.selectedAssessment) {
    // Create a copy of existing nilai with '-' for any null or undefined values
    const nilaiWithDefaults = { ...(props.selectedAssessment.nilai || {}) }
    
    form.value = {
      nama_assessment: props.selectedAssessment.nama_assessment || '',
      id_kelas: props.selectedAssessment.id_kelas || '',
      id_dimensi: props.selectedAssessment.id_dimensi || '',
      id_elemen: props.selectedAssessment.id_elemen || '',
      id_sub_elemen: props.selectedAssessment.id_sub_elemen || '',
      id_capaian: props.selectedAssessment.id_capaian || '',
      nilai: nilaiWithDefaults
    }
    
    // When editing, we use the existing name
    autoNaming.value = false
    
    // Load dependent data
    if (form.value.id_kelas) {
      onKelasChange()
    }
    if (form.value.id_dimensi) {
      onDimensiChange()
    }
    if (form.value.id_elemen) {
      onElemenChange()
    }
    if (form.value.id_sub_elemen) {
      onSubElemenChange()
    }
  } else if (!props.isEdit && props.selectedAssessment) {
    // Prefill form for create mode using selection passed from parent filters
    const sel = props.selectedAssessment
    form.value = {
      nama_assessment: sel.nama_assessment || '',
      id_kelas: sel.id_kelas || '',
      id_dimensi: sel.id_dimensi || '',
      id_elemen: sel.id_elemen || '',
      id_sub_elemen: sel.id_sub_elemen || '',
      id_capaian: sel.id_capaian || '',
      nilai: sel.nilai || {}
    }

    // Load dependent data chains based on preselected values
    if (form.value.id_kelas) {
      onKelasChange()
    }
    if (form.value.id_dimensi) {
      onDimensiChange()
    }
    if (form.value.id_elemen) {
      onElemenChange()
    }
    if (form.value.id_sub_elemen) {
      onSubElemenChange()
    }

    // Generate default name if enabled
    updateAssessmentName()
  }
}

// Mapping kelas ke id_fase - sama seperti di index.vue
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

// Event Handlers for filtering - mengadopsi logika dari index.vue
const onKelasChange = async () => {
  // Reset dependent fields
  form.value.id_dimensi = ''
  form.value.id_elemen = ''
  form.value.id_sub_elemen = ''
  form.value.id_capaian = ''
  elemenList.value = []
  subElemenList.value = []
  capaianList.value = []
  
  // Fetch siswa list by kelas
  await fetchSiswaByKelas()
  updateAssessmentName()
}

const onDimensiChange = async () => {
  // Reset dependent fields
  form.value.id_elemen = ''
  form.value.id_sub_elemen = ''
  form.value.id_capaian = ''
  subElemenList.value = []
  capaianList.value = []
  
  if (form.value.id_dimensi) {
    try {
      await elemenStore.fetchElemenByDimensi(form.value.id_dimensi)
      elemenList.value = elemenStore.getElemenList
    } catch (error) {
      console.error('Error loading elemen by dimensi:', error)
    }
  }
  updateAssessmentName()
}

const onElemenChange = async () => {
  // Reset dependent fields
  form.value.id_sub_elemen = ''
  form.value.id_capaian = ''
  capaianList.value = []
  
  if (form.value.id_elemen) {
    try {
      await subElemenStore.fetchSubElemenByElemen(form.value.id_elemen)
      subElemenList.value = subElemenStore.getSubElemenList
    } catch (error) {
      console.error('Error loading sub elemen by elemen:', error)
    }
  }
  updateAssessmentName()
}

const onSubElemenChange = async () => {
  // Reset dependent fields
  form.value.id_capaian = ''
  capaianList.value = []
  
  if (form.value.id_sub_elemen && form.value.id_kelas) {
    try {
      // Use list endpoint directly and filter client-side to avoid 404s on filter endpoints
      const listRes = await axios.get('/list/capaian_kelas')
      const rows = (listRes.data?.success ? listRes.data.data : [])
        .filter(r => r.id_kelas == form.value.id_kelas && r.id_sub_elemen == form.value.id_sub_elemen)

      // Normalize options: use capaian_kelas primary key (ck.id) consistently as id_capaian
      // so downstream logic can resolve id_capaian_kelas without ambiguity
      capaianList.value = (rows || []).map(r => ({
        id_capaian: r.id ?? r.id_capaian, // prefer ck.id, fallback to legacy field if exists
        deskripsi: r.nama_ck || `Capaian ${r.kode_ck || r.id}`,
        id_ck: r.id,
        id_sub_elemen: r.id_sub_elemen
      }))
    } catch (error) {
      console.error('Error fetching capaian_kelas list:', error)
      capaianList.value = []
    }
  }
  updateAssessmentName()
}

const onCapaianChange = async () => {
  // When capaian changes, fetch the assessment count for this capaian
  if (form.value.id_capaian) {
    try {
      // Need to count by capaian_kelas, so map selected id_capaian to its ck id for this kelas+sub elemen
      const rows = capaianList.value || []
      const ck = rows.find(r => r.id_capaian == form.value.id_capaian)
      if (!ck) { assessmentNumber.value = 1; updateAssessmentName(); return }
      // Prefer list endpoint directly to avoid 404s on filter endpoints
      let existing = []
      const listRes = await axios.get('/list/assessment')
      if (listRes.data?.success) {
        existing = (listRes.data.data || []).filter(a => a.id_capaian_kelas == ck.id_ck)
      }
      // If editing, exclude current assessment id if present
      const count = props.isEdit && props.selectedAssessment
        ? existing.filter(a => a.id_assessment != props.selectedAssessment.id_assessment).length
        : existing.length
      assessmentNumber.value = (count || 0) + 1
    } catch (error) {
      console.error('Error fetching assessment count:', error)
      assessmentNumber.value = 1
    }
  }
  updateAssessmentName()
}

// Update assessment name based on selections
const updateAssessmentName = () => {
  if (!autoNaming.value || props.isEdit) return
  
  if (form.value.id_capaian) {
    const capaian = capaianList.value.find(c => c.id_capaian == form.value.id_capaian)
    const capaianName = capaian ? capaian.deskripsi.substring(0, 40) : ''
    form.value.nama_assessment = `Assessment ${assessmentNumber.value} - ${capaianName}...`
  } else if (form.value.id_sub_elemen) {
    const subElemen = subElemenList.value.find(se => se.id_sub_elemen == form.value.id_sub_elemen)
    form.value.nama_assessment = `Assessment ${assessmentNumber.value} - ${subElemen?.nama_sub_elemen || ''}`
  } else if (form.value.id_elemen) {
    const elemen = elemenList.value.find(e => e.id_elemen == form.value.id_elemen)
    form.value.nama_assessment = `Assessment ${assessmentNumber.value} - ${elemen?.nama_elemen || ''}`
  } else if (form.value.id_dimensi) {
    const dimensi = dimensiList.value.find(d => d.id_dimensi == form.value.id_dimensi)
    form.value.nama_assessment = `Assessment ${assessmentNumber.value} - ${dimensi?.nama_dimensi || ''}`
  } else if (form.value.id_kelas) {
    const kelas = kelasList.value.find(k => k.id_kelas == form.value.id_kelas)
    form.value.nama_assessment = `Assessment ${assessmentNumber.value} - ${kelas?.nama_kelas || ''}`
  } else {
    form.value.nama_assessment = `Assessment ${assessmentNumber.value}`
  }
}

// Fetch siswa by kelas
const fetchSiswaByKelas = async () => {
  if (!form.value.id_kelas) {
    siswaList.value = []
    return
  }
  
  try {
    const response = await axios.get(`/list/siswa?id_kelas=${form.value.id_kelas}`)
    
    if (response.data.success) {
      siswaList.value = response.data.data.filter(siswa => siswa.id_kelas == form.value.id_kelas)
      
      // Initialize nilai for new students with '-' for unselected values
      siswaList.value.forEach(siswa => {
        if (!form.value.nilai[siswa.id_siswa] || form.value.nilai[siswa.id_siswa] === null) {
          form.value.nilai[siswa.id_siswa] = '-'
        }
      })
    } else {
      siswaList.value = []
    }
  } catch (error) {
    console.error('Error loading students for class:', error)
    siswaList.value = []
  }
}

// Submit form
const submitForm = async () => {
  if (!isFormValid.value) return
  
  try {
    isSubmitting.value = true
    
    // Prepare assessment data with proper validation and type conversion
    const assessmentData = {
      nama_assessment: form.value.nama_assessment.trim(),
      id_kelas: parseInt(form.value.id_kelas),
      id_dimensi: parseInt(form.value.id_dimensi),
      id_elemen: parseInt(form.value.id_elemen),
      id_sub_elemen: parseInt(form.value.id_sub_elemen),
      id_capaian: parseInt(form.value.id_capaian),
      nilai: form.value.nilai || '',
      deskripsi: 'Assessment otomatis dari form',
      bobot: 20
    }
    
    // Validate required fields
    if (!assessmentData.nama_assessment) {
      throw new Error('Nama assessment tidak boleh kosong');
    }
    
    if (!assessmentData.id_capaian || isNaN(assessmentData.id_capaian)) {
      throw new Error('Capaian harus dipilih');
    }
    
    console.log('Form data being submitted:', assessmentData);
    
    // Emit save event with form data
    emit('save', assessmentData)
  } catch (error) {
    console.error('Error submitting form:', error)
    // You might want to show an error message to the user here
  } finally {
    isSubmitting.value = false
  }
}

// Watch for changes in autoNaming
watch(autoNaming, (newValue) => {
  if (newValue) {
    updateAssessmentName()
  }
})

// Lifecycle hooks
onMounted(async () => {
  try {
    // Load initial data
    await Promise.all([
      kelasStore.fetchKelasList(),
      dimensiStore.fetchDimensiList()
    ])
    
    // Load initial form (both edit and create when parent preselects)
    loadFormData()
  } catch (error) {
    console.error('Error loading initial data:', error)
  }
})

// Watchers
watch(() => props.selectedAssessment, () => {
  if (props.selectedAssessment) {
    loadFormData()
  }
})

// Watch for changes in form fields to update assessment name
watch(() => [
  form.value.id_kelas,
  form.value.id_dimensi,
  form.value.id_elemen,
  form.value.id_sub_elemen,
  form.value.id_capaian
], () => {
  if (autoNaming.value) {
    updateAssessmentName()
  }
}, { deep: true })
</script>