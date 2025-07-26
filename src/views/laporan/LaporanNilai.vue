<!-- filepath: g:\KERJAAN\Om Nusa\assesment-murid-fe\src\views\laporan\LaporanNilai.vue -->
<template>
    <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="bg-blue-700 dark:bg-blue-900 px-8 py-6 rounded-xl mb-8">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-blue-600 dark:bg-blue-800 rounded-xl">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-white mb-2">Laporan Nilai</h1>
          <p class="text-blue-100 text-base">Laporan penilaian siswa</p>
        </div>
      </div>
    </div>

    <!-- Filter & Search Section -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      <!-- Left column: Filters -->
      <div class="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kelas</label>
          <select 
            v-model="selectedKelas" 
            @change="onKelasChange"
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="">Semua Kelas</option>
            <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas">
              {{ kelas.nama_kelas }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dimensi</label>
          <select 
            v-model="selectedDimensi"
            @change="onDimensiChange" 
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="">Semua Dimensi</option>
            <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
              {{ dimensi.nama_dimensi }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Elemen</label>
          <select 
            v-model="selectedElemen"
            @change="onElemenChange" 
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            :disabled="!selectedDimensi"
          >
            <option value="">Semua Elemen</option>
            <option v-for="elemen in filteredElemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
              {{ elemen.nama_elemen }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
          <select 
            v-model="selectedSemester"
            class="block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="">Semua Semester</option>
            <option value="1">Semester Ganjil</option>
            <option value="2">Semester Genap</option>
          </select>
        </div>
      </div>

      <!-- Right column: Search -->
      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cari Siswa</label>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Nama atau NISN"
            class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Stats Cards Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Assessment Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total KD</h3>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ totalAssessments }}</p>
      </div>

      <!-- Sudah Dinilai Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Sudah Dinilai</h3>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          {{ sudahDinilai }}/{{ totalMaksimal }} ({{ persentaseDinilai }}%)
        </p>
      </div>

      <!-- Total Siswa Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Siswa (Kelas)</h3>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ totalSiswa }}</p>
      </div>

      <!-- Tingkat Ketuntasan Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Tingkat Ketuntasan</h3>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ tingkatKetuntasan }} - {{ selectedSiswaName }}</p>
      </div>
    </div>

    <!-- Main Content Section with 2 columns -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Student List -->
      <div class="col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Daftar Siswa</h2>
          </div>
          
          <div class="overflow-y-auto max-h-[500px]">
            <div v-if="loading" class="p-6 text-center text-gray-500 dark:text-gray-400">
              <svg class="animate-spin h-8 w-8 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memuat data siswa...
            </div>
            
            <div v-else-if="filteredSiswaList.length === 0" class="p-6 text-center text-gray-500 dark:text-gray-400">
              Tidak ada siswa yang ditemukan
            </div>

            <div v-else>
              <div 
                v-for="siswa in filteredSiswaList" 
                :key="siswa.id_siswa" 
                @click="selectSiswa(siswa)"
                :class="[
                  'p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20',
                  {'bg-blue-50 dark:bg-blue-900/30': selectedSiswa?.id_siswa === siswa.id_siswa}
                ]"
              >
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ siswa.nama }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ siswa.nisn || 'NISN: -' }}</p>
                </div>
                <div>
                  <span 
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getSiswaStatusClass(siswa)
                    ]"
                  >
                    {{ getSiswaStatus(siswa) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Distribution Chart -->
        <div v-if="selectedSiswa" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mt-6">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Distribusi Nilai - {{ selectedSiswaName }}</h2>
          </div>
          
          <div class="p-6">
            <!-- Chart will be rendered here -->
            <div class="flex items-end h-48 space-x-4">
              <div class="flex flex-col items-center">
                <div class="w-16 bg-red-500 dark:bg-red-600" :style="`height: ${mbPercentage}%`"></div>
                <div class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">{{ mbPercentage }}%</div>
                <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">MB</div>
              </div>
              
              <div class="flex flex-col items-center">
                <div class="w-16 bg-amber-500 dark:bg-amber-600" :style="`height: ${sbPercentage}%`"></div>
                <div class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">{{ sbPercentage }}%</div>
                <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">SB</div>
              </div>
              
              <div class="flex flex-col items-center">
                <div class="w-16 bg-blue-500 dark:bg-blue-600" :style="`height: ${bshPercentage}%`"></div>
                <div class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">{{ bshPercentage }}%</div>
                <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">BSH</div>
              </div>
              
              <div class="flex flex-col items-center">
                <div class="w-16 bg-green-500 dark:bg-green-600" :style="`height: ${sabPercentage}%`"></div>
                <div class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">{{ sabPercentage }}%</div>
                <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">SAB</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Assessment Table -->
      <div class="col-span-1 lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ selectedSiswa ? `Data Penilaian SKL & Kompetensi Dasar ${selectedSiswaName}` : 'Data Penilaian' }}
            </h2>
            <button 
              @click="previewRapor" 
              :disabled="!selectedSiswa"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
              </svg>
              Cetak Rapor
            </button>
          </div>
          
          <div v-if="!selectedSiswa" class="p-10 text-center text-gray-500 dark:text-gray-400">
            Pilih siswa untuk melihat data penilaian
          </div>

          <div v-else-if="loading" class="p-10 text-center text-gray-500 dark:text-gray-400">
            <svg class="animate-spin h-8 w-8 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat data penilaian...
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full min-w-full">
              <!-- Header -->
              <thead>
                <tr class="bg-blue-600 text-white dark:bg-blue-800">
                  <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SKL</th>
                  <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">NO KD</th>
                  <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">KOMPETENSI</th>
                  <th class="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider" v-for="n in 6" :key="n">{{ n }}</th>
                  <th class="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">RATA-RATA</th>
                  <th class="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">STATUS</th>
                </tr>
              </thead>
              
              <!-- Body -->
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <!-- For each dimensi -->
                <template v-for="(dimensi, dimIndex) in filteredDimensiForSiswa" :key="dimensi.id_dimensi">
                  <!-- Dimensi header -->
                  <tr class="bg-green-500 dark:bg-green-700 text-white">
                    <td colspan="100%" class="px-6 py-3 font-medium">
                      {{ dimensi.nama_dimensi }}
                    </td>
                  </tr>

                  <!-- Display elemen groups -->
                  <template v-for="(elemen, elemIndex) in getElemenForDimensi(dimensi.id_dimensi)" :key="elemen.id_elemen">
                    <!-- Display each capaian within the elemen -->
                    <template v-for="(capaian, capIndex) in getCapaianForSiswa(elemen.id_elemen)" :key="capaian.id_capaian">
                      <tr :class="capIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'">
                        <!-- For first row in this elemen, show the dimension letter (A, B, etc) -->
                        <td v-if="capIndex === 0" :rowspan="getCapaianCountForElemen(elemen.id_elemen)" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700 dark:text-green-300 align-top">
                          {{ getElemenLetter(dimIndex) }}
                        </td>
                        <template v-else><!-- Empty cell, rowspan handled above --></template>
                        
                        <!-- Show capaian number -->
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {{ capIndex + 1 }}
                        </td>
                        
                        <!-- Kompetensi description -->
                        <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                          {{ capaian.deskripsi }}
                        </td>
                        
                        <!-- Assessment columns (6 columns) -->
                        <template v-for="n in 6" :key="n">
                          <td class="px-3 py-4 text-center">
                            <div class="inline-flex items-center justify-center w-10 h-10 rounded-full"
                              :class="getNilaiClass(getAssessmentValue(capaian.id_capaian, n-1))">
                              {{ getAssessmentValue(capaian.id_capaian, n-1) || '-' }}
                            </div>
                          </td>
                        </template>
                        
                        <!-- Average score -->
                        <td class="px-3 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {{ calculateAverageForCapaian(capaian.id_capaian).toFixed(1) }}
                        </td>
                        
                        <!-- Status (Tuntas/Belum Tuntas) -->
                        <td class="px-3 py-4 text-center">
                          <span 
                            :class="[
                              'px-2 py-1 text-xs font-medium rounded-full',
                              calculateAverageForCapaian(capaian.id_capaian) >= 3 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                            ]"
                          >
                            {{ calculateAverageForCapaian(capaian.id_capaian) >= 3 ? 'Tuntas' : 'Belum Tuntas' }}
                          </span>
                        </td>
                      </tr>
                    </template>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- PDF Preview Modal -->
    <div v-if="showPreview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Preview Cetak Rapor - {{ selectedSiswaName }}
          </h2>
          <button @click="showPreview = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-6">
          <!-- PDF Preview content -->
          <div class="border border-gray-300 dark:border-gray-600 rounded-lg bg-white text-black p-10 min-h-[60vh]">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="text-2xl font-bold mb-2">RAPOR SKL KEKHASAN SEKOLAH ISLAM TERPADU</h1>
              <h2 class="text-xl font-semibold mb-4">SDIT QURDUL QUDWAH</h2>
              <p class="text-sm">Jl Imam Bonjol Kota A, Lingkungan Sudimulyo Kelurahan Bina Wirausaha Kodya Bandar Lampung Barat</p>
            </div>
            
            <!-- Student Info -->
            <div class="mb-8 flex justify-between">
              <div>
                <p><span class="font-semibold">Nama Siswa:</span> {{ selectedSiswa?.nama }}</p>
                <p><span class="font-semibold">NISN:</span> {{ selectedSiswa?.nisn || '-' }}</p>
                <p><span class="font-semibold">Kelas:</span> {{ getNamaKelas(selectedSiswa?.id_kelas) }}</p>
              </div>
              <div>
                <p><span class="font-semibold">Semester / Tahap:</span> {{ selectedSemester === '1' ? 'Semester Ganjil' : 'Semester Genap' }}</p>
                <p><span class="font-semibold">Tahun Ajaran:</span> 2024/2025</p>
              </div>
            </div>
            
            <!-- Assessment Table -->
            <table class="min-w-full border border-gray-300">
              <thead>
                <tr class="bg-blue-100">
                  <th class="border border-gray-300 px-4 py-2 text-left">No</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Dimensi</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Elemen</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Sub Elemen</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Capaian Kelas</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">MB</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">SB</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">BSH</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">SAB</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(capaian, index) in siswaCapaianList" :key="index" class="border-b border-gray-300">
                  <td class="border-r border-gray-300 px-4 py-2">{{ index + 1 }}</td>
                  <td class="border-r border-gray-300 px-4 py-2">{{ capaian.nama_dimensi }}</td>
                  <td class="border-r border-gray-300 px-4 py-2">{{ capaian.nama_elemen }}</td>
                  <td class="border-r border-gray-300 px-4 py-2">{{ capaian.nama_sub_elemen }}</td>
                  <td class="border-r border-gray-300 px-4 py-2">{{ truncateText(capaian.deskripsi, 80) }}</td>
                  <td class="border-r border-gray-300 px-4 py-2 text-center">
                    <span v-if="getNilaiAverage(capaian.id_capaian) === 'MB'" class="inline-block w-5 h-5 bg-red-500 rounded-full"></span>
                  </td>
                  <td class="border-r border-gray-300 px-4 py-2 text-center">
                    <span v-if="getNilaiAverage(capaian.id_capaian) === 'SB'" class="inline-block w-5 h-5 bg-yellow-500 rounded-full"></span>
                  </td>
                  <td class="border-r border-gray-300 px-4 py-2 text-center">
                    <span v-if="getNilaiAverage(capaian.id_capaian) === 'BSH'" class="inline-block w-5 h-5 bg-blue-500 rounded-full"></span>
                  </td>
                  <td class="border-r border-gray-300 px-4 py-2 text-center">
                    <span v-if="getNilaiAverage(capaian.id_capaian) === 'SAB'" class="inline-block w-5 h-5 bg-green-500 rounded-full"></span>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Signature Section -->
            <div class="mt-10 flex justify-between">
              <div class="text-center">
                <p>Orang Tua/Wali</p>
                <div class="h-20"></div>
                <p>____________________</p>
              </div>
              <div class="text-center">
                <p>Wali Kelas</p>
                <div class="h-20"></div>
                <p>____________________</p>
              </div>
              <div class="text-center">
                <p>Kepala Sekolah</p>
                <div class="h-20"></div>
                <p>____________________</p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button @click="printRapor" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"></path>
            </svg>
            Cetak Rapor
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useKelasStore } from '@/stores/kelas';
import { useDimensiStore } from '@/stores/dimensi';
import { useElemenStore } from '@/stores/elemen';
import { useSubElemenStore } from '@/stores/subElemen';
import { useCapaianStore } from '@/stores/capaian';
import { useAssesmentStore } from '@/stores/assesment';
import { useThemeStore } from '@/stores/theme';
import axios from '@/plugins/axios';

