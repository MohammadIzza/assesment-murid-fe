<template>
  <div class="mx-auto py-10 px-4">
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
      <h1 class="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
        <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        Detail Assessment
      </h1>
      <div v-if="!assessment">
        <div class="text-red-600 font-semibold">Assessment tidak ditemukan.</div>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div class="mb-2"><span class="font-semibold text-gray-700">Kelas:</span> <span class="text-gray-800">{{ kelas?.nama_kelas || '-' }}</span></div>
            <div class="mb-2"><span class="font-semibold text-gray-700">Dimensi:</span> <span class="text-gray-800">{{ dimensi?.nama_dimensi || '-' }}</span></div>
            <div class="mb-2"><span class="font-semibold text-gray-700">Elemen:</span> <span class="text-gray-800">{{ elemen?.nama_elemen || '-' }}</span></div>
            <div class="mb-2"><span class="font-semibold text-gray-700">Sub Elemen:</span> <span class="text-gray-800">{{ subElemen?.nama_sub_elemen || '-' }}</span></div>
            <div class="mb-2"><span class="font-semibold text-gray-700">Capaian:</span> <span class="text-gray-800">{{ capaian?.deskripsi || '-' }}</span></div>
          </div>

        </div>
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
          <button @click="exportData" class="inline-flex items-center justify-center px-4 py-2 border border-green-300 rounded-lg text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-sm hover:shadow-md">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export CSV
          </button>
          <button @click="printData" class="inline-flex items-center justify-center px-4 py-2 border border-purple-300 rounded-lg text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-sm hover:shadow-md">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
            Print
          </button>
        </div>
        <h2 class="text-lg font-semibold mb-3 text-blue-600">Nilai Siswa</h2>
        <div class="overflow-x-auto rounded-xl border border-gray-100 bg-white">
          <table class="min-w-full text-sm border-separate border-spacing-0 rounded-xl overflow-hidden">
            <thead class="bg-gradient-to-r from-blue-100 to-blue-50">
              <tr>
                <th class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200">Nama</th>
                <th class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200">Kelas</th>
                <th class="px-6 py-4 font-bold text-gray-700 uppercase text-center border-b-2 border-blue-200">Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in nilaiSiswaList" :key="row.id_siswa" :class="[ 'hover:bg-blue-50/50 transition-all duration-200 border-b border-gray-100 last:border-b-0']">
                <td class="px-6 py-4 whitespace-nowrap text-gray-900 text-center">{{ row.nama }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900 text-center">{{ row.kelas }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900 text-center">{{ row.nilai }}</td>
              </tr>
              <tr v-if="nilaiSiswaList.length === 0">
                <td colspan="3" class="text-center text-gray-400 py-6">Belum ada nilai siswa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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

const exportData = () => {
  if (!nilaiSiswaList.value.length) {
    alert('Tidak ada data nilai siswa untuk diekspor!')
    return
  }
  const headers = ['Nama', 'Kelas', 'Nilai']
  const csvContent = [
    headers.join(','),
    ...nilaiSiswaList.value.map(row => [
      `"${row.nama}"`,
      `"${row.kelas}"`,
      `"${row.nilai}"`
    ].join(','))
  ].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `nilai-siswa-assessment-${assessment.value?.id_assessment || ''}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const printData = () => {
  if (!nilaiSiswaList.value.length) {
    alert('Tidak ada data nilai siswa untuk dicetak!')
    return
  }
  const printContent = `
    <html>
      <head>
        <title>Detail Assessment</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 32px; color: #222; }
          .header { margin-bottom: 32px; }
          .header h1 { color: #2563eb; margin-bottom: 12px; font-size: 2rem; }
          .header .detail { margin-bottom: 4px; font-size: 1rem; }
          .header .label { font-weight: bold; color: #333; min-width: 120px; display: inline-block; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; }
          th, td { border: 1px solid #bbb; padding: 10px 14px; text-align: center; font-size: 1rem; }
          th { background-color: #f1f5f9; font-weight: bold; color: #2563eb; }
          tr:nth-child(even) { background: #f9fafb; }
          .footer { margin-top: 36px; text-align: right; font-size: 13px; color: #666; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Detail Assessment</h1>
          <div class="detail"><span class="label">Kelas:</span> ${kelas.value?.nama_kelas || '-'}</div>
          <div class="detail"><span class="label">Dimensi:</span> ${dimensi.value?.nama_dimensi || '-'}</div>
          <div class="detail"><span class="label">Elemen:</span> ${elemen.value?.nama_elemen || '-'}</div>
          <div class="detail"><span class="label">Sub Elemen:</span> ${subElemen.value?.nama_sub_elemen || '-'}</div>
          <div class="detail"><span class="label">Capaian:</span> ${capaian.value?.deskripsi || '-'}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Nilai</th>
            </tr>
          </thead>
          <tbody>
            ${nilaiSiswaList.value.map(row => `
              <tr>
                <td>${row.nama}</td>
                <td>${row.kelas}</td>
                <td>${row.nilai}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          Sistem Assessment Murid - Generated by System
        </div>
      </body>
    </html>
  `
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }
}

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