<template>
  <div class="min-h-screen bg-gray-50 py-8" style="padding-top: 5rem;">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="forbidden" class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded relative mb-6">
        Anda bukan pengampu kelas untuk assessment ini. Akses dibatasi.
      </div>
      <div v-if="loading" class="flex justify-center items-center min-h-[300px]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
        <strong class="font-bold">Error: </strong>{{ error }}
      </div>
      <div v-else>
        <!-- Info Assessment -->
        <div class="bg-white rounded-xl shadow border border-gray-100 p-4 mb-6">
          <div class="mb-2 text-xs text-gray-500">Assessment #{{ assessment?.id_assessment }}</div>
          <div class="font-bold text-lg text-gray-900 mb-1">{{ assessment?.nama_kelas }} - {{ assessment?.nama_dimensi }}</div>
          <div class="text-sm text-gray-600 mb-1">{{ assessment?.nama_elemen }} > {{ assessment?.nama_sub_elemen }}</div>
          <div class="text-xs text-gray-500">{{ assessment?.kompetensi }}</div>
        </div>
        <!-- Tabel Siswa & Penilaian -->
        <div class="bg-white rounded-xl shadow border border-gray-100 p-4">
          <div class="font-semibold text-base mb-4">Penilaian Siswa</div>
          <div v-if="siswaList.length === 0" class="text-center text-gray-400 py-8">Tidak ada siswa untuk assessment ini.</div>
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">NISN</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nilai</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="siswa in siswaList" :key="siswa.id_siswa">
                  <td class="px-4 py-2 text-sm text-gray-900">{{ siswa.nama }}</td>
                  <td class="px-4 py-2 text-sm text-gray-900">{{ siswa.nisn }}</td>
                  <td class="px-4 py-2 text-sm text-gray-900">{{ siswa.kelas || siswa.id_kelas }}</td>
                  <td class="px-4 py-2">
                    <div class="flex gap-3">
                      <label v-for="opt in ['MB','SB','BSH','SAB']" :key="opt" class="flex items-center gap-1">
                        <input type="radio" :name="'nilai-' + siswa.id_siswa" :value="opt" v-model="nilaiMap[siswa.id_siswa]" :disabled="forbidden" />
                        <span>{{ opt }}</span>
                      </label>
                    </div>
                  </td>
                  <td class="px-4 py-2">
                    <button @click="simpanNilai(siswa)" :disabled="nilaiLoading[siswa.id_siswa] || forbidden" class="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                      <span v-if="nilaiLoading[siswa.id_siswa]">Menyimpan...</span>
                      <span v-else>Simpan</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Notifikasi -->
        <div v-if="notif" :class="['mt-4 text-center rounded p-2', notifType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
          {{ notif }}
        </div>
        <div class="flex justify-end mt-6">
          <button @click="submitAll" :disabled="loadingSubmit" class="px-6 py-2 rounded-lg bg-green-600 text-white font-bold text-base hover:bg-green-700 disabled:opacity-50">
            <span v-if="loadingSubmit">Menyimpan...</span>
            <span v-else>Submit</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/plugins/axios'
import { useAuthStore } from '@/stores/auth'
import { useGuruStore } from '@/stores/guru'

const route = useRoute()
const assessment = ref(null)
const siswaList = ref([])
const nilaiMap = ref({})
const nilaiLoading = ref({})
const loading = ref(true)
const error = ref(null)
const notif = ref('')
const notifType = ref('success')
const loadingSubmit = ref(false)
const forbidden = ref(false)