// Store initialization
const kelasStore = useKelasStore();
const dimensiStore = useDimensiStore();
const elemenStore = useElemenStore();
const subElemenStore = useSubElemenStore();
const capaianStore = useCapaianStore();
const assessmentStore = useAssesmentStore();
const themeStore = useThemeStore();

// State
const loading = ref(false);
const searchQuery = ref('');
const selectedKelas = ref('');
const selectedDimensi = ref('');
const selectedElemen = ref('');
const selectedSemester = ref('');
const selectedSiswa = ref(null);
const showPreview = ref(false);

// Data lists
const kelasList = ref([]);
const dimensiList = ref([]);
const elemenList = ref([]);
const subElemenList = ref([]);
const capaianList = ref([]);
const siswaList = ref([]);
const assessmentList = ref([]);
const siswaCapaianList = ref([]);

// Stats
const totalAssessments = ref(0);
const sudahDinilai = ref(0);
const totalMaksimal = ref(0);
const totalSiswa = ref(0);
const tingkatKetuntasan = ref('0%');

const mbPercentage = ref(0);
const sbPercentage = ref(0);
const bshPercentage = ref(0);
const sabPercentage = ref(0);

// Computed
const filteredElemenList = computed(() => {
  if (!selectedDimensi.value) return [];
  return elemenList.value.filter(e => e.id_dimensi == selectedDimensi.value);
});

