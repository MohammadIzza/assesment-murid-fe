<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-blue-600 rounded-xl shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col">
      <!-- Modal Header -->
      <div class="bg-blue-700 p-4 text-white flex justify-between items-center">
        <h3 class="text-lg font-semibold">
          {{ isEdit ? 'Ubah Assessment' : 'Buat Assessment Baru' }}
        </h3>
        <button @click="$emit('close')" class="text-white hover:text-blue-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Modal Form Content -->
      <div class="bg-white flex-1 overflow-y-auto">
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Assessment Name -->
            <div class="group">
              <label for="nama_assessment" class="block text-sm font-medium text-gray-700 mb-2">
                Nama Assessment <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.nama_assessment"
                type="text"
                id="nama_assessment"
                class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: Quiz 1, UTS, dsb."
                :disabled="isEdit"
              />
            </div>
            
            <!-- Kelas selection -->
            <div class="group">
              <label for="id_kelas" class="block text-sm font-medium text-gray-700 mb-2">
                Kelas <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.id_kelas"
                id="id_kelas"
                class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @change="loadSiswaByKelas"
                :disabled="isEdit"
              >
                <option value="" disabled>Pilih Kelas</option>
                <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas">
                  {{ kelas.nama_kelas }}
                </option>
              </select>
            </div>

            <!-- Dimensi -->
            <div class="group">
              <label for="id_dimensi" class="block text-sm font-medium text-gray-700 mb-2">
                Dimensi <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.id_dimensi"
                id="id_dimensi"
                class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @change="loadElemen"
                :disabled="isEdit"
              >
                <option value="" disabled>Pilih Dimensi</option>
                <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
                  {{ dimensi.nama_dimensi }}
                </option>
              </select>
            </div>

            <!-- Elemen -->
            <div class="group">
              <label for="id_elemen" class="block text-sm font-medium text-gray-700 mb-2">
                Elemen <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.id_elemen"
                id="id_elemen"
                class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @change="loadSubElemen"
                :disabled="isEdit || !form.id_dimensi"
              >
                <option value="" disabled>Pilih Elemen</option>
                <option v-for="elemen in elemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
                  {{ elemen.nama_elemen }}
                </option>
              </select>
            </div>

            <!-- Sub Elemen -->
            <div class="group">
              <label for="id_sub_elemen" class="block text-sm font-medium text-gray-700 mb-2">
                Sub Elemen <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.id_sub_elemen"
                id="id_sub_elemen"
                class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @change="loadCapaian"
                :disabled="isEdit || !form.id_elemen"
              >
                <option value="" disabled>Pilih Sub Elemen</option>
                <option v-for="subElemen in subElemenList" :key="subElemen.id_sub_elemen" :value="subElemen.id_sub_elemen">
                  {{ subElemen.nama_sub_elemen }}
                </option>
              </select>
            </div>

            <!-- Capaian -->
            <div class="group col-span-1 md:col-span-2">
              <label for="id_capaian" class="block text-sm font-medium text-gray-700 mb-2">
                Capaian <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.id_capaian"
                id="id_capaian"
                class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :disabled="isEdit || !form.id_sub_elemen"
              >
                <option value="" disabled>Pilih Capaian</option>
                <option v-for="capaian in capaianList" :key="capaian.id_capaian" :value="capaian.id_capaian">
                  {{ capaian.deskripsi_capaian }}
                </option>
              </select>
            </div>

            <!-- Kompetensi -->
            <div class="group col-span-1 md:col-span-2">
              <label for="kompetensi" class="block text-sm font-medium text-gray-700 mb-2">
                Kompetensi <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.kompetensi"
                type="text"
                id="kompetensi"
                class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan kompetensi yang dinilai"
                :disabled="isEdit"
              />
            </div>

            <!-- Search -->
            <div class="group col-span-1 md:col-span-2 mt-4">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari siswa..."
                  class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Students List -->
          <div class="mt-6 border border-gray-200 rounded-xl overflow-hidden">
            <div class="bg-gray-50 p-4 border-b border-gray-200">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-1 font-medium text-gray-500 text-sm">#</div>
                <div class="col-span-5 font-medium text-gray-500 text-sm">Nama Siswa</div>
                <div class="col-span-6 font-medium text-gray-500 text-sm flex items-center justify-center">
                  Nilai
                </div>
              </div>
            </div>
            
            <div class="overflow-y-auto max-h-[400px]">
              <div 
                v-for="(siswa, index) in filteredSiswaList" 
                :key="siswa.id_siswa"
                class="p-4 border-b border-gray-100 hover:bg-gray-50"
              >
                <div class="grid grid-cols-12 gap-4 items-center">
                  <div class="col-span-1 text-gray-500">{{ index + 1 }}</div>
                  <div class="col-span-5">{{ siswa.nama }}</div>
                  <div class="col-span-6">
                    <div class="flex items-center justify-between space-x-2">
                      <label class="flex items-center">
                        <input
                          type="radio"
                          :name="`nilai_${siswa.id_siswa}`"
                          :value="'MB'"
                          v-model="form.nilai[siswa.id_siswa]"
                          class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span class="ml-2 text-sm text-gray-700">MB</span>
                      </label>
                      
                      <label class="flex items-center">
                        <input
                          type="radio"
                          :name="`nilai_${siswa.id_siswa}`"
                          :value="'SB'"
                          v-model="form.nilai[siswa.id_siswa]"
                          class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span class="ml-2 text-sm text-gray-700">SB</span>
                      </label>
                      
                      <label class="flex items-center">
                        <input
                          type="radio"
                          :name="`nilai_${siswa.id_siswa}`"
                          :value="'BSH'"
                          v-model="form.nilai[siswa.id_siswa]"
                          class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span class="ml-2 text-sm text-gray-700">BSH</span>
                      </label>
                      
                      <label class="flex items-center">
                        <input
                          type="radio"
                          :name="`nilai_${siswa.id_siswa}`"
                          :value="'SAB'"
                          v-model="form.nilai[siswa.id_siswa]"
                          class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span class="ml-2 text-sm text-gray-700">SAB</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="filteredSiswaList.length === 0" class="p-8 text-center text-gray-500">
                {{ form.id_kelas ? 'Tidak ada siswa ditemukan' : 'Pilih kelas untuk melihat daftar siswa' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          Batal
        </button>
        <button 
          @click="submitForm"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :disabled="!isFormValid || isSubmitting"
        >
          <span v-if="isSubmitting">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
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
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useKelasStore } from '@/stores/kelas'
import { useDimensiStore } from '@/stores/dimensi'
import { useElemenStore } from '@/stores/elemen'
import { useSubElemenStore } from '@/stores/subElemen'
import { useCapaianStore } from '@/stores/capaian'
import { useSiswaStore } from '@/stores/siswa'

// Define props and emits
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

const emit = defineEmits(['close', 'save'])

// Initialize stores
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()
const siswaStore = useSiswaStore()

// State variables
const isSubmitting = ref(false)
const searchQuery = ref('')
const siswaList = ref([])
const elemenList = ref([])
const subElemenList = ref([])
const capaianList = ref([])

// Form state
const form = ref({
  nama_assessment: props.isEdit ? '' : `Assessment ${new Date().getTime()}`,
  id_kelas: '',
  id_dimensi: '',
  id_elemen: '',
  id_sub_elemen: '',
  id_capaian: '',
  kompetensi: '',
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
    siswa.nisn?.toLowerCase().includes(query)
  )
})

