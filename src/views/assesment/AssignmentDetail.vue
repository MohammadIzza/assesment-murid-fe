<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Detail Assessment</h1>
    <div v-if="!assessment">
      <div class="text-red-600 font-semibold">Assessment tidak ditemukan.</div>
    </div>
    <div v-else>
      <div class="mb-6">
        <div><b>Kelas:</b> {{ kelas?.nama_kelas || '-' }}</div>
        <div><b>Dimensi:</b> {{ dimensi?.nama_dimensi || '-' }}</div>
        <div><b>Elemen:</b> {{ elemen?.nama_elemen || '-' }}</div>
        <div><b>Sub Elemen:</b> {{ subElemen?.nama_sub_elemen || '-' }}</div>
        <div><b>Capaian:</b> {{ capaian?.deskripsi || '-' }}</div>
        <div><b>Nama Assessment:</b> {{ assessment?.nama_assessment || '-' }}</div>
        <div><b>Deskripsi:</b> {{ assessment?.deskripsi || '-' }}</div>
      </div>
      <h2 class="text-lg font-semibold mb-2">Nilai Siswa</h2>
      <table class="min-w-full border">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Nilai</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in nilaiSiswaList" :key="row.id_siswa">
            <td>{{ row.nama }}</td>
            <td>{{ row.kelas }}</td>
            <td>{{ row.nilai }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/plugins/axios'

const route = useRoute()
const idAssessment = route.query.id_assessment

const assessment = ref(null)
const capaian = ref(null)
const subElemen = ref(null)
const elemen = ref(null)
const dimensi = ref(null)
const kelas = ref(null)
const nilaiSiswaList = ref([])

onMounted(async () => {
  // 1. Fetch all assessment, lalu filter
  const allAssRes = await axios.get('/list/assessment')
  assessment.value = allAssRes.data.data.find(a => a.id_assessment == idAssessment)
  if (!assessment.value) {
    return
  }

  // 2. Trace relasi dari id_capaian assessment
  const capaianList = (await axios.get('/list/capaian')).data.data
  capaian.value = capaianList.find(c => c.id_capaian == assessment.value.id_capaian)
  const subElemenList = (await axios.get('/list/sub_elemen')).data.data
  subElemen.value = capaian.value ? subElemenList.find(se => se.id_sub_elemen == capaian.value.id_sub_elemen) : null
  const elemenList = (await axios.get('/list/elemen')).data.data
  elemen.value = subElemen.value ? elemenList.find(e => e.id_elemen == subElemen.value.id_elemen) : null
  const dimensiList = (await axios.get('/list/dimensi')).data.data
  dimensi.value = elemen.value ? dimensiList.find(d => d.id_dimensi == elemen.value.id_dimensi) : null

  // 3. Fetch nilai & siswa
  const nilaiList = (await axios.get('/list/nilai')).data.data.filter(n => n.id_assessment == idAssessment)
  const siswaList = (await axios.get('/list/siswa')).data.data
  const kelasList = (await axios.get('/list/kelas')).data.data

  nilaiSiswaList.value = nilaiList.map(n => {
    const siswa = siswaList.find(s => s.id_siswa == n.id_siswa)
    const kelasObj = siswa ? kelasList.find(k => k.id_kelas == siswa.id_kelas) : null
    return {
      id_siswa: n.id_siswa,
      nama: siswa?.nama || '-',
      kelas: kelasObj?.nama_kelas || '-',
      nilai: n.nilai || '-'
    }
  })

  // 4. Set kelas utama (dari siswa pertama)
  if (nilaiSiswaList.value.length > 0) {
    kelas.value = kelasList.find(k => k.nama_kelas == nilaiSiswaList.value[0].kelas)
  }
})
</script> 