const selectedSiswaName = computed(() => {
  return selectedSiswa.value?.nama || 'Belum dipilih';
});

const persentaseDinilai = computed(() => {
  if (totalMaksimal.value === 0) return 0;
  return Math.round((sudahDinilai.value / totalMaksimal.value) * 100);
});

const filteredSiswaList = computed(() => {
  if (!siswaList.value.length) return [];
  
  let filtered = siswaList.value;
  
  // Apply kelas filter
  if (selectedKelas.value) {
    filtered = filtered.filter(s => s.id_kelas == selectedKelas.value);
  }
  
  // Apply search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(s => 
      (s.nama && s.nama.toLowerCase().includes(query)) ||
      (s.nisn && s.nisn.toLowerCase().includes(query))
    );
  }
  
  return filtered;
});

const filteredDimensiForSiswa = computed(() => {
  if (!dimensiList.value.length || !selectedSiswa.value) return [];
  
  let filtered = dimensiList.value;
  
  // Apply dimensi filter
  if (selectedDimensi.value) {
    filtered = filtered.filter(d => d.id_dimensi == selectedDimensi.value);
  }
  
  return filtered;
});

// Helper methods
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const getNamaKelas = (id) => {
  const kelas = kelasList.value.find(k => k.id_kelas == id);
  return kelas ? kelas.nama_kelas : 'N/A';
};