const isFormValid = computed(() => {
  // Basic form validation
  if (!form.value.nama_assessment || !form.value.id_kelas || !form.value.id_dimensi || 
      !form.value.id_elemen || !form.value.id_sub_elemen || !form.value.id_capaian || 
      !form.value.kompetensi) {
    return false
  }
  
  // Check if at least one student has a value
  const hasValues = Object.values(form.value.nilai).some(val => !!val)
  return hasValues
})

// Methods
const loadSiswaByKelas = async () => {
  if (!form.value.id_kelas) return
  
  try {
    await siswaStore.fetchSiswaByKelas(form.value.id_kelas)
    siswaList.value = siswaStore.getSiswaList
    
    // Initialize nilai object for all students
    siswaList.value.forEach(siswa => {
      if (!form.value.nilai[siswa.id_siswa]) {
        form.value.nilai[siswa.id_siswa] = null
      }
    })
  } catch (error) {
    console.error('Error loading students for class:', error)
  }
}

const loadElemen = async () => {
  if (!form.value.id_dimensi) return
  
  // Reset dependent fields
  form.value.id_elemen = ''
  form.value.id_sub_elemen = ''
  form.value.id_capaian = ''
  elemenList.value = []
  subElemenList.value = []
  capaianList.value = []
  
  try {
    await elemenStore.fetchElemenByDimensi(form.value.id_dimensi)
    elemenList.value = elemenStore.getElemenList
  } catch (error) {
    console.error('Error loading elemen:', error)
  }
}