const fetchAssessmentAndSiswa = async () => {
  loading.value = true
  error.value = null
  try {
    // Fetch assessment detail
    const resAss = await axios.get(`/view/assessment/${route.params.id}`)
    if (resAss.data.success) {
      assessment.value = resAss.data.data
    } else {
      throw new Error('Gagal mengambil data assessment')
    }
    // Fetch siswa list (by kelas)
    const idKelas = assessment.value.id_kelas
    // Access guard for guru
    const authStore = useAuthStore()
    if (!authStore.isAdmin) {
      const guruStore = useGuruStore()
      let currentGuruId = guruStore.getCurrentGuruId
      if (!currentGuruId) {
        try { await guruStore.fetchCurrentGuruFromToken() } catch (e) {}
        currentGuruId = guruStore.getCurrentGuruId
      }
      const pengRes = await axios.get('/list/pengampu')
      const allowed = (pengRes.data?.data || []).some(p => p.id_guru == currentGuruId && p.id_kelas == idKelas)
      if (!allowed) {
        forbidden.value = true
      }
    }
    const resSiswa = await axios.get(`/list/siswa?id_kelas=${idKelas}`)
    if (resSiswa.data.success) {
      siswaList.value = resSiswa.data.data
      // Inisialisasi nilaiMap dari data assessment jika ada
      if (assessment.value.nilai) {
        siswaList.value.forEach(siswa => {
          nilaiMap.value[siswa.id_siswa] = assessment.value.nilai[siswa.id_siswa] || ''
        })
      } else {
        siswaList.value.forEach(siswa => {
          nilaiMap.value[siswa.id_siswa] = ''
        })
      }
    } else {
      throw new Error('Gagal mengambil data siswa')
    }
  } catch (err) {
    error.value = err.message || 'Terjadi kesalahan saat mengambil data'
  } finally {
    loading.value = false
  }
}

const simpanNilai = async (siswa) => {
  nilaiLoading.value[siswa.id_siswa] = true
  notif.value = ''
  try {
    const nilai = nilaiMap.value[siswa.id_siswa]
    // Validasi nilai
    if (nilai === '' || isNaN(nilai) || nilai < 0 || nilai > 100) {
      notif.value = 'Nilai harus diisi antara 0-100'
      notifType.value = 'error'
      return
    }
    // Kirim ke backend (endpoint contoh: /update/nilai)
    const res = await axios.post('/update/nilai', {
      id_assessment: assessment.value.id_assessment,
      id_siswa: siswa.id_siswa,
      nilai: Number(nilai)
    })
    if (res.data.success) {
      notif.value = `Nilai untuk ${siswa.nama} berhasil disimpan!`
      notifType.value = 'success'
    } else {
      notif.value = res.data.message || 'Gagal menyimpan nilai'
      notifType.value = 'error'
    }
  } catch (err) {
    notif.value = err.response?.data?.message || err.message || 'Gagal menyimpan nilai'
    notifType.value = 'error'
  } finally {
    nilaiLoading.value[siswa.id_siswa] = false
    setTimeout(() => { notif.value = '' }, 2000)
  }
}

const submitAll = async () => {
  notif.value = ''
  notifType.value = 'success'
  if (forbidden.value) {
    notif.value = 'Anda tidak berhak menginput nilai untuk kelas ini.'
    notifType.value = 'error'
    return
  }
  // Validasi: semua siswa harus dipilih nilainya
  const belumDinilai = siswaList.value.filter(siswa => !nilaiMap.value[siswa.id_siswa])
  if (belumDinilai.length > 0) {
    notif.value = 'Semua siswa harus dipilih nilainya!'
    notifType.value = 'error'
    return
  }
  loadingSubmit.value = true
  try {
    const data = siswaList.value.map(siswa => ({
      id_siswa: siswa.id_siswa,
      id_assessment: assessment.value.id_assessment,
      nilai: nilaiMap.value[siswa.id_siswa]
    }))
    const res = await axios.post('/update/nilai/batch', { penilaian: data })
    if (res.data.success) {
      notif.value = 'Semua penilaian berhasil disimpan!'
      notifType.value = 'success'
    } else {
      notif.value = res.data.message || 'Gagal menyimpan penilaian'
      notifType.value = 'error'
    }
  } catch (err) {
    notif.value = err.response?.data?.message || err.message || 'Gagal menyimpan penilaian'
    notifType.value = 'error'
  } finally {
    loadingSubmit.value = false
    setTimeout(() => { notif.value = '' }, 2000)
  }
}

onMounted(() => {
  fetchAssessmentAndSiswa()
})
</script> 