const getElemenLetter = (index) => {
  return String.fromCharCode(65 + index); // A, B, C, ...
};

const getElemenForDimensi = (id_dimensi) => {
  if (!id_dimensi) return [];
  
  let filtered = elemenList.value.filter(e => e.id_dimensi == id_dimensi);
  
  if (selectedElemen.value) {
    filtered = filtered.filter(e => e.id_elemen == selectedElemen.value);
  }
  
  return filtered;
};

const getCapaianForSiswa = (id_elemen) => {
  if (!id_elemen || !selectedSiswa.value) return [];
  
  // Get all sub elements for this element
  const subElems = subElemenList.value.filter(se => se.id_elemen == id_elemen);
  
  // Get all capaian for these sub elements
  let allCapaian = [];
  subElems.forEach(se => {
    const capaianForSubElem = capaianList.value.filter(c => c.id_sub_elemen == se.id_sub_elemen);
    allCapaian = [...allCapaian, ...capaianForSubElem];
  });
  
  // Return only capaian that have assessments for this student
  return allCapaian.filter(c => {
    const assessmentsForCapaian = assessmentList.value.filter(a => a.id_capaian == c.id_capaian);
    return assessmentsForCapaian.some(a => a.nilai && a.nilai[selectedSiswa.value.id_siswa]);
  });
};