const loadSubElemen = async () => {
  if (!form.value.id_elemen) return
  
  // Reset dependent fields
  form.value.id_sub_elemen = ''
  form.value.id_capaian = ''
  subElemenList.value = []
  capaianList.value = []
  
  try {
    await subElemenStore.fetchSubElemenByElemen(form.value.id_elemen)
    subElemenList.value = subElemenStore.getSubElemenList
  } catch (error) {
    console.error('Error loading sub elemen:', error)
  }
}

const loadCapaian = async () => {
  if (!form.value.id_sub_elemen) return
  
  // Reset dependent field
  form.value.id_capaian = ''
  capaianList.value = []
  
  try {
    await capaianStore.fetchCapaianBySubElemen(form.value.id_sub_elemen)
    capaianList.value = capaianStore.getCapaianList
  } catch (error) {
    console.error('Error loading capaian:', error)
  }
}

const loadFormData = () => {
  if (props.isEdit && props.selectedAssessment) {
    form.value.nama_assessment = props.selectedAssessment.nama_assessment || `Assessment ${props.selectedAssessment.id_assessment}`
    form.value.id_kelas = props.selectedAssessment.id_kelas
    form.value.id_dimensi = props.selectedAssessment.id_dimensi
    form.value.id_elemen = props.selectedAssessment.id_elemen
    form.value.id_sub_elemen = props.selectedAssessment.id_sub_elemen
    form.value.id_capaian = props.selectedAssessment.id_capaian
    form.value.kompetensi = props.selectedAssessment.kompetensi
    form.value.nilai = { ...props.selectedAssessment.nilai }
    
    // Load dependent data
    loadSiswaByKelas()
    loadElemen()
    loadSubElemen()
    loadCapaian()
  }
}

const submitForm = async () => {
  if (!isFormValid.value) return
  
  try {
    isSubmitting.value = true
    
    // Prepare data for submission
    const assessmentData = {
      nama_assessment: form.value.nama_assessment,
      id_kelas: form.value.id_kelas,
      id_dimensi: form.value.id_dimensi,
      id_elemen: form.value.id_elemen,
      id_sub_elemen: form.value.id_sub_elemen,
      id_capaian: form.value.id_capaian,
      kompetensi: form.value.kompetensi,
      nilai: form.value.nilai
    }
    
    // Emit save event with form data
    emit('save', assessmentData)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Lifecycle hooks
onMounted(async () => {
  try {
    // Load initial data
    await Promise.all([
      kelasStore.fetchKelasList(),
      dimensiStore.fetchDimensiList()
    ])
    
    // Set default assessment name
    if (!form.value.nama_assessment) {
      form.value.nama_assessment = `Assessment ${new Date().getTime().toString().slice(-6)}`
    }
    
    // If edit mode, load the assessment data
    loadFormData()
  } catch (error) {
    console.error('Error loading initial data:', error)
  }
})

// Watchers
watch(() => props.selectedAssessment, loadFormData)
</script>