const getCapaianCountForElemen = (id_elemen) => {
  return getCapaianForSiswa(id_elemen).length;
};

const getAssessmentValue = (id_capaian, index) => {
  if (!selectedSiswa.value || !id_capaian) return null;
  
  // Get all assessments for this capaian
  const assessmentsForCapaian = assessmentList.value.filter(a => 
    a.id_capaian == id_capaian && a.nilai && a.nilai[selectedSiswa.value.id_siswa]
  );
  
  // Sort by date created
  assessmentsForCapaian.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  
  // Return value at index or null
  return assessmentsForCapaian[index]?.nilai[selectedSiswa.value.id_siswa] || null;
};

const getNilaiClass = (nilai) => {
  if (!nilai) return 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400';
  
  switch (nilai) {
    case '1':
    case 1:
    case 'MB':
      return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
    case '2':
    case 2:
    case 'SB':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300';
    case '3':
    case 3:
    case 'BSH':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
    case '4':
    case 4:
    case 'SAB':
      return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400';
  }
};

const getNilaiAverage = (id_capaian) => {
  const avg = calculateAverageForCapaian(id_capaian);
  if (avg < 1.5) return 'MB';
  if (avg < 2.5) return 'SB';
  if (avg < 3.5) return 'BSH';
  return 'SAB';
};

const calculateAverageForCapaian = (id_capaian) => {
  if (!selectedSiswa.value || !id_capaian) return 0;
  
  // Get all assessments for this capaian
  const assessmentsForCapaian = assessmentList.value.filter(a => 
    a.id_capaian == id_capaian && a.nilai && a.nilai[selectedSiswa.value.id_siswa]
  );
  
  if (assessmentsForCapaian.length === 0) return 0;
  
  // Extract values
  const values = assessmentsForCapaian.map(a => {
    const val = a.nilai[selectedSiswa.value.id_siswa];
    if (typeof val === 'number') return val;
    if (val === 'MB') return 1;
    if (val === 'SB') return 2;
    if (val === 'BSH') return 3;
    if (val === 'SAB') return 4;
    return 0;
  });
  
  // Calculate average
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

const calculateModusForCapaian = (id_capaian) => {
  if (!selectedSiswa.value || !id_capaian) return 0;
  
  // Get all assessments for this capaian
  const assessmentsForCapaian = assessmentList.value.filter(a => 
    a.id_capaian == id_capaian && a.nilai && a.nilai[selectedSiswa.value.id_siswa]
  );
  
  if (assessmentsForCapaian.length === 0) return 0;
  
  // Extract values and convert to numeric values
  const values = assessmentsForCapaian.map(a => {
    const val = a.nilai[selectedSiswa.value.id_siswa];
    if (typeof val === 'number') return val;
    if (val === 'MB') return 1;
    if (val === 'SB') return 2;
    if (val === 'BSH') return 3;
    if (val === 'SAB') return 4;
    return 0;
  });
  
  // Calculate mode (most frequent value)
  const counts = {};
  let maxCount = 0;
  let modus = 0;
  
  values.forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
    if (counts[val] > maxCount) {
      maxCount = counts[val];
      modus = val;
    }
  });
  
  return modus;
};

const getSiswaStatus = (siswa) => {
  if (!siswa || !capaianList.value.length) return 'Belum Tuntas';
  
  // Only count capaian that actually have assessments for this student
  const relevantCapaian = capaianList.value.filter(c => {
    return assessmentList.value.some(a => 
      a.id_capaian == c.id_capaian && 
      a.nilai && 
      a.nilai[siswa.id_siswa] !== undefined && 
      a.nilai[siswa.id_siswa] !== null && 
      a.nilai[siswa.id_siswa] !== ''
    );
  });
  
  if (relevantCapaian.length === 0) return 'Belum Tuntas';
  
  let totalAvg = 0;
  let count = 0;
  
  relevantCapaian.forEach(c => {
    const avg = calculateStudentAvgForCapaian(c.id_capaian, siswa.id_siswa);
    if (avg > 0) {
      totalAvg += avg;
      count++;
    }
  });
  
  const finalAvg = count > 0 ? totalAvg / count : 0;
  // Set threshold to 3 (BSH or higher is considered complete)
  return finalAvg >= 3 ? 'Tuntas' : 'Belum Tuntas';
};

const getSiswaStatusClass = (siswa) => {
  const status = getSiswaStatus(siswa);
  
  return status === 'Tuntas' 
    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
};

const calculateStudentAvgForCapaian = (id_capaian, id_siswa) => {
  // Get all assessments for this capaian and student
  const assessmentsForCapaian = assessmentList.value.filter(a => 
    a.id_capaian == id_capaian && 
    a.nilai && 
    a.nilai[id_siswa] !== undefined && 
    a.nilai[id_siswa] !== null && 
    a.nilai[id_siswa] !== ''
  );
  
  if (assessmentsForCapaian.length === 0) return 0;
  
  // Extract values
  const values = assessmentsForCapaian.map(a => {
    const val = a.nilai[id_siswa];
    if (typeof val === 'number') return val;
    if (val === 'MB') return 1;
    if (val === 'SB') return 2;
    if (val === 'BSH') return 3;
    if (val === 'SAB') return 4;
    // Try to parse as number if it's a string number
    if (typeof val === 'string' && !isNaN(Number(val))) {
      return Number(val);
    }
    return 0; // Default if none of the above
  });
  
  // Calculate average
  const sum = values.reduce((a, b) => a + b, 0);
  return values.length > 0 ? sum / values.length : 0;
};

const updateDistributionChart = () => {
  if (!selectedSiswa.value) return;
  
  // Count occurrences of each value
  let mbCount = 0;
  let sbCount = 0;
  let bshCount = 0;
  let sabCount = 0;
  let total = 0;
  
  // For each capaian, get the average value for this student
  capaianList.value.forEach(c => {
    const avg = calculateStudentAvgForCapaian(c.id_capaian, selectedSiswa.value.id_siswa);
    if (avg <= 0) return; // Skip if no assessments
    
    total++;
    
    if (avg < 1.5) mbCount++;
    else if (avg < 2.5) sbCount++;
    else if (avg < 3.5) bshCount++;
    else sabCount++;
  });
  
  // Calculate percentages
  mbPercentage.value = total > 0 ? Math.round((mbCount / total) * 100) : 0;
  sbPercentage.value = total > 0 ? Math.round((sbCount / total) * 100) : 0;
  bshPercentage.value = total > 0 ? Math.round((bshCount / total) * 100) : 0;
  sabPercentage.value = total > 0 ? Math.round((sabCount / total) * 100) : 0;
  
  // Also update tingkatKetuntasan
  tingkatKetuntasan.value = `${bshPercentage.value + sabPercentage.value}%`;
};

// Event handlers
const selectSiswa = async (siswa) => {
  selectedSiswa.value = siswa;
  
  // Fetch nilai data specifically for this student
  try {
    const nilaiResponse = await axios.get(`/filter/siswa/${siswa.id_siswa}/nilai`);
    
    if (nilaiResponse.data.success && nilaiResponse.data.data) {
      const nilaiData = nilaiResponse.data.data;
      
      // Update assessmentList with the student's nilai data
      assessmentList.value = assessmentList.value.map(assessment => {
        const nilaiForAssessment = nilaiData.filter(nilai => 
          nilai.id_assessment === assessment.id_assessment
        );
        
        if (nilaiForAssessment.length > 0) {
          const nilai = {};
          nilaiForAssessment.forEach(n => {
            nilai[n.id_siswa] = n.nilai;
          });
          
          return {
            ...assessment,
            nilai: {...(assessment.nilai || {}), ...nilai}
          };
        }
        
        return assessment;
      });
    }
  } catch (error) {
    console.error('Error fetching student nilai data:', error);
  }
  
  updateDistributionChart();
  prepareCapaianList();
};

const onKelasChange = async () => {
  loading.value = true;
  try {
    await fetchSiswaByKelas();
    await fetchAssessmentData();
  } catch (error) {
    console.error('Error after kelas change:', error);
  } finally {
    loading.value = false;
  }
};

const onDimensiChange = () => {
  selectedElemen.value = '';
};

const onElemenChange = () => {
  // Any additional logic when elemen changes
};

// Data fetching
const fetchData = async () => {
  loading.value = true;
  try {
    await Promise.all([
      fetchKelasList(),
      fetchDimensiList(),
      fetchElemenList(),
      fetchSubElemenList(),
      fetchCapaianList(),
      fetchAssessmentData()
    ]);
  } catch (error) {
    console.error('Error fetching initial data:', error);
  } finally {
    loading.value = false;
  }
};

const fetchKelasList = async () => {
  try {
    await kelasStore.fetchKelasList();
    kelasList.value = kelasStore.getKelasList || [];
  } catch (error) {
    console.error('Error fetching kelas list:', error);
  }
};

const fetchDimensiList = async () => {
  try {
    await dimensiStore.fetchDimensiList();
    dimensiList.value = dimensiStore.getDimensiList || [];
  } catch (error) {
    console.error('Error fetching dimensi list:', error);
  }
};

const fetchElemenList = async () => {
  try {
    await elemenStore.fetchElemenList();
    elemenList.value = elemenStore.getElemenList || [];
  } catch (error) {
    console.error('Error fetching elemen list:', error);
  }
};

const fetchSubElemenList = async () => {
  try {
    await subElemenStore.fetchSubElemenList();
    subElemenList.value = subElemenStore.getSubElemenList || [];
  } catch (error) {
    console.error('Error fetching sub elemen list:', error);
  }
};

const fetchCapaianList = async () => {
  try {
    const response = await axios.get('/list/capaian');
    if (response.data.success) {
      capaianList.value = response.data.data || [];
    } else {
      capaianList.value = [];
    }
  } catch (error) {
    console.error('Error fetching capaian list:', error);
    capaianList.value = [];
  }
};

const fetchSiswaByKelas = async () => {
  try {
    const url = selectedKelas.value ? `/list/siswa?id_kelas=${selectedKelas.value}` : '/list/siswa';
    const response = await axios.get(url);
    
    if (response.data.success) {
      siswaList.value = response.data.data || [];
      totalSiswa.value = siswaList.value.length;
    } else {
      siswaList.value = [];
      totalSiswa.value = 0;
    }
  } catch (error) {
    console.error('Error fetching siswa list:', error);
    siswaList.value = [];
    totalSiswa.value = 0;
  }
};

const fetchAssessmentData = async () => {
  try {
    // Fetch all assessment data
    const url = selectedKelas.value ? `/list/assessment?id_kelas=${selectedKelas.value}` : '/list/assessment';
    const response = await axios.get(url);
    
    if (response.data.success) {
      assessmentList.value = response.data.data || [];
      totalAssessments.value = assessmentList.value.length;
      
      // Fetch nilai data for the selected student if available
      if (selectedSiswa.value) {
        try {
          const nilaiResponse = await axios.get(`/filter/siswa/${selectedSiswa.value.id_siswa}/nilai`);
          
          if (nilaiResponse.data.success && nilaiResponse.data.data) {
            // Update assessment data with student scores
            // Code omitted for brevity
          }
        } catch (nilaiError) {
          console.error('Error fetching nilai data:', nilaiError);
        }
      }
      
      // Calculate sudahDinilai and totalMaksimal
      const uniqueCapaian = new Set();
      const assessedCapaian = new Set();
      
      // Count total unique capaian
      assessmentList.value.forEach(assessment => {
        uniqueCapaian.add(assessment.id_capaian);
        
        // Check if this capaian has any nilai
        if (assessment.nilai && Object.keys(assessment.nilai).length > 0) {
          assessedCapaian.add(assessment.id_capaian);
        }
      });
      
      sudahDinilai.value = assessedCapaian.size;
      totalMaksimal.value = uniqueCapaian.size;
      
    } else {
      assessmentList.value = [];
      totalAssessments.value = 0;
      sudahDinilai.value = 0;
      totalMaksimal.value = 0;
    }
  } catch (error) {
    console.error('Error fetching assessment data:', error);
    assessmentList.value = [];
    totalAssessments.value = 0;
    sudahDinilai.value = 0;
    totalMaksimal.value = 0;
  }
};

// Modal and printing functions
const previewRapor = () => {
  prepareCapaianList();
  showPreview.value = true;
};

const prepareCapaianList = async () => {
  if (!selectedSiswa.value) return;
  
  // Create a list of capaian that have assessments for this student
  siswaCapaianList.value = capaianList.value
    .filter(c => {
      const assessments = assessmentList.value.filter(a => 
        a.id_capaian === c.id_capaian && 
        a.nilai && 
        a.nilai[selectedSiswa.value.id_siswa]
      );
      return assessments.length > 0;
    })
    .map(c => {
      // Add dimensi and elemen names
      const subElemen = subElemenList.value.find(se => se.id_sub_elemen === c.id_sub_elemen);
      const elemen = subElemen ? elemenList.value.find(e => e.id_elemen === subElemen.id_elemen) : null;
      const dimensi = elemen ? dimensiList.value.find(d => d.id_dimensi === elemen.id_dimensi) : null;
      
      return {
        ...c,
        nama_sub_elemen: subElemen?.nama_sub_elemen || '-',
        nama_elemen: elemen?.nama_elemen || '-',
        nama_dimensi: dimensi?.nama_dimensi || '-'
      };
    });
};

const printRapor = () => {
  const printContent = document.querySelector('.bg-white.text-black').innerHTML;
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rapor - ${selectedSiswa.value?.nama}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: black; background: white; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h1, h2 { text-align: center; }
          .signature { display: flex; justify-content: space-between; margin-top: 50px; }
          .signature div { text-align: center; width: 30%; }
          @media print {
            @page { size: A4; margin: 1.5cm; }
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger print after a short delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};

// Watch for changes
watch(selectedSiswa, () => {
  updateDistributionChart();
});

// Add this to the bottom of the script section where the other watchers are
watch(selectedKelas, async (newVal) => {
  if (newVal !== undefined) {
    await onKelasChange();
  }
});

// Initialize data on component mount
onMounted(async () => {
  await fetchData();
});
